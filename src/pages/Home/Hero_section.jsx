// import { ArrowLeftRightIcon, MapPin, Minus, Plus, User } from "lucide-react";
// import { useState, useEffect } from "react";
// import PaperDesktop from "../../assets/images/paper.svg";
// import PaperMobile from "../../assets/images/paper-mobile.png";
// import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
// import LandingPlane from "../../assets/images/LandingPlane.svg";
// import DateFrom from "../../assets/images/DateFrom.svg";
// import DateTo from "../../assets/images/DateTo.svg";
// import TravelerIcon from "../../assets/images/TravelerIcon.svg";
// import BannerBottom from "../../assets/images/banner-bottom.png";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router";
// import LoadingScreen from "../../components/LoadingScreen";

// const HeroSection = () => {
//   const navigate = useNavigate();
//   // const [departureDate, setDepartureDate] = useState(null);
//   // const [returnDate, setReturnDate] = useState(null);
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [travelers, setTravelers] = useState(1);
//   const [travelClass, setTravelClass] = useState("Economy");
//   const [flightDepatureDate, setflightDepatureDate] = useState(null);
//   const [flightReturnDate, setflightReturnDate] = useState(null);
//   const [searchCount, setSearchCount] = useState(0);
//   const [flightsData, setFlightsData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const handleDate = (newDate) => {
//     if (!newDate) {
//       return;
//     } // Handle null or invalid date
//     else {
//       // Ensure newDate is a Date object
//       const selectedDate = new Date(newDate);

//       const year = selectedDate.getFullYear();
//       const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//       const day = String(selectedDate.getDate()).padStart(2, "0");

//       const formattedDate = `${year}-${month}-${day}`;
//       return formattedDate;
//     }
//   };

//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   // Fetch flights based on the search parameters
//   useEffect(() => {
//     const fetchFlights = async () => {
//       const formattedDepartureDate = handleDate(flightDepatureDate);
//       const formattedReturnDate = handleDate(flightReturnDate);
//       console.log("Search API Call");
//       setLoading(true);
//       try {
//         const response = await fetch(`${backendUrl}/search`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             from,
//             to,
//             flightDepatureDate: formattedDepartureDate,
//             flightReturnDate: formattedReturnDate,
//             travelClass,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch flight data");
//         }

//         const data = await response.json();
//         console.log(data);
//         setFlightsData(data);
//         setLoading(false);
//         navigate("/list", {
//           state: {
//             flightsData: data, // use freshly fetched data here
//             searchData: {
//               from,
//               to,
//               flightDepatureDate: formattedDepartureDate,
//               flightReturnDate: formattedReturnDate,
//               travelClass,
//               travelers,
//             },
//           },
//         });
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchFlights();
//   }, [searchCount]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const formattedDepartureDate = handleDate(flightDepatureDate);
//     const formattedReturnDate = handleDate(flightReturnDate);

//     console.log({
//       from,
//       to,
//       flightDepatureDate: formattedDepartureDate,
//       flightReturnDate: formattedReturnDate,
//       travelClass,
//       travelers,
//     });

//     setSearchCount((prev) => prev + 1);

//     // navigate("/list", { state: { fight: flightsData } });
//   };

//   if (loading) {
//     return <LoadingScreen />;
//   }
//   return (
//     <>
//       <div
//         className={`min-h-screen relative bg-white/10 bg-[url('/banner-img.png')]
//         bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 lg:px-10 xl:px-40 overflow-hidden `}
//       >
//         <div className="h-full w-full flex flex-col justify-center items-center">
//           <div className="mt-10 h-full w-full flex flex-col justify-center items-center gap-2">
//             <h1
//               data-aos="fade-up"
//               className="text-4xl xl:text-5xl font-semibold text-center font-jakarta text-white"
//             >
//               Transforming <br className="sm:hidden" /> African Travel
//             </h1>
//             <div data-aos="fade-up" className="relative pl-20 hidden lg:block">
//               <img
//                 src={PaperDesktop}
//                 alt="banner-2"
//                 height={171}
//                 width={662}
//                 className="relative h-20 mix-blend-screen"
//               />
//               {/* <Image
//                 src={"/assets/images/paper.svg"}
//                 alt="banner-2"
//                 height={171}
//                 width={662}
//                 className="relative h-20 mix-blend-screen"
//               /> */}
//               <p className="absolute top-7 left-36 z-[1px] text-black font-semibold text-base font-sans">
//                 Hassle Free Local Payment Options with Lowest Prices!
//               </p>
//             </div>
//             <div
//               data-aos="fade-up"
//               className="relative block lg:hidden mt-4 mb-4"
//             >
//               <img
//                 src={PaperMobile}
//                 alt="banner-2"
//                 height={100}
//                 width={443}
//                 className="relative h-20 -mb-10"
//               />
//               <p className="absolute top-5 left-13 leading-5 z-[1px] text-black font-semibold text-sm sm:text-base font-sans text-center">
//                 Hassle Free Local Payment Options
//                 <br className="block lg:hidden" /> with Lowest Prices!
//               </p>
//             </div>

//             <div className="w-full -mb-30 mt-10 font-sans block z-10">
//               <p
//                 data-aos="fade-left"
//                 className="text-[18px] tracking-wider text-white font-bold mb-6 font-sans"
//               >
//                 Book your Trip now!
//               </p>

//               <form
//                 data-aos="fade-down"
//                 onSubmit={handleSearch}
//                 className="bg-white rounded-lg shadow-lg"
//               >
//                 <div className="flex flex-col md:flex-row">
//                   <div className="flex flex-row flex-1">
//                     {/* From Location */}
//                     <div className="flex items-center p-4 border-b md:border-b-0  border-gray-200 flex-1">
//                       {/* <div className="mr-3"></div> */}
//                       <div className="flex flex-col">
//                         <label className="block text-xs text-gray-500">
//                           <img
//                             src={TakeOffPlane}
//                             alt="TakeOffPlane"
//                             height={32}
//                             width={32}
//                           />
//                         </label>
//                         <div className="flex gap-2 items-center mt-3.5">
//                           <MapPin className="h-4 w-4 text-gray-500" />
//                           <input
//                             type="text"
//                             name="leavingFrom"
//                             id="leavingFrom"
//                             className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none appearance-none"
//                             value={from}
//                             onChange={(e) => setFrom(e.target.value)}
//                             placeholder="leavingFrom"
//                           />
//                           {/*                           <select
//                             name="leavingFrom"
//                             id="leavingFrom"
//                             className="block w-full placeholder:text-gray-400 text-black focus:outline-none appearance-none"
//                             value={from}
//                             onChange={(e) => setFrom(e.target.value)}
//                           >
//                             <option value="" disabled>
//                               Leaving From
//                             </option>
//                             <option value="london">
//                               London, United Kingdom
//                             </option>
//                             <option value="mumbai">Mumbai,India</option>
//                           </select> */}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Swap Icon */}
//                     <div className="md:flex items-center justify-center p-2 my-auto">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           const temp = from;
//                           setFrom(to);
//                           setTo(temp);
//                         }}
//                         className="bg-[#EE5128] rounded-full p-2"
//                       >
//                         {/* <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                         />
//                       </svg> */}
//                         <ArrowLeftRightIcon className="h-5 w-5 text-white" />
//                       </button>
//                     </div>

//                     {/* To Location */}
//                     <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
//                       {/* <div className="mr-3"></div> */}
//                       <div>
//                         <label className="block text-xs text-black">
//                           <img
//                             src={LandingPlane}
//                             alt="LandingPlane"
//                             height={32}
//                             width={32}
//                           />
//                         </label>
//                         <div className="flex items-center mt-3.5">
//                           <MapPin className="h-4 w-4 text-gray-500" />
//                           <input
//                             type="text"
//                             name="leavingFrom"
//                             id="leavingFrom"
//                             className="block max-w-[100px] placeholder:text-gray-400 text-black font-normal focus:outline-none appearance-none"
//                             value={to}
//                             onChange={(e) => setTo(e.target.value)}
//                             placeholder="Going to"
//                           />
//                           {/*                           <select
//                             name="leavingFrom"
//                             id="leavingFrom"
//                             className="block w-full placeholder:text-gray-400 text-black focus:outline-none appearance-none"
//                             value={to}
//                             onChange={(e) => setTo(e.target.value)}
//                           >
//                             <option value="" disabled>
//                               Going to
//                             </option>
//                             <option value="london">
//                               London, United Kingdom
//                             </option>
//                             <option value="mumbai">Mumbai,India</option>
//                           </select> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-1">
//                     {/* Departure Date */}
//                     <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
//                       {/* <div className="mr-3"></div> */}
//                       <div className="relative">
//                         <label className="block text-xs text-gray-500">
//                           <img
//                             src={DateFrom}
//                             alt="DateFrom"
//                             height={32}
//                             width={32}
//                           />
//                         </label>
//                         <div className="flex items-center mt-3.5">
//                           <DatePicker
//                             selected={flightDepatureDate}
//                             onChange={(date) => setflightDepatureDate(date)}
//                             placeholderText="Date from"
//                             className="block max-w-[100px] placeholder:text-gray-400 text-black z-20 focus:outline-none"
//                             dateFormat="MMM d, yyyy"
//                             popperClassName="z-[50px]"
//                             popperProps={{
//                               positionFixed: true,
//                             }}
//                           />
//                           {/* <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-gray-400 absolute left-[65%] sm:left-[53%]  pointer-events-none"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M19 9l-7 7-7-7"
//                             />
//                           </svg> */}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Return Date */}
//                     <div className="flex items-center p-4 border-b md:border-b-0 md:border-r border-gray-200 flex-1">
//                       <div className="mr-3"></div>
//                       <div className="relative w-full">
//                         <label className="block text-xs text-gray-500">
//                           <img
//                             src={DateTo}
//                             alt="DateTo"
//                             height={32}
//                             width={32}
//                           />
//                         </label>
//                         <div className="flex items-center mt-3.5">
//                           <DatePicker
//                             selected={flightReturnDate}
//                             onChange={(date) => setflightReturnDate(date)}
//                             placeholderText="Return Date"
//                             className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none"
//                             dateFormat="MMM d, yyyy"
//                             minDate={flightDepatureDate}
//                           />
//                           {/* <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4 text-gray-400 absolute left-[65%] sm:left-[55%] pointer-events-none"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M19 9l-7 7-7-7"
//                             />
//                           </svg> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex flex-1 items-center sm:items-stretch">
//                     {/* Travelers */}
//                     <div className="flex">
//                       <div className="flex items-center relative p-4 border-b-0 md:border-b-0 md:border-r border-gray-200 flex-1">
//                         <div className="flex flex-col">
//                           <label className="block text-xs text-gray-500">
//                             {/* {travelers} Traveler{travelers > 1 ? "s" : ""} */}
//                             <img
//                               src={TravelerIcon}
//                               alt="TravelerIcon"
//                               height={32}
//                               width={32}
//                             />
//                           </label>
//                           <div className="flex items-center mt-3.5 relative">
//                             <select
//                               className="placeholder:text-gray-400 text-black focus:outline-none appearance-none bg-transparent"
//                               value={travelClass}
//                               onChange={(e) => setTravelClass(e.target.value)}
//                             >
//                               <option value="" className="text-gray-400">
//                                 Select
//                               </option>
//                               <option value="Economy">Economy</option>
//                               <option value="Premium Economy">
//                                 Premium Economy
//                               </option>
//                               <option value="Business">Business</option>
//                               <option value="First">First</option>
//                             </select>
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-4 w-4 text-gray-400 absolute right-0 pointer-events-none"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M19 9l-7 7-7-7"
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center relative p-4 border-b-0 md:border-b-0 md:border-r border-gray-200 flex-1">
//                         <div className="flex flex-col">
//                           <label className="block text-xs text-gray-500">
//                             {/* {travelers} Traveler{travelers > 1 ? "s" : ""} */}
//                             <img
//                               src={TravelerIcon}
//                               alt="TravelerIcon"
//                               height={32}
//                               width={32}
//                             />
//                           </label>
//                           <div className="flex items-center mt-3.5 gap-2 relative font-jakarta">
//                             <div
//                               className="p-2 flex justify-center items-center rounded-md bg-[#EE5128] text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200 cursor-pointer"
//                               onClick={() =>
//                                 setTravelers((prev) => Math.max(1, prev - 1))
//                               }
//                             >
//                               <Minus className="h-[16px]" />
//                             </div>
//                             <p className="p-2">{travelers}</p>
//                             <div
//                               className="p-2 flex justify-center items-center rounded-md bg-[#EE5128] text-white hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200 cursor-pointer"
//                               onClick={() => setTravelers(travelers + 1)}
//                             >
//                               <Plus className="h-[16px]" />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Search Button */}
//                     <div className="p-4 my-auto md:my-0 md:p-0">
//                       <button
//                         type="submit"
//                         className="w-full text-2xl font-jakarta sm:min-w-[200px] max-w-[200px] md:h-full bg-[#EE5128] text-white font-semibold py-2 px-8 md:px-12 rounded-md md:rounded-none md:rounded-r-md hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
//                       >
//                         Search
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <img
//           // src={`../../assets/images/banner-bottom.png`}
//           src={BannerBottom}
//           // src="../../assets/images/banner-bottom.png"
//           alt="banner-bottom"
//           height={40}
//           width={662}
//           className="w-full absolute -bottom-[26px] md:-bottom-[40px] object-cover h-20"
//         />
//       </div>
//     </>
//   );
// };

// export default HeroSection;
import { ArrowLeftRightIcon, MapPin, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import PaperDesktop from "../../assets/images/paper.svg";
import PaperMobile from "../../assets/images/paper-mobile.png";
import TakeOffPlane from "../../assets/images/TakeOffPlane.svg";
import LandingPlane from "../../assets/images/LandingPlane.svg";
import DateFrom from "../../assets/images/DateFrom.svg";
import DateTo from "../../assets/images/DateTo.svg";
import TravelerIcon from "../../assets/images/TravelerIcon.svg";
import BannerBottom from "../../assets/images/banner-bottom.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import LoadingScreen from "../../components/LoadingScreen";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [travelType, setTravelType] = useState("Adult");
  const [flightDepatureDate, setflightDepatureDate] = useState(null);
  const [flightReturnDate, setflightReturnDate] = useState(null);
  const [searchCount, setSearchCount] = useState(0);
  const [flightsData, setFlightsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDate = (newDate) => {
    if (!newDate) {
      return;
    } // Handle null or invalid date
    else {
      // Ensure newDate is a Date object
      const selectedDate = new Date(newDate);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch flights based on the search parameters
  useEffect(() => {
    const fetchFlights = async () => {
      const formattedDepartureDate = handleDate(flightDepatureDate);
      const formattedReturnDate = handleDate(flightReturnDate);
      console.log("Search API Call");
      setLoading(true);
      try {
        const response = await fetch(`${backendUrl}/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
            flightDepatureDate: formattedDepartureDate,
            flightReturnDate: formattedReturnDate,
            travelClass,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch flight data");
        }

        const data = await response.json();
        console.log(data);
        setFlightsData(data);
        setLoading(false);
        navigate("/list", {
          state: {
            flightsData: data, // use freshly fetched data here
            searchData: {
              from,
              to,
              flightDepatureDate: formattedDepartureDate,
              flightReturnDate: formattedReturnDate,
              travelClass,
              travelers,
              travelType,
            },
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (searchCount > 0) {
      fetchFlights();
    }
  }, [searchCount]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formattedDepartureDate = handleDate(flightDepatureDate);
    const formattedReturnDate = handleDate(flightReturnDate);

    console.log({
      from,
      to,
      flightDepatureDate: formattedDepartureDate,
      flightReturnDate: formattedReturnDate,
      travelClass,
      travelers,
      travelType,
    });

    setSearchCount((prev) => prev + 1);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div
        className={`min-h-screen relative bg-white/10 bg-[url('/banner-img.png')]
        bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-4 lg:px-10 xl:px-40 overflow-hidden`}
      >
        <div className="h-full w-full flex flex-col justify-center items-center">
          <div className="mt-10 h-full w-full flex flex-col justify-center items-center gap-2">
            <h1
              data-aos="fade-up"
              className="text-4xl xl:text-5xl font-semibold text-center font-jakarta text-white"
            >
              {/* Transforming <br className="sm:hidden" /> African Travel */}
              {t("hero.title")}
            </h1>
            <div data-aos="fade-up" className="relative pl-20 hidden lg:block">
              <img
                src={PaperDesktop}
                alt="banner-2"
                height={171}
                width={662}
                className="relative h-20 mix-blend-screen"
              />
              <p className="absolute top-7 left-36 z-[1px] text-black font-semibold text-base font-sans">
                {/* Hassle Free Local Payment Options with Lowest Prices! */}
                {t("hero.description")}
              </p>
            </div>
            <div
              data-aos="fade-up"
              className="relative block lg:hidden mt-4 mb-4"
            >
              <img
                src={PaperMobile}
                alt="banner-2"
                height={100}
                width={443}
                className="relative h-20 -mb-10"
              />
              <p className="absolute top-5 left-13 leading-5 z-[1px] text-black font-semibold text-sm sm:text-base font-sans text-center">
                {/* Hassle Free Local Payment Options{" "}
                <br className="block lg:hidden" /> with Lowest Prices! */}
                {t("hero.description")}
              </p>
            </div>

            <div className="w-full -mb-30 mt-10 font-sans block z-10">
              <p
                data-aos="fade-left"
                className="text-[18px] tracking-wider text-white font-bold mb-6 font-sans"
              >
                {/* Book your Trip now! */}
                {t("hero.bookNow")}
              </p>

              <form
                data-aos="fade-down"
                onSubmit={handleSearch}
                className="bg-white rounded-lg shadow-lg"
              >
                {/* Desktop Layout */}
                <div className="hidden md:flex md:flex-row">
                  <div className="flex flex-row flex-1">
                    {/* From Location */}
                    <div className="flex items-center p-4 border-b-0 border-gray-200 flex-1">
                      <div className="flex flex-col">
                        <label className="block text-xs text-gray-500">
                          <img
                            src={TakeOffPlane}
                            alt="TakeOffPlane"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex gap-2 items-center mt-3.5">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <input
                            type="text"
                            name="Leaving From"
                            id="LeavingFrom"
                            className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none appearance-none"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            placeholder={`${t("hero.leaving")}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Swap Icon */}
                    <div className="flex items-center justify-center p-2 my-auto mr-8">
                      <button
                        type="button"
                        onClick={() => {
                          const temp = from;
                          setFrom(to);
                          setTo(temp);
                        }}
                        className="bg-[#EE5128] rounded-full p-2"
                      >
                        <ArrowLeftRightIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    {/* To Location */}
                    <div className="flex items-center p-4 border-b-0 border-r border-gray-200 flex-1">
                      <div>
                        <label className="block text-xs text-black">
                          <img
                            src={LandingPlane}
                            alt="LandingPlane"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex items-center mt-3.5">
                          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                          <input
                            type="text"
                            name="going To"
                            id="going To"
                            className="block max-w-[100px] placeholder:text-gray-400 text-black font-normal focus:outline-none appearance-none"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder={`${t("hero.going")}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1">
                    {/* Departure Date */}
                    <div className="flex items-center p-4 border-b-0 border-r border-gray-200 flex-1">
                      <div className="relative">
                        <label className="block text-xs text-gray-500">
                          <img
                            src={DateFrom}
                            alt="DateFrom"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex items-center mt-3.5 relative">
                          <DatePicker
                            selected={flightDepatureDate}
                            onChange={(date) => setflightDepatureDate(date)}
                            placeholderText={`${t("hero.dateForm")}`}
                            className="block max-w-[100px] placeholder:text-gray-400 text-black z-20 focus:outline-none"
                            dateFormat="MMM d, yyyy"
                            popperClassName="z-[50px]"
                            popperProps={{
                              positionFixed: true,
                            }}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-nones "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Return Date */}
                    <div className="flex items-center p-4 border-b-0 border-r border-gray-200 flex-1">
                      <div className="relative">
                        <label className="block text-xs text-gray-500">
                          <img
                            src={DateTo}
                            alt="DateTo"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex items-center mt-3.5 relative">
                          <DatePicker
                            selected={flightReturnDate}
                            onChange={(date) => setflightReturnDate(date)}
                            placeholderText={`${t("hero.dateReturn")}`}
                            className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none"
                            dateFormat="MMM d, yyyy"
                            minDate={flightDepatureDate}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1">
                    {/* Travelers */}
                    <div className="flex flex-1 w-full">
                      <div className="flex items-center relative p-4 border-b-0 border-r border-gray-200 flex-1 w-full">
                        <div className="flex flex-col w-full">
                          <label className="relative flex text-gray-500 w-full justify-between gap-4 ">
                            <img
                              src={TravelerIcon}
                              alt="TravelerIcon"
                              height={32}
                              width={32}
                              className="top-5 relative"
                            />
                            <div className="relative flex justify-between">
                              <select
                                className="placeholder:text-gray-100 appearance-none w-[100px] text-grey-400 focus:outline-none bg-transparent"
                                value={travelClass}
                                onChange={(e) => setTravelClass(e.target.value)}
                              >
                                <option value="" className="text-gray-400">
                                  Select
                                </option>
                                <option value="Economy" className="text-black">
                                  {t("hero.class.class1")}
                                </option>
                                <option
                                  value="Premium Economy"
                                  className="text-black"
                                >
                                  {t("hero.class.class2")}
                                </option>
                                <option value="Business" className="text-black">
                                  {t("hero.class.class3")}
                                </option>
                                <option value="First" className="text-black">
                                  {t("hero.class.class4")}
                                </option>
                              </select>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 absolute top-[30%] right-[10%] pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </label>

                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center relative">
                              <select
                                className="placeholder:text-grey-100 appearance-none w-[100px] text-gray-500 focus:outline-none bg-transparent"
                                value={travelType}
                                onChange={(e) => setTravelType(e.target.value)}
                              >
                                <option value="" className="text-gray-400">
                                  Select
                                </option>
                                <option value="Adult" className="text-black">
                                  {t("hero.travaler-type.type1")}
                                </option>
                                <option value="Child" className="text-black">
                                  {t("hero.travaler-type.type2")}
                                </option>
                              </select>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 absolute left-1/2 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                            <div className="flex items-center gap-2 w-[100px] relative font-jakarta">
                              <div
                                className="flex justify-center items-center rounded-md text-black transition-colors duration-200 cursor-pointer"
                                onClick={() =>
                                  setTravelers((prev) => Math.max(1, prev - 1))
                                }
                              >
                                <Minus className="h-[16px]" />
                              </div>
                              <p className="size-4 flex justify-center items-center">
                                {travelers}
                              </p>
                              <div
                                className="flex justify-center items-center rounded-md text-black transition-colors duration-200 cursor-pointer"
                                onClick={() => setTravelers(travelers + 1)}
                              >
                                <Plus className="h-[16px]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="p-0">
                      <button
                        type="submit"
                        className="w-full text-2xl font-jakarta sm:min-w-[200px] max-w-[200px] h-full bg-[#EE5128] text-white font-semibold py-2 px-8 md:px-12 rounded-none rounded-r-md hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                      >
                        {t("hero.search")}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex flex-col md:hidden w-full">
                  {/* Locations (From & To) */}
                  <div className="flex flex-row w-full border-b  border-gray-200">
                    <div className="flex items-center p-4 border-b  border-gray-200 flex-1">
                      <div className="flex flex-col">
                        <label className="block text-xs text-gray-500">
                          <img
                            src={TakeOffPlane}
                            alt="TakeOffPlane"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex gap-2 items-center mt-3.5">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <input
                            type="text"
                            name="leavingFrom"
                            id="leavingFromMobile"
                            className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none appearance-none"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            placeholder={`${t("hero.leaving")}`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Swap Icon */}
                    <div className="flex items-center justify-center p-2 my-auto mr-4">
                      <button
                        type="button"
                        onClick={() => {
                          const temp = from;
                          setFrom(to);
                          setTo(temp);
                        }}
                        className="bg-[#EE5128] rounded-full p-2"
                      >
                        <ArrowLeftRightIcon className="h-5 w-5 text-white" />
                      </button>
                    </div>

                    <div className="flex items-center p-4 border-b border-gray-200 flex-1">
                      <div>
                        <label className="block text-xs text-black">
                          <img
                            src={LandingPlane}
                            alt="LandingPlane"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex items-center mt-3.5 gap-2">
                          <MapPin className="h-4 w-4 text-gray-500 " />
                          <input
                            type="text"
                            name="goingTo"
                            id="goingToMobile"
                            className="block max-w-[100px] placeholder:text-gray-400 text-black font-normal focus:outline-none appearance-none"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder={`${t("hero.going")}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex flex-row w-full">
                    <div className="flex items-center p-4 border-b border-r border-gray-200 flex-1 ">
                      <div className="relative w-full flex-col ml-5 mr-4 ">
                        <label className="block text-xs text-gray-500">
                          <img
                            src={DateFrom}
                            alt="DateFrom"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex items-center mt-3.5 relative">
                          <DatePicker
                            selected={flightDepatureDate}
                            onChange={(date) => setflightDepatureDate(date)}
                            placeholderText={`${t("hero.dateForm")}`}
                            className="block max-w-[100px] placeholder:text-gray-400 text-black z-20 focus:outline-none"
                            dateFormat="MMM d, yyyy"
                            popperClassName="z-[50px]"
                            popperProps={{
                              positionFixed: true,
                            }}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-nones "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border-b border-gray-200 flex-1">
                      <div className="relative">
                        <label className="block text-xs text-gray-500">
                          <img
                            src={DateTo}
                            alt="DateTo"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex items-center mt-3.5 relative">
                          <DatePicker
                            selected={flightReturnDate}
                            onChange={(date) => setflightReturnDate(date)}
                            placeholderText={`${t("hero.dateReturn")}`}
                            className="block max-w-[100px] placeholder:text-gray-400 text-black focus:outline-none"
                            dateFormat="MMM d, yyyy"
                            minDate={flightDepatureDate}
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 absolute -right-3 pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Travel Options */}
                  <div className="flex flex-row w-full">
                    <div className="flex items-center p-4 border-b border-r border-gray-200 flex-1">
                      <div className="flex  relative w-full flex-col ml-4 ">
                        <label className="block text-xs text-gray-500">
                          <img
                            src={TravelerIcon}
                            alt="TravelerIcon"
                            height={32}
                            width={32}
                          />
                        </label>
                        <div className="flex items-center mt-3.5 relative">
                          <select
                            className="placeholder:text-gray-400 text-black focus:outline-none appearance-none bg-transparent"
                            value={travelClass}
                            onChange={(e) => setTravelClass(e.target.value)}
                          >
                            <option value="" className="text-gray-400">
                              Select
                            </option>
                            <option value="Economy">
                              {t("hero.class.class1")}
                            </option>
                            <option value="Premium Economy">
                              {t("hero.class.class2")}
                            </option>
                            <option value="Business">
                              {t("hero.class.class3")}
                            </option>
                            <option value="First">
                              {t("hero.class.class4")}
                            </option>
                          </select>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400 absolute right-0 pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center p-4 border-b border-gray-200 flex-1">
                      <div className="flex  relative w-full flex-col ">
                        <label className="block  text-gray-500">
                          <div className="flex items-center justify-between gap-8">
                            <img
                              src={TravelerIcon}
                              alt="TravelerIcon"
                              height={32}
                              width={32}
                            />
                            <div className="flex items-center relative">
                              <select
                                className="placeholder:text-grey-100 appearance-none w-[100px] text-gray-500 focus:outline-none bg-transparent"
                                value={travelType}
                                onChange={(e) => setTravelType(e.target.value)}
                              >
                                <option value="" className="text-gray-400">
                                  Select
                                </option>
                                <option value="Adult" className="text-black">
                                  {t("hero.travaler-type.type1")}
                                </option>
                                <option value="Child" className="text-black">
                                  {t("hero.travaler-type.type2")}
                                </option>
                              </select>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400 absolute left-1/2 pointer-events-none"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </label>
                        <div className="flex items-center mt-3.5 gap-2 relative font-jakarta">
                          <div
                            className="p-2 flex justify-center items-center rounded-md   transition-colors duration-200 cursor-pointer"
                            onClick={() =>
                              setTravelers((prev) => Math.max(1, prev - 1))
                            }
                          >
                            <Minus className="h-[16px]" />
                          </div>
                          <p className="p-2">{travelers}</p>
                          <div
                            className="p-2 flex justify-center items-center rounded-md  transition-colors duration-200 cursor-pointer"
                            onClick={() => setTravelers(travelers + 1)}
                          >
                            <Plus className="h-[16px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Button - Mobile */}
                  <div className="w-full">
                    <button
                      type="submit"
                      className="w-full text-xl font-jakarta bg-[#EE5128] text-white font-semibold py-3 rounded-b-md hover:bg-[#d64520] active:bg-[#b83b1c] transition-colors duration-200"
                    >
                      {t("hero.search")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <img
          src={BannerBottom}
          alt="banner-bottom"
          height={40}
          width={662}
          className="w-full absolute -bottom-[26px] md:-bottom-[40px] object-cover h-20"
        />
      </div>
    </>
  );
};

export default HeroSection;
