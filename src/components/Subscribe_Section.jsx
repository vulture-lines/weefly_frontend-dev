import { useEffect, useRef, useState } from "react";
import BottomWrapper from "../assets/images/subscribe/Vector.png";
import { useTranslation } from "react-i18next";
export default function Subscribe() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false); // re-triggers animation on re-entry
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative px-2 sm:px-4 md:px-6 py-6 sm:py-10 md:py-12 transform transition duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-[0.97] translate-y-6"
      }`}
    >
      {/* ✅ Mobile Wrap Outside */}
      <div className="absolute bottom-0 left-16 w-[150%] -ml-[25%] sm:hidden z-10">
        <img
          src={BottomWrapper}
          alt="Bottom Wrap"
          width={1600}
          height={70}
          className="w-full h-[60px] object-cover"
        />
      </div>

      {/* ✅ Main Card */}
      <div
        className="relative bg-gradient-to-b from-[#FFE0D9] to-[#FFB09C] sm:bg-gradient-to-r sm:from-[#FFE0D9] sm:to-[#FFB09C]
        max-w-[1255px] w-full mx-auto overflow-hidden shadow-md md:shadow-none
        sm:rounded-2xl rounded-t-[20px] sm:border-none border-none"
      >
        <div className="px-6 sm:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 relative z-10">
          {/* ✅ Text Content */}
          <div className="w-full md:w-2/3">
            <div className="text-left sm:pl-10 md:pl-[88px]">
              {/* ✅ Heading */}
              <h2 className="sm:hidden text-2xl font-jakarta font-bold text-gray-900 mb-4 leading-snug">
                {/* Subscribe for <br />
                Exclusive Flight <br />
                Deals & Travel Tips */}
                {t("subscribe.title")}
              </h2>

              <h2 className="hidden sm:block text-3xl md:text-4xl font-jakarta font-bold text-gray-900 mb-4 leading-snug whitespace-pre-line">
                {/* Subscribe for Exclusive{"\n"}
                Flight Deals & Travel Tips */}
                {t("subscribe.title")}
              </h2>

              {/* ✅ Subheading */}
              <p className="text-base text-gray-800 font-lato max-w-lg mb-6 md:mb-0 leading-relaxed">
                {/* Join our travel community and be the first to know about flash
                sales, last-minute discounts, and insider tips to make your
                journey smoother. */}
                {t("subscribe.description")}
              </p>

              {/* ✅ Mobile Button */}
              <div className="sm:hidden flex justify-start">
                <button className="bg-white text-[#ff4a26] font-lato font-semibold px-6 py-3 rounded-md shadow hover:bg-[#ffece9] transition duration-300">
                  {/* Subscribe now */}
                  {t("subscribe.button")}
                </button>
              </div>
            </div>
          </div>

          {/* ✅ Desktop Button */}
          <div className="w-full md:w-auto md:mr-16 hidden sm:block">
            <button className="w-full md:w-auto bg-white text-[#ff4a26] font-lato font-semibold px-6 py-3 rounded-md shadow hover:bg-[#ffece9] transition">
              {/* Subscribe now */}
              {t("subscribe.button")}
            </button>
          </div>
        </div>

        {/* ✅ Desktop Bottom Wrap */}
        <div className="hidden md:block absolute bottom-[-33px] left-0 w-full h-[60px] overflow-hidden">
          <img
            src={BottomWrapper}
            alt="Paper Border"
            width={1600}
            height={70}
            className="w-full h-[60px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
