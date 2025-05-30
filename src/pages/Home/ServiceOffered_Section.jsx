import { useEffect, useState, useRef } from "react";
import Aos from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import Logo from "../../assets/images/logo-small.svg";

import ConciergeImg from "../../assets/images/ServiceOffers/Concierge.svg";
import ConciergeImgMask from "../../assets/images/ServiceOffers/Concierge-orange.svg";
import MoneyExchangeImg from "../../assets/images/ServiceOffers/MoneyExchange.svg";
import MoneyExchangeImgMask from "../../assets/images/ServiceOffers/MoneyExchange-orange.svg";
import ESimImg from "../../assets/images/ServiceOffers/ESim.svg";
import ESimImgMask from "../../assets/images/ServiceOffers/ESim-orange.svg";
import ExtraLuggage from "../../assets/images/ServiceOffers/ExtraLuggage.svg";
import ExtraLuggageMask from "../../assets/images/ServiceOffers/ExtraLuggage-orange.svg";

import Tours from "../../assets/images/ServiceOffers/Tours.png";
import Events from "../../assets/images/ServiceOffers/Events.png";
import LastMinute from "../../assets/images/ServiceOffers/LastMinite.png";
import Visa from "../../assets/images/ServiceOffers/Visa.png";

import ComingSoon from "../../assets/images/ServiceOffers/comingsoon.gif";

import PlusIcon from "../../assets/images/cancel-flaticon.png";
import { useTranslation } from "react-i18next";

function ServiceOfferedSection() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const offersSwiperRef = useRef(null);
  const servicesSwiperRef = useRef(null);

  const Offers = [
    {
      image: Tours,
      // title: "Tours",
      title: `${t("service.offer.tours")}`,
    },
    {
      image: Events,
      // title: "Events",
      title: `${t("service.offer.events")}`,
    },
    {
      image: LastMinute,
      // title: "Last minute",
      title: `${t("service.offer.lastminute")}`,
    },
    {
      image: Visa,
      title: `${t("service.offer.visa")}`,
    },
  ];
  const Services = [
    {
      image: ConciergeImg,
      maskImage: ConciergeImgMask,
      // title: "Concierge",
      title: `${t("service.services.concierge.title")}`,
      description: `${t("service.services.concierge.description")}`,
    },
    {
      image: MoneyExchangeImg,
      maskImage: MoneyExchangeImgMask,
      title: `${t("service.services.moneyexchange.title")}`,
      description: `${t("service.services.moneyexchange.description")}`,
    },
    {
      image: ESimImg,
      maskImage: ESimImgMask,
      title: `${t("service.services.esim.title")}`,
      description: `${t("service.services.esim.description")}`,
    },
    {
      image: ExtraLuggage,
      maskImage: ExtraLuggageMask,
      title: `${t("service.services.luggage.title")}`,
      description: `${t("service.services.luggage.description")}`,
    },
  ];

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="ServicesOffered"
      className="sm:px-4 lg:px-20 xl:px-40 py-28 bg-white text-black overflow-hidden"
    >
      {/* title section */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className=" text-white rounded-full ml-4 " data-aos="fade-right">
            <img
              src={PlusIcon}
              alt="play icon"
              className="h-[30px] w-[30px] md:h-[60px] md:w-[60px] lg:h-[100px] lg:w-[100px] rotate-45 mt-[8px]"
            />
          </div>
          <div className="header sm:ml-0 flex flex-col items-start gap-3 lg:gap-5 mb-[44px] lg:mb-16">
            <h3
              data-aos="fade-right"
              className="font-jakarta font-bold text-[30px] xl:text-[45px] text-[#EE5128]"
            >
              {/* Services offered */}
              {t("service.heading")}
            </h3>
            <div className="flex flex-col items-start font-sans font-normal text-[18px] lg:text-[22px]">
              <p data-aos="fade-right" className="font-semibold xl:font-normal">
                {/* Explore Africa with Ease */}
                {t("service.subHeading")}
              </p>
              <p
                data-aos="fade-right"
                className="text-base xl:text-[22px] font-semibold xl:font-normal text-black/50 line-clamp-3"
              >
                {/* Book Flights, Hotels, Cars, Trains &{" "}
                <br className="md:hidden" /> Events, Whether for Work or Play. */}
                {t("service.description")}
              </p>
            </div>
          </div>
        </div>

        {/* <Image */}
        <img
          src={ComingSoon}
          alt="coming soon"
          width={200}
          height={200}
          className="h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] lg:h-[200px] lg:w-[200px]"
        />
      </div>

      {isMobile ? (
        <>
          <div className=" relative">
            {/* Offers Swiper */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={6}
                slidesPerView={2.2}
                // pagination={{
                //   clickable: true,
                //   el: ".offers-pagination",
                //   bulletClass:
                //     "swiper-pagination-bullet bg-gray-300 w-2 h-2 rounded-full mx-1 inline-block",
                //   bulletActiveClass:
                //     "swiper-pagination-bullet-active bg-[#EE5128]",
                // }}
                onSwiper={(swiper) => {
                  offersSwiperRef.current = swiper;
                }}
                className="offers-swiper"
              >
                {Offers.map((offer, index) => (
                  <SwiperSlide key={index}>
                    <OfferCard offer={offer} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons for Offers */}
              <div className="flex justify-center items-center mt-4">
                <div className="offers-pagination"></div>
              </div>

              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white shadow-md rounded-full p-1 text-black"
                onClick={() => offersSwiperRef.current?.slidePrev()}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white shadow-md rounded-full p-1 text-black"
                onClick={() => offersSwiperRef.current?.slideNext()}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Services Swiper */}
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={6}
                slidesPerView={2.3}
                // pagination={{
                //   clickable: true,
                //   el: ".services-pagination",
                //   bulletClass:
                //     "swiper-pagination-bullet bg-gray-300 w-2 h-2 rounded-full mx-1 inline-block",
                //   bulletActiveClass:
                //     "swiper-pagination-bullet-active bg-[#EE5128]",
                // }}
                onSwiper={(swiper) => {
                  servicesSwiperRef.current = swiper;
                }}
                className="services-swiper"
              >
                {Services.map((service, index) => (
                  <SwiperSlide key={index}>
                    <ServiceCard service={service} />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons for Services */}
              <div className="flex justify-center items-center mt-4">
                <div className="services-pagination"></div>
              </div>

              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white shadow-md rounded-full p-1 text-black"
                onClick={() => servicesSwiperRef.current?.slidePrev()}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-white shadow-md rounded-full p-1 text-black"
                onClick={() => servicesSwiperRef.current?.slideNext()}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* desktop section */}
          <div className="">
            {/* title section */}
            <div className="flex flex-col gap-[14px] sm:gap-3">
              <div className="top-section flex flex-wrap lg:flex-nowrap sm:gap-3">
                {Offers.map((offer, index) => (
                  <OfferCard key={index} offer={offer} />
                ))}
              </div>

              {/* Offer section */}
              <div className="bottom-section grid sm:grid-cols-2 xl:grid-cols-4 w-full h-full justify-stretch items-stretch gap-3">
                {Services.map((service, index) => (
                  <div className="" key={index}>
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ServiceOfferedSection;

const OfferCard = ({ offer }) => {
  return (
    <div
      data-aos="zoom-out-left"
      className="w-full sm:w-[49%] lg:w-[23.5%] xl:w-full flex flex-col rounded-md shadow-md bg-white relative h-[217px] md:h-[400px] xl:hover:pr-40 transition-all duration-300 ease-in-out group overflow-hidden"
    >
      <img
        src={offer.image}
        alt={offer.title}
        className="object-cover object-center absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-800 to-neutral-50 "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 from-30% via-black/30 to-black/0 z-10"></div>
      <p className="font-semibold translate-x-10 sm:translate-x-0 text-white absolute bottom-6 left-6 text-[14px] sm:text-2xl font-jakarta z-20 w-full">
        <span className="text-left">{offer.title}</span>
      </p>
      <img
        src={Logo}
        alt="logo"
        height={40}
        width={40}
        className="absolute hidden sm:block right-6 bottom-6 z-20 transform  xl:translate-x-20 xl:group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
      />
    </div>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <div
      data-aos="zoom-in"
      className="h-full flex flex-col items-center justify-center border-2 rounded-md border-[#EE5128] px-[11px] sm:px-5 py-[28px] sm:py-14 pb-[63px] sm:pb-28 hover:bg-[#EE5128] hover:shadow-2xl shadow-[#EE5128] hover:text-white transition-all duration-300 ease-in-out group"
    >
      <div className=" bg-[#EE5128] rounded-full p-2 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:bg-white relative">
        <img
          src={service.image}
          alt={service.title}
          className="h-[26px] w-[26px] md:h-[44px] md:w-[44px] group-hover:opacity-0 opacity-100 transition-opacity duration-300 ease-in-out absolute"
        />
        <img
          src={service.maskImage}
          alt={service.title}
          className="h-[26px] w-[26px] md:h-[44px] md:w-[44px]"
        />
      </div>
      <h3 className="text-[15px] sm:text-[28px] font-jakarta text-left font-bold mt-[26px] sm:mt-11 mb-[7px] sm:mb-3">
        {service.title}
      </h3>
      <p className="font-sans px-1 text-[11px] sm:text-[21px] text-center font-normal leading-4 sm:leading-6">
        {service.description}
      </p>
    </div>
  );
};
