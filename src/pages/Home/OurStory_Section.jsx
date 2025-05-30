import { useEffect, useRef, useState } from "react";
import OurStoryImg from "../../assets/images/ourstory/ourstory-img.png";
import { useTranslation } from "react-i18next";
export default function OurStory() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const imageAnimationClass = isVisible
    ? "translate-x-0 opacity-100"
    : "-translate-x-10 opacity-0";
  const textAnimationClass = isVisible
    ? "translate-x-0 opacity-100"
    : "translate-x-10 opacity-0";
  const mobileAnimationClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0"; // ✅ Added for mobile scroll

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 py-10 sm:py-14 bg-gradient-to-b sm:bg-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, #EE512800 0%, #EE512833 100%)",
      }}
    >
      {/* ✅ Mobile Background gradients */}
      <div className="block md:hidden absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[50px] h-full bg-gradient-to-r from-[#EE512833] to-transparent" />
        <div className="absolute top-0 left-0 w-full h-[220px] bg-gradient-to-b from-[#EE512833] via-[#EE51281A] to-transparent" />
        <div className="absolute top-[340px] left-0 w-full h-[calc(100%-340px)] bg-gradient-to-b from-transparent via-white to-white" />
      </div>

      {/* ✅ Mobile Layout */}
      <div
        className={`relative z-10 block md:hidden space-y-8 transition-all duration-1000 ease-in-out ${mobileAnimationClass}`}
      >
        <div className="relative w-full max-w-[400px] mx-auto">
          <div className="relative z-10 overflow-hidden border-2 border-white w-full rounded-lg">
            <img
              src={OurStoryImg}
              alt="Our Story"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="absolute bottom-[-6px] right-[-6px] w-[90%] h-[92%] border-r-[8px] border-b-[12px] border-[#EE512880] z-0" />
        </div>

        <div className="text-left px-2 sm:px-4">
          <h4 className="text-lg font-jakarta text-[#0F172A] mb-1">
            {t("story-section.heading")}
          </h4>
          <h2 className="text-3xl font-jakarta text-[#F15623] font-semibold mb-5 leading-snug">
            {t("story-section.subheading")}
          </h2>
          <p className="text-base text-gray-700 font-lato mb-6 leading-[1.7rem] tracking-tight">
            {t("story-section.description")}
          </p>
          <p className="text-base text-black font-lato font-bold mb-6 leading-[1.8rem] tracking-tight">
            {t("story-section.highlight")}
          </p>
          <button className="bg-[#F15623] text-white font-lato px-5 py-2 rounded-md hover:bg-[#d54417] transition">
            {t("story-section.button")}
          </button>
        </div>
      </div>

      {/* ✅ iPad Layout */}
      <div className="hidden md:flex lg:hidden max-w-[920px] mx-auto items-center justify-between gap-8 relative z-10 px-4 py-8">
        <div
          className={`w-[52%] text-left px-2 transition-all duration-1000 ease-in-out ${textAnimationClass}`}
        >
          <h4 className="text-base font-jakarta text-[#0F172A] mb-1">
            {t("story-section.heading")}
          </h4>
          <h2 className="text-[26px] font-jakarta text-[#F15623] font-semibold mb-4 leading-snug">
            {t("story-section.subheading")}
          </h2>
          <p className="text-[14px] text-gray-700 font-lato mb-5 leading-[1.6rem] tracking-tight">
            {t("story-section.description")}
          </p>
          <p className="text-[14px] text-black font-lato font-bold mb-6 leading-[1.7rem] tracking-tight">
            {t("story-section.highlight")}
          </p>
          <button className="bg-[#F15623] text-white font-lato px-4 py-2 rounded-md hover:bg-[#d54417] transition text-sm">
            {t("story-section.button")}
          </button>
        </div>

        <div
          className={`w-[48%] relative flex justify-end mt-4 md:mt-0 transition-all duration-1000 ease-in-out ${imageAnimationClass}`}
        >
          <div className="relative z-10 rounded-lg overflow-hidden border-2 border-white w-[330px] h-[360px]">
            <img
              src={OurStoryImg}
              alt="Our Story"
              width={330}
              height={360}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* ✅ iPad L Shapes */}
          <div className="absolute bottom-[-10px] right-[-8px] w-[300px] h-[320px] border-r-[8px] border-b-[12px] border-[#EE512880] z-0 rounded-bl-md hidden md:block lg:hidden" />
          <div className="absolute bottom-[-12px] right-[-10px] w-[150px] h-[500px] border-r-[10px] border-b-[14px] border-[#EE512880] z-0 rounded-bl-md hidden lg:block laptop:hidden" />
          <div className="absolute bottom-[-27px] right-[-27px] w-[465px] h-[475px] border-r-[14px] border-b-[24px] border-[#EE512880] z-0 rounded-bl-md hidden laptop:block" />
        </div>
      </div>

      {/* ✅ Desktop Layout */}
      <div className="hidden lg:flex max-w-[1200px] mx-auto items-center justify-between gap-12 relative z-10">
        <div
          className={`w-full  md:w-[60%] text-center md:text-left px-2 sm:px-4 md:px-0 transition-all duration-1000 ease-in-out ${textAnimationClass}`}
        >
          <h4 className="text-lg font-jakarta text-[#0F172A] mb-1">
            {t("story-section.heading")}
          </h4>
          <h2 className="text-[40px] font-jakarta text-[#F15623] font-semibold mb-5 leading-tight">
            {t("story-section.subheading")}
            {/* <br className="hidden md:inline" /> the World */}
          </h2>
          <p className="text-base md:text-[18px]  max-w-[580px]  text-gray-800 font-lato mb-6 leading-[1.7rem] tracking-wide">
            {t("story-section.description")}
          </p>
          <p className="text-base md:text-[25px] max-w-[520px] text-black font-lato font-bold mb-14 leading-snug tracking-normal">
            {t("story-section.highlight")}
          </p>
          <button className="bg-[#F15623] text-white font-lato px-5 py-2 rounded-md hover:bg-[#d54417] transition">
            {t("story-section.button")}
          </button>
        </div>

        <div
          className={`w-full md:w-[40%] relative flex justify-center md:justify-end mt-8 md:mt-0 transition-all duration-1000 ease-in-out ${imageAnimationClass}`}
        >
          <div className="relative z-10 rounded-lg overflow-hidden border-2 border-white w-fit md:translate-x-[15px] translate-y-[3px]">
            <img
              src={OurStoryImg}
              alt="Our Story"
              width={500}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-[-15px] right-[-27px] w-[420px] h-[475px] border-r-[14px] border-b-[24px] border-[#EE512880] z-0" />
        </div>
      </div>
    </section>
  );
}
