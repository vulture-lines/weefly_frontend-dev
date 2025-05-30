require("dotenv").config();
const amadeus = require("../config/Amadeus");
const moment = require("moment");
const { getAirlineNames } = require("../utils/Airlinename");
const { getAirportCode } = require("../utils/Airportcode");
const { Extractcityname } = require("../utils/Extractcityname");

exports.getFlightOffers = async (req, res) => {
  const { from, to, flightDepatureDate, flightReturnDate, travelClass } =
    req.body;

  if (
    !from ||
    !to ||
    !flightDepatureDate ||
    !flightReturnDate ||
    !travelClass ||
    from === to
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // console.log(from);
    // console.log(to);
    // const leavingFrom = await Extractcityname(from);
    // const goingTo = await Extractcityname(to);
    // console.log("Leaving from:" + leavingFrom);
    // console.log("Going to :" +goingTo);
    // Convert city names to IATA airport codes
    const originCode = await getAirportCode(from);
    const destinationCode = await getAirportCode(to);

    if (!originCode || !destinationCode) {
      return res.status(400).json({ error: "Invalid city names" });
    }

    // Fetch flight offers from Amadeus
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: originCode,
      destinationLocationCode: destinationCode,
      departureDate: flightDepatureDate,
      returnDate: flightReturnDate,
      travelClass: travelClass.replace(" ", "_").toUpperCase(), // Format: "Premium Economy" -> "PREMIUM_ECONOMY"
      currencyCode: "ZAR",
      adults: 2,
    });

    const flightOffers = response.data;

    const requestedClass = travelClass.replace(" ", "_").toUpperCase();

    const filteredOffers = flightOffers.filter((offer) => {
      const fareClass =
        offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin;
      return fareClass && fareClass.toUpperCase() === requestedClass;
    });

    // Collect airline codes
    const carrierCodes = new Set();
    filteredOffers.forEach((offer) => {
      offer.itineraries.forEach((itinerary) => {
        itinerary.segments.forEach((segment) => {
          carrierCodes.add(segment.carrierCode);
        });
      });
    });

    // Fetch airline names
    const airlineCodeString = Array.from(carrierCodes).join(",");
    const airlineResponse = await amadeus.referenceData.airlines.get({
      airlineCodes: airlineCodeString,
    });

    const airlineMap = {};
    airlineResponse.data.forEach((airline) => {
      airlineMap[airline.iataCode] = airline.commonName || airline.businessName;
    });

    // Format the filtered results
    const formattedData = filteredOffers.map((offer) => {
      const itinerary = offer.itineraries[0];
      const segment = itinerary.segments[0];
      const lastSegment = itinerary.segments[itinerary.segments.length - 1];
      const airlineCode = segment.carrierCode;
      const airlineName = airlineMap[airlineCode] || "Unknown";
      return {
        id: offer.id,
        airline: airlineName,
        logo: `https://content.airhex.com/content/logos/airlines_${airlineCode}_200_200_s.png`,
        flightNumber: `${airlineCode} ${segment.number}`,
        class:
          offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ||
          "N/A",
        departureTime: segment.departure.at,
        departureCity: segment.departure.iataCode,
        arrivalTime: lastSegment.arrival.at,
        arrivalCity: lastSegment.arrival.iataCode,
        duration: itinerary.duration,
        stops: itinerary.segments.length - 1,
        price: offer.price.total,
        originalPrice: offer.price.base,
        currency: offer.price.currency,
        refundable:
          offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.refundable ??
          false,
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error(
      "Amadeus API Error in getFlightOffers:",
      error.response?.data || error.message || error
    );
    if (
      error.message ==
      "Failed to get city IATA code: Invalid query parameter format"
    ) {
      res.status(400).json({ error: "Invalid query parameter format" });
    } else {
      res.status(500).json({
        error: error.response?.data || error.message || "Server error",
      });
    }
  }
};

exports.filterFlight = async (req, res) => {
  const {
    from,
    to,
    flightDepatureDate,
    flightReturnDate,
    travelClass,
    stops,
    maxPrice,
    airlineFilter,
    departureSlot,
    arrivalSlot,
    slotType,
  } = req.body;
  if (
    !from ||
    !to ||
    !flightDepatureDate ||
    !flightReturnDate ||
    !travelClass ||
    from === to
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }
  // console.log(slotType);
  // console.log("Travel Class:", travelClass);
  // console.log("Stops:", stops);
  // console.log("Max Price:", maxPrice);
  // console.log("Airline Filter:", airlineFilter);

  const travelClassEnumMap = {
    economy: "ECONOMY",
    "premium economy": "PREMIUM_ECONOMY",
    business: "BUSINESS",
    first: "FIRST",
  };
  // To filter based on Travel Class and Stops
  if (travelClass.length > 0 && stops.length > 0) {
    try {
      const originCode = await getAirportCode(from);
      const destinationCode = await getAirportCode(to);

      if (!originCode || !destinationCode) {
        return res.status(400).json({ error: "Invalid city names" });
      }

      const travelClasses = Array.isArray(travelClass)
        ? travelClass
        : [travelClass];
      const stopFilter = Array.isArray(stops) ? stops : [stops];

      const stopValues = new Set();
      for (const s of stopFilter) {
        const value = s.toLowerCase();
        if (value === "nonstop") stopValues.add(0);
        else if (value === "1stop") stopValues.add(1);
        else if (value === "2+stop") stopValues.add(2);
      }

      const allResults = [];
      const airlineCodesSet = new Set();

      for (const cls of travelClasses) {
        const travelClsEnum = travelClassEnumMap[cls.toLowerCase()];
        if (!travelClsEnum) continue;

        const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: originCode,
          destinationLocationCode: destinationCode,
          departureDate: flightDepatureDate,
          returnDate: flightReturnDate,
          travelClass: travelClsEnum,
          currencyCode: "INR",
          adults: 2,
          // max:5
        });

        // Collect airline codes
        response.data.forEach((offer) => {
          const airlineCode = offer.itineraries[0].segments[0].carrierCode;
          airlineCodesSet.add(airlineCode);
        });

        const airlineMap = await getAirlineNames(airlineCodesSet);

        for (const offer of response.data) {
          const itinerary = offer.itineraries[0];
          const numStops = itinerary.segments.length - 1;
          // console.log(numStops);
          if (numStops >= 2 || stopValues.has(numStops)) {
            const segment = itinerary.segments[0];
            const lastSegment =
              itinerary.segments[itinerary.segments.length - 1];
            const airlineCode = segment.carrierCode;

            allResults.push({
              id: offer.id,
              airline: airlineMap[airlineCode] || airlineCode,
              logo: `https://content.airhex.com/content/logos/airlines_${airlineCode}_200_200_s.png`,
              flightNumber: `${airlineCode} ${segment.number}`,
              class:
                offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ||
                "N/A",
              departureTime: segment.departure.at,
              departureCity: segment.departure.iataCode,
              arrivalTime: lastSegment.arrival.at,
              arrivalCity: lastSegment.arrival.iataCode,
              duration: itinerary.duration,
              stops: numStops,
              price: offer.price.total,
              originalPrice: offer.price.base,
              currency: offer.price.currency,
              refundable:
                offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
                  ?.refundable ?? false,
            });
          }
        }
      }

      res.status(200).json(allResults);
    } catch (error) {
      console.error(
        "Amadeus API Error in get flights:",
        error.response?.data || error.message || error
      );
      res.status(500).json({
        error: error.response?.data || error.message || "Unknown error",
      });
    }
  }

  // To filter based on airline name and travel class
  else if (travelClass.length > 0 && airlineFilter.length > 0) {
    // console.log(airlineFilter);
    try {
      const originCode = await getAirportCode(from);
      const destinationCode = await getAirportCode(to);

      if (!originCode || !destinationCode) {
        return res.status(400).json({ error: "Invalid city names" });
      }

      const travelClasses = Array.isArray(travelClass)
        ? travelClass
        : [travelClass];
      const airlineFilterNormalized = Array.isArray(airlineFilter)
        ? airlineFilter.map((a) => a.toLowerCase())
        : [airlineFilter.toLowerCase()];

      const allResults = [];
      const airlineCodesSet = new Set();

      for (const cls of travelClasses) {
        const travelClsEnum = travelClassEnumMap[cls.toLowerCase()];
        if (!travelClsEnum) continue;

        const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: originCode,
          destinationLocationCode: destinationCode,
          departureDate: flightDepatureDate,
          returnDate: flightReturnDate,
          travelClass: travelClsEnum,
          currencyCode: "INR",
          adults: 2,
          // max:5
        });

        // Collect airline codes
        response.data.forEach((offer) => {
          const airlineCode = offer.itineraries[0].segments[0].carrierCode;
          airlineCodesSet.add(airlineCode);
        });

        const airlineMap = await getAirlineNames(airlineCodesSet);

        for (const offer of response.data) {
          const itinerary = offer.itineraries[0];
          const segment = itinerary.segments[0];
          const lastSegment = itinerary.segments[itinerary.segments.length - 1];
          const airlineCode = segment.carrierCode;
          const airlineName =
            airlineMap[airlineCode]?.toLowerCase() || airlineCode.toLowerCase();

          if (airlineFilterNormalized.includes(airlineName)) {
            allResults.push({
              id: offer.id,
              airline: airlineMap[airlineCode] || airlineCode,
              logo: `https://content.airhex.com/content/logos/airlines_${airlineCode}_200_200_s.png`,
              flightNumber: `${airlineCode} ${segment.number}`,
              class:
                offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ||
                "N/A",
              departureTime: segment.departure.at,
              departureCity: segment.departure.iataCode,
              arrivalTime: lastSegment.arrival.at,
              arrivalCity: lastSegment.arrival.iataCode,
              duration: itinerary.duration,
              stops: itinerary.segments.length - 1,
              price: offer.price.total,
              originalPrice: offer.price.base,
              currency: offer.price.currency,
              refundable:
                offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
                  ?.refundable ?? false,
            });
          }
        }
      }

      res.status(200).json(allResults);
    } catch (error) {
      console.error(
        "Amadeus API Error in get flights:",
        error.response?.data || error.message || error
      );
      res.status(500).json({
        error: error.response?.data || error.message || "Unknown error",
      });
    }
  }
  // To filter based on Time Zone
  else if (departureSlot || arrivalSlot) {
    try {
      const originCode = await getAirportCode(from);
      const destinationCode = await getAirportCode(to);
      // console.log("Ds" + departureSlot);
      // console.log("as" + arrivalSlot);
      if (!originCode || !destinationCode) {
        return res.status(400).json({ error: "Invalid city names" });
      }

      const travelClasses = Array.isArray(travelClass)
        ? travelClass
        : [travelClass];

      const allResults = [];
      const airlineCodesSet = new Set();

      for (const cls of travelClasses) {
        const travelClsEnum = travelClassEnumMap[cls.toLowerCase()];
        if (!travelClsEnum) continue;

        const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: originCode,
          destinationLocationCode: destinationCode,
          departureDate: flightDepatureDate,
          returnDate: flightReturnDate,
          travelClass: travelClsEnum,
          currencyCode: "INR",
          adults: 2,
        });

        response.data.forEach((offer) => {
          const fareClass =
            offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin;

          // Filter only exact class matches
          if (!fareClass || fareClass.toLowerCase() !== cls.toLowerCase())
            return;

          const itinerary = offer.itineraries[0];
          const segment = itinerary.segments[0];
          const lastSegment = itinerary.segments[itinerary.segments.length - 1];
          const airlineCode = segment.carrierCode;

          airlineCodesSet.add(airlineCode);

          allResults.push({
            id: offer.id,
            airlineCode,
            airline: "", // Temporary placeholder, filled later
            logo: `https://content.airhex.com/content/logos/airlines_${airlineCode}_200_200_s.png`,
            flightNumber: `${airlineCode} ${segment.number}`,
            class:
              offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ||
              "N/A",
            departureTime: segment.departure.at,
            departureCity: segment.departure.iataCode,
            arrivalTime: lastSegment.arrival.at,
            arrivalCity: lastSegment.arrival.iataCode,
            duration: itinerary.duration,
            stops: itinerary.segments.length - 1,
            price: offer.price.total,
            originalPrice: offer.price.base,
            currency: offer.price.currency,
            refundable:
              offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
                ?.refundable ?? false,
          });
        });
      }
      if (departureSlot && slotType === "Depature") {
        const [startTime, endTime] = departureSlot.split("-");
        const startMoment = moment(startTime, "HH:mm");
        const endMoment = moment(endTime, "HH:mm");
        const filteredDepartures = allResults.filter((departure) => {
          const departureMoment = moment(
            departure.departureTime,
            "YYYY-MM-DDTHH:mm"
          );
          // console.log("DM" + departureMoment);
          const departureTime = departureMoment.format("HH:mm");
          // console.log("DT" + departureTime);
          return moment(departureTime, "HH:mm").isBetween(
            startMoment,
            endMoment,
            null,
            "[)"
          );
        });
        // Fetch and apply airline names
        const airlineMap = await getAirlineNames(airlineCodesSet);
        filteredDepartures.forEach((result) => {
          result.airline = airlineMap[result.airlineCode] || result.airlineCode;
        });

        res.status(200).json(filteredDepartures);
      } else if (arrivalSlot && slotType === "Arrival") {
        const [startTime, endTime] = arrivalSlot.split("-");
        const startMoment = moment(startTime, "HH:mm");
        const endMoment = moment(endTime, "HH:mm");
        const filteredArrivals = allResults.filter((arrival) => {
          const arrivalMoment = moment(arrival.arrivalTime, "YYYY-MM-DDTHH:mm");
          const arrivalTime = arrivalMoment.format("HH:mm");
          return moment(arrivalTime, "HH:mm").isBetween(
            startMoment,
            endMoment,
            null,
            "[)"
          );
        });
        const airlineMap = await getAirlineNames(airlineCodesSet);
        filteredArrivals.forEach((result) => {
          result.airline = airlineMap[result.airlineCode] || result.airlineCode;
        });

        res.status(200).json(filteredArrivals);
      }
    } catch (error) {
      console.error(
        "Amadeus API Error in filter flights:",
        error.response?.data || error.message || error
      );
      res.status(500).json({
        error: error.response?.data || error.message || "Server error",
      });
    }
  }

  // To filter based on Travel class
  else if (travelClass.length > 0) {
    try {
      const originCode = await getAirportCode(from);
      const destinationCode = await getAirportCode(to);

      if (!originCode || !destinationCode) {
        return res.status(400).json({ error: "Invalid city names" });
      }

      const travelClasses = Array.isArray(travelClass)
        ? travelClass
        : [travelClass];

      const allResults = [];
      const airlineCodesSet = new Set();

      for (const cls of travelClasses) {
        const travelClsEnum = travelClassEnumMap[cls.toLowerCase()];
        if (!travelClsEnum) continue;

        const response = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: originCode,
          destinationLocationCode: destinationCode,
          departureDate: flightDepatureDate,
          returnDate: flightReturnDate,
          travelClass: travelClsEnum,
          currencyCode: "INR",
          adults: 2,
        });

        response.data.forEach((offer) => {
          const fareClass =
            offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin;

          // Filter only exact class matches
          if (!fareClass || fareClass.toLowerCase() !== cls.toLowerCase())
            return;

          const itinerary = offer.itineraries[0];
          const segment = itinerary.segments[0];
          const lastSegment = itinerary.segments[itinerary.segments.length - 1];
          const airlineCode = segment.carrierCode;

          airlineCodesSet.add(airlineCode);

          allResults.push({
            id: offer.id,
            airlineCode,
            airline: "", // Temporary placeholder, filled later
            logo: `https://content.airhex.com/content/logos/airlines_${airlineCode}_200_200_s.png`,
            flightNumber: `${airlineCode} ${segment.number}`,
            class:
              offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin ||
              "N/A",
            departureTime: segment.departure.at,
            departureCity: segment.departure.iataCode,
            arrivalTime: lastSegment.arrival.at,
            arrivalCity: lastSegment.arrival.iataCode,
            duration: itinerary.duration,
            stops: itinerary.segments.length - 1,
            price: offer.price.total,
            originalPrice: offer.price.base,
            currency: offer.price.currency,
            refundable:
              offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
                ?.refundable ?? false,
          });
        });
      }
      const airlineMap = await getAirlineNames(airlineCodesSet);
      allResults.forEach((result) => {
        result.airline = airlineMap[result.airlineCode] || result.airlineCode;
      });

      res.status(200).json(allResults);
    } catch (error) {
      console.error(
        "Amadeus API Error in filter flights:",
        error.response?.data || error.message || error
      );
      res.status(500).json({
        error: error.response?.data || error.message || "Server error",
      });
    }
  }
};
