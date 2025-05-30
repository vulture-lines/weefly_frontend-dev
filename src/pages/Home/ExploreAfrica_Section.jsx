import { useState, useRef, useEffect } from "react";

import AfricaMap from "../../assets/images/explore/africa-pattern.png";
import Destination1 from "../../assets/images/explore/destination-1.jpg";
import Destination2 from "../../assets/images/explore/destination-2.jpg";
import Destination3 from "../../assets/images/explore/destination-3.jpg";
import Destination4 from "../../assets/images/explore/destination-4.jpg";
import Destination5 from "../../assets/images/explore/destination-5.jpg";

export default function ExploreAfrica() {
  const originalDestinations = [
    { src: Destination1, alt: "Destination 1" },
    { src: Destination2, alt: "Destination 2" },
    { src: Destination3, alt: "Destination 3" },
    { src: Destination4, alt: "Destination 4" },
    { src: Destination5, alt: "Destination 5" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const intervalRef = useRef(null);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const swipeThreshold = 50;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const rotateArray = (arr, index) => [
    ...arr.slice(index),
    ...arr.slice(0, index),
  ];

  const handleSlide = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setActiveIndex((prev) =>
        dir === "right"
          ? (prev + 1) % originalDestinations.length
          : (prev - 1 + originalDestinations.length) %
            originalDestinations.length
      );
      setAnimating(false);
    }, 500);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        handleSlide("right");
      } else {
        handleSlide("left");
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const startAutoSlide = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => handleSlide("right"), 2000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 820) {
        startAutoSlide();
      } else {
        stopAutoSlide();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      stopAutoSlide();
      window.removeEventListener("resize", handleResize);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const visibleSlides = rotateArray(originalDestinations, activeIndex).slice(
    0,
    2
  );

  return (
    <div
      ref={sectionRef}
      className={`w-full bg-white py-20 px-4 md:py-32 md:px-20 overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start justify-between relative">
        {/* Left Image - Desktop Only */}
        <div className="relative w-full md:w-[50%] md:left-20 mb-8 md:mb-0 top-6 hidden md:block">
          <img
            src={AfricaMap}
            alt="Africa Pattern"
            width={700}
            height={700}
            className="w-full h-auto"
          />
        </div>

        {/* Right Section (Text + Slider) */}
        <div className="relative w-full md:w-[58%] md:pl-20 md:left-[138px]">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-black relative top-3 text-center sm:text-left leading-snug tracking-tight">
                Explore Africa
              </h2>

              {/* <div className="flex justify-center sm:justify-end sm:relative sm:top-3 sm:left-[-250px] mt-4 sm:mt-0">
                <select className="border border-red-400 text-gray-700 text-[13px] rounded-md py-[6px] px-2">
                  <option>Select country</option>
                </select>
              </div> */}
            </div>

            <p className="mt-6 text-gray-600 text-base sm:text-lg relative top-6 lato text-center sm:text-left leading-relaxed">
              Top destinations loved by African travelers and adventurers.
            </p>

            <div className="mt-8 flex justify-center sm:justify-start items-center space-x-3">
              <button
                onClick={() => handleSlide("left")}
                className="text-red-400 text-xl"
              >
                ←
              </button>
              {originalDestinations.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === activeIndex ? "bg-red-400" : "bg-gray-300"
                  }`}
                />
              ))}
              <button
                onClick={() => handleSlide("right")}
                className="text-red-400 text-xl"
              >
                →
              </button>
            </div>
            <div
              className="mt-10 flex items-start overflow-hidden h-[320px] relative w-full max-w-[760px] mx-auto"
              onMouseEnter={() => {
                if (window.innerWidth > 820) startAutoSlide();
              }}
              onMouseLeave={() => {
                if (window.innerWidth > 820) stopAutoSlide();
              }}
            >
              <div
                className={`flex gap-6 ${
                  animating && direction === "right"
                    ? "transition-transform duration-500 ease-in-out -translate-x-[760px]"
                    : animating && direction === "left"
                    ? "transition-transform duration-500 ease-in-out translate-x-[760px]"
                    : "translate-x-0"
                }`}
                style={{ width: "1520px" }}
              >
                {visibleSlides.concat(visibleSlides).map((img, idx) => (
                  <div
                    key={idx}
                    className={`w-[360px] ${
                      idx % 2 === 0 ? "h-[320px] bottom-5" : "h-[270px] top-4"
                    } relative`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      width={360}
                      height={240}
                      className="object-cover w-full h-full rounded-xl mt-5 transition duration-700 ease-in-out"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col mt-4 w-full">
            {/* Pattern Image */}
            <div className="w-full mb-6 px-4">
              <img
                src={AfricaMap}
                alt="Africa Pattern"
                width={500}
                height={500}
                className="w-full h-auto mx-auto"
              />
            </div>

            {/* Text */}
            <div className="w-full text-left px-4">
              <h2 className="text-[22px] font-bold text-black mb-1">
                Explore Africa
              </h2>
              <p className="text-gray-600 text-[14px] leading-snug">
                Top destinations loved by African travelers and adventurers.
              </p>
            </div>

            {/* Arrows, Dots, Dropdown */}
            <div className="flex items-center justify-between mt-4 w-full px-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSlide("left")}
                  className="text-red-400 text-[18px]"
                >
                  ←
                </button>
                {originalDestinations.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i === activeIndex ? "bg-red-400" : "bg-gray-300"
                    }`}
                  />
                ))}
                <button
                  onClick={() => handleSlide("right")}
                  className="text-red-400 text-[18px]"
                >
                  →
                </button>
              </div>

              {/* <select className="border border-red-400 text-gray-700 text-[13px] rounded-md py-[6px] px-2">
                <option>Select country</option>
              </select> */}
            </div>

            {/* Mobile Carousel */}
            <div
              className="mt-8 relative overflow-visible h-[350px]"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full mx-0">
                <div className="absolute left-0 w-[75%] h-[280px]">
                  <img
                    src={rotateArray(originalDestinations, activeIndex)[0].src}
                    alt={rotateArray(originalDestinations, activeIndex)[0].alt}
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
                <div className="absolute right-[-140px] w-[58%] h-[250px] bottom-[-270px]">
                  <img
                    src={rotateArray(originalDestinations, activeIndex)[1].src}
                    alt={rotateArray(originalDestinations, activeIndex)[1].alt}
                    className="object-cover rounded-xl w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
