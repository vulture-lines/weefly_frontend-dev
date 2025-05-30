import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import DesktopTopWrap from "../../assets/images/travel/Vector.png";
import MobileTopWrap from "../../assets/images/travel/Topwrap.png";
import BackgroundPattern from "../../assets/images/travel/bg-pattern.png";

import LeftImage from "../../assets/images/travel/travel.png";
import RightImage from "../../assets/images/travel/Vector-2.png";

import DesktopBottomWrap from "../../assets/images/travel/bottopwrap.png";
import MobileBottomWrap from "../../assets/images/travel/bottomwrap.png";
import { useTranslation } from "react-i18next";

export default function TravelSection() {
  const { t } = useTranslation();
  const [visibleElements, setVisibleElements] = useState({
    image: false,
    card: false,
    heading: false,
    buttons: false,
    contactBtn: false,
  });

  const [openForm, setOpenForm] = useState(null);

  // Create refs for all elements we want to track
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const buttonsRef = useRef(null);
  const contactBtnRef = useRef(null);

  // Track if elements have been animated
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Use Intersection Observer for reliable visibility tracking
    const observerOptions = {
      root: null, // viewport
      // Adjusted rootMargin to trigger earlier
      rootMargin: "0px 0px -15% 0px", // Trigger when element starts entering viewport
      threshold: 0.2, // Require just 10% of the element to be visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          // Element is now visible in viewport - animate immediately
          console.log("Travel section is now visible - animating");
          // Remove timeout delay
          setVisibleElements({
            image: true,
            card: true,
            heading: true,
            buttons: true,
            contactBtn: true,
          });
          hasAnimated.current = true;
        }
      });
    };

    // Create observer and observe the section
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="travel-section" ref={sectionRef} className="relative">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .travel-image {
          opacity: 0;
          transform: translateY(40px);
          will-change: opacity, transform;
        }

        .travel-image.visible {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .travel-card {
          opacity: 0;
          transform: translateX(40px);
          will-change: opacity, transform;
        }

        .travel-card.visible {
          animation: fadeInRight 0.8s ease-out 0.2s forwards;
        }

        .travel-heading {
          opacity: 0;
          transform: translateY(20px);
          will-change: opacity, transform;
        }

        .travel-heading.visible {
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .travel-buttons {
          opacity: 0;
          will-change: opacity;
        }

        .travel-buttons.visible {
          animation: fadeIn 0.8s ease-out 0.6s forwards;
        }

        .travel-contact {
          opacity: 0;
          transform: scale(0.8);
          will-change: opacity, transform;
        }

        .travel-contact.visible {
          animation: zoomIn 0.8s ease-out 0.8s forwards;
        }
      `}</style>

      <div className="relative">
        {/* ✅ Desktop Top Wrap */}
        <div className="absolute top-[-25px] left-0 w-full z-30 hidden md:block">
          <img
            src={DesktopTopWrap}
            alt="Top Wrap"
            width={1920}
            height={100}
            className="w-full object-cover"
          />
        </div>

        {/* ✅ Mobile Top Wrap */}
        <div className="absolute top-[-44px] left-0 w-full z-30 md:hidden">
          <img
            src={MobileTopWrap}
            alt="Top Wrap Mobile"
            width={1920}
            height={60}
            className="w-full object-cover h-[90px]"
          />
        </div>

        {/* ✅ Background */}
        <div
          className="relative bg-cover bg-center px-4 sm:px-6 md:px-8 lg:px-24 pt-20 pb-20 lg:pt-10 lg:pb-10 z-10"
          style={{
            backgroundImage: `url('${BackgroundPattern}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          {/* ✅ Desktop Layout (starts at lg) */}
          <div className="hidden [@media(min-width:1367px)]:flex w-full max-w-[1350px] mx-auto items-center justify-between gap-8 px-8 py-24 relative z-20">
            {/* Left: Image */}
            <div
              ref={imageRef}
              className={`w-1/2 -translate-x-[-55px] relative travel-image ${
                visibleElements.image ? "visible" : ""
              }`}
            >
              <img
                src={LeftImage}
                alt="Traveler"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-auto"
              />
            </div>

            {/* Right: Vector Card */}
            <div
              ref={cardRef}
              className={`relative w-1/2 max-w-[600px] translate-x-[-90px] travel-card ${
                visibleElements.card ? "visible" : ""
              }`}
            >
              <img
                src={RightImage}
                alt="Curved Card"
                width={650}
                height={450}
                className="w-full object-cover drop-shadow-[0_10px_212px_rgba(0,0,0,0.2)]"
              />

              {/* Inside the card */}
              <div className="absolute top-0 left-0 w-full h-full px-10 py-10 z-10 flex flex-col justify-between">
                <div>
                  <h2
                    ref={headingRef}
                    className={`text-3xl lg:text-[38px] font-jakarta text-[#0F172A] leading-snug mb-6 travel-heading ${
                      visibleElements.heading ? "visible" : ""
                    }`}
                  >
                    {t("contactUs-section.heading")}
                    <br />
                    <span className="font-semibold text-black lg:text-[40px]">
                      {t("contactUs-section.subHeading")}
                    </span>
                  </h2>

                  <div
                    ref={buttonsRef}
                    className={`grid grid-cols-2 gap-5 mb-6 font-lato travel-buttons ${
                      visibleElements.buttons ? "visible" : ""
                    }`}
                  >
                    {[
                      `${t("contactUs-section.agent")}`,
                      `${t("contactUs-section.vendor")}`,
                      `${t("contactUs-section.Partnership")}`,
                    ].map((text) => (
                      <div
                        key={text}
                        className={`flex items-center justify-start gap-x-3 ${
                          text === `${t("contactUs-section.Partnership")}`
                            ? "mt-[4px]"
                            : ""
                        }`}
                        onClick={() => {
                          if (text === `${t("contactUs-section.agent")}`)
                            setOpenForm("agent");
                          else if (text === `${t("contactUs-section.vendor")}`)
                            setOpenForm("vendor");
                          else if (
                            text === `${t("contactUs-section.Partnership")}`
                          )
                            setOpenForm("partnership");
                        }}
                      >
                        {/* Text + Underline */}
                        <div className="flex flex-col">
                          <span className="text-[#F15623] font-semibold text-[18px] lg:text-[22px] xl:text-[22px] leading-[1.2] whitespace-nowrap">
                            {text}
                          </span>
                          <span className="block h-[1px] w-full bg-[#F15623] mt-[2px]" />
                        </div>

                        <p
                          // href="#"
                          className="flex items-center justify-center rounded-full border border-[#F15623] text-[#F15623] hover:bg-[#F15623] hover:text-white transition"
                          style={{
                            width: "32px",
                            height: "32px",
                            minWidth: "32px",
                            minHeight: "32px",
                          }}
                        >
                          <ArrowUpRight size={18} />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ✅ Contact Button — aligned under curve */}
                <div
                  ref={contactBtnRef}
                  className={`absolute -bottom-4 right-15 z-30 translate-y-[-28px] travel-contact ${
                    visibleElements.contactBtn ? "visible" : ""
                  }`}
                >
                  <button className="min-w-[160px] bg-[#F15623] text-white px-6 py-3 rounded-full font-medium hover:bg-[#d54417] transition shadow-md font-lato text-base whitespace-nowrap">
                    {t("contactUs-section.contact-us")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ Final Mobile Layout (300px to 700px) */}
          <div className="block md:hidden w-full px-4 relative z-20">
            {/* Top Travel Image */}
            <div
              ref={imageRef}
              className={`rounded-xl overflow-hidden mb-[-36px] mx-auto max-w-[100%] travel-image ${
                visibleElements.image ? "visible" : ""
              }`}
              style={{ maxWidth: "370px" }}
            >
              <img
                src={LeftImage}
                alt="Traveler"
                width={367}
                height={460}
                className="object-cover w-full h-[340px] sm:h-[340px] rounded-xl"
              />
            </div>

            {/* Vector Card */}
            <div
              ref={cardRef}
              className={`relative mx-auto w-full max-w-[370px] travel-card ${
                visibleElements.card ? "visible" : ""
              }`}
            >
              <img
                src={RightImage}
                alt="Curved Card"
                width={369}
                height={209}
                className="w-full h-[195px] max-[420px]:h-[190px] object-cover rounded-t-[12px] drop-shadow-[0_10px_212px_rgba(0,0,0,0.2)]"
              />

              {/* Inside Card */}
              <div className="absolute top-0 left-0 w-full h-full px-4 pt-4 pb-3 z-10 flex flex-col justify-between">
                <div>
                  {/* Heading */}
                  <h2
                    ref={headingRef}
                    className={`text-left leading-snug mb-3 travel-heading ${
                      visibleElements.heading ? "visible" : ""
                    }`}
                  >
                    <div className="text-[18px] text-[#0F172A] font-semi-bold whitespace-nowrap">
                      {t("contactUs-section.heading")}
                    </div>
                    <span className="text-[20px] text-black font-bold whitespace-nowrap tracking-tighter -mr-3">
                      {t("contactUs-section.SubHeading")}
                    </span>
                  </h2>

                  {/* CTA Buttons */}
                  <div
                    ref={buttonsRef}
                    className={`grid grid-cols-2 gap-x-3 gap-y-3 travel-buttons ${
                      visibleElements.buttons ? "visible" : ""
                    }`}
                  >
                    {[
                      `${t("contactUs-section.agent")}`,
                      `${t("contactUs-section.vendor")}`,
                      `${t("contactUs-section.Partnership")}`,
                    ].map((text, idx) => (
                      <div
                        key={idx}
                        className="flex items-center"
                        onClick={() => {
                          if (text === `${t("contactUs-section.agent")}`)
                            setOpenForm("agent");
                          else if (text === `${t("contactUs-section.vendor")}`)
                            setOpenForm("vendor");
                          else if (
                            text === `${t("contactUs-section.Partnership")}`
                          )
                            setOpenForm("partnership");
                        }}
                      >
                        <div className="flex items-center gap-[4px]">
                          <span className="text-[#F15623] font-semibold text-[12px] min-[400px]:text-[13px] leading-snug block whitespace-normal break-words [@media(min-width:351px)]:whitespace-nowrap">
                            {text}
                            <div className="h-[1px] bg-[#F15623] mt-[2px]" />
                          </span>
                          <a
                            href="#"
                            className={`w-[24px] h-[24px] flex items-center justify-center rounded-full border border-[#F15623] text-[#F15623] hover:bg-[#F15623] hover:text-white transition ${
                              idx === 0 || idx === 2 ? "ml-[2px]" : ""
                            } ${idx === 1 ? "ml-[10px]" : ""}`}
                          >
                            <ArrowUpRight size={12} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Button */}
            <div className="relative w-full max-w-[370px] mx-auto">
              <div
                ref={contactBtnRef}
                className={`absolute -top-9 sm:-bottom-12 right-6 sm:right-6 z-30 travel-contact ${
                  visibleElements.contactBtn ? "visible" : ""
                }`}
              >
                <button className="bg-[#F15623] text-white px-4 sm:px-5 py-2 rounded-full font-medium hover:bg-[#d54417] transition shadow font-lato text-xs sm:text-sm">
                  {t("contactUs-section.contact-us")}
                </button>
              </div>
            </div>
          </div>

          {/* ipad air + mini */}
          <div className="hidden md:flex lg:hidden w-full px-6 py-12 justify-center items-start gap-6 relative z-20">
            <div className="absolute inset-0 z-0">
              <img
                src={BackgroundPattern}
                alt="Background Pattern"
                className="w-full h-full object-cover object-bottom"
              />
            </div>

            {/* Travel Image */}
            <div
              ref={imageRef}
              className={`w-[58%] translate-x-4 travel-image ${
                visibleElements.image ? "visible" : ""
              }`}
            >
              <img
                src={LeftImage}
                alt="Traveler"
                width={500}
                height={400}
                className="rounded-xl object-cover w-full h-auto"
              />
            </div>

            {/* Vector Card */}
            <div
              ref={cardRef}
              className={`relative travel-card ${
                visibleElements.card ? "visible" : ""
              }`}
              style={{
                width: "420px",
                height: "230px",
                transform: "translate(-59px, 100px)",
              }}
            >
              <img
                src={RightImage}
                alt="Curved Card"
                fill
                sizes="420px"
                className="object-contain drop-shadow-[0_10px_212px_rgba(0,0,0,0.2)]"
              />

              {/* Inside Vector Card */}
              <div className="absolute top-[30px] left-0 w-full h-full px-5 pt-4 pb-4 z-10 flex flex-col justify-between">
                <div>
                  {/* Heading */}
                  <div
                    ref={headingRef}
                    className={`flex flex-col leading-snug mb-6 travel-heading ${
                      visibleElements.heading ? "visible" : ""
                    }`}
                  >
                    <span className="text-[15px] text-[#0F172A] font-medium whitespace-nowrap">
                      {t("contactUs-section.heading")}
                    </span>
                    <span className="text-[17px] text-black font-bold whitespace-nowrap -mr-[2px]">
                      {t("contactUs-section.subHeading")}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div
                    ref={buttonsRef}
                    className={`grid grid-cols-2 gap-x-4 gap-y-3 travel-buttons ${
                      visibleElements.buttons ? "visible" : ""
                    }`}
                  >
                    {[
                      `${t("contactUs-section.agent")}`,
                      `${t("contactUs-section.vendor")}`,
                      `${t("contactUs-section.Partnership")}`,
                    ].map((text, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-[5px]"
                        onClick={() => {
                          if (text === `${t("contactUs-section.agent")}`)
                            setOpenForm("agent");
                          else if (text === `${t("contactUs-section.vendor")}`)
                            setOpenForm("vendor");
                          else if (
                            text === `${t("contactUs-section.Partnership")}`
                          )
                            setOpenForm("partnership");
                        }}
                      >
                        <span className="text-[#F15623] font-semibold text-[13px] leading-tight block whitespace-nowrap">
                          {text}
                          <div className="h-[1px] bg-[#F15623] mt-[2px]" />
                        </span>
                        <a
                          href="#"
                          className="w-[26px] h-[26px] flex items-center justify-center rounded-full border border-[#F15623] text-[#F15623] hover:bg-[#F15623] hover:text-white transition"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Button */}
            <div
              ref={contactBtnRef}
              className={`absolute bottom-[105px] right-[110px] z-30 [@media(min-width:820px)]:bottom-[125px] [@media(min-width:1024px)]:bottom-[140px] travel-contact ${
                visibleElements.contactBtn ? "visible" : ""
              }`}
            >
              <button className="bg-[#F15623] text-white px-5 py-2 rounded-full font-medium hover:bg-[#d54417] transition shadow font-lato text-sm whitespace-nowrap">
                {t("contactUs-section.contact-us")}
              </button>
            </div>
          </div>

          {/* ipad pro */}
          <div className="hidden lg:flex [@media(min-width:1367px)]:hidden w-full px-8 py-16 justify-center items-start gap-8 relative z-20">
            <div className="absolute inset-0 z-0">
              <img
                src={BackgroundPattern}
                alt="Background Pattern"
                fill
                className="object-cover object-bottom"
              />
            </div>

            {/* Travel Image */}
            <div
              ref={imageRef}
              className={`w-[52%] translate-x-4 travel-image ${
                visibleElements.image ? "visible" : ""
              }`}
            >
              <img
                src={LeftImage}
                alt="Traveler"
                width={500}
                height={400}
                className="rounded-xl object-cover w-full h-auto"
              />
            </div>

            {/* Vector Card */}
            <div
              ref={cardRef}
              className={`relative travel-card ${
                visibleElements.card ? "visible" : ""
              }`}
              style={{
                width: "420px",
                height: "230px",
                transform: "translate(-105px, 170px)",
              }}
            >
              <img
                src={RightImage}
                alt="Curved Card"
                sizes="420px"
                className="object-contain drop-shadow-[0_10px_212px_rgba(0,0,0,0.2)]"
              />

              {/* Inside Vector Card */}
              <div className="absolute top-[30px] left-0 w-full h-full px-5 pt-4 pb-4 z-10 flex flex-col justify-between">
                <div>
                  {/* Heading */}
                  <div
                    ref={headingRef}
                    className={`flex flex-col leading-snug mb-6 travel-heading ${
                      visibleElements.heading ? "visible" : ""
                    }`}
                  >
                    <span className="text-[15px] text-[#0F172A] font-medium whitespace-nowrap">
                      ${t("contactUs-section.heading")}
                    </span>
                    <span className="text-[17px] text-black font-bold whitespace-nowrap -mr-[2px]">
                      {t("contactUs-section.subHeading")}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div
                    ref={buttonsRef}
                    className={`grid grid-cols-2 gap-x-4 gap-y-3 travel-buttons ${
                      visibleElements.buttons ? "visible" : ""
                    }`}
                  >
                    {[
                      `${t("contactUs-section.agent")}`,
                      `${t("contactUs-section.vendor")}`,
                      `${t("contactUs-section.Partnership")}`,
                    ].map((text, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-[5px]"
                        onClick={() => {
                          if (text === `${t("contactUs-section.agent")}`)
                            setOpenForm("agent");
                          else if (text === `${t("contactUs-section.vendor")}`)
                            setOpenForm("vendor");
                          else if (
                            text === `${t("contactUs-section.Partnership")}`
                          )
                            setOpenForm("partnership");
                        }}
                      >
                        <span className="text-[#F15623] font-semibold text-[13px] leading-tight block whitespace-nowrap">
                          {text}
                          <div className="h-[1px] bg-[#F15623] mt-[2px]" />
                        </span>
                        <a
                          href="#"
                          className="w-[26px] h-[26px] flex items-center justify-center rounded-full border border-[#F15623] text-[#F15623] hover:bg-[#F15623] hover:text-white transition"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Us Button */}
            <div
              ref={contactBtnRef}
              className={`absolute bottom-[105px] right-[190px] z-30 [@media(min-width:820px)]:bottom-[195px] [@media(min-width:1024px)]:bottom-[140px] travel-contact ${
                visibleElements.contactBtn ? "visible" : ""
              }`}
            >
              <button className="bg-[#F15623] text-white px-5 py-2 rounded-full font-medium hover:bg-[#d54417] transition shadow font-lato text-sm whitespace-nowrap">
                {t("contactUs-section.contact-us")}
              </button>
            </div>
          </div>

          {/* ✅ Desktop Bottom Wrap */}
          <div className="absolute bottom-[-26px] left-0 w-full z-40 hidden md:block">
            <img
              src={DesktopBottomWrap}
              alt="Bottom Wrap"
              width={1920}
              height={100}
              className="w-full object-cover"
            />
          </div>

          {/* ✅ Mobile Bottom Wrap */}
          <div className="absolute bottom-[-45px] left-0 w-full z-30 md:hidden">
            <img
              src={MobileBottomWrap}
              alt="Top Wrap Mobile"
              width={1920}
              height={60}
              className="w-full object-cover h-[90px]"
            />
          </div>
        </div>
      </div>

      {openForm && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm bg-opacity-50 z-10 flex items-center justify-center">
          <div className="shadow-xl bg-white p-6 lg:p-10 rounded-2xl w-[80%] lg:max-w-1/2 z-30 text-black">
            {openForm === "agent" && (
              <AgentForm onClose={() => setOpenForm(null)} />
            )}
            {openForm === "vendor" && (
              <VendorForm onClose={() => setOpenForm(null)} />
            )}
            {openForm === "partnership" && (
              <PartnershipForm onClose={() => setOpenForm(null)} />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const AgentForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [agentFormData, setAgentFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    category: "",
  });

  const HandleAgentFormSave = (e) => {
    e.preventDefault();
    console.log(agentFormData); // Collected form data

    // TODO: Call your API here

    onClose(); // Close modal or form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <p className="text-2xl font-jakarta font-bold text-primary mb-8 text-nowrap pr-10">
        {t("contactUs-section.agent")}
      </p>
      <form onSubmit={HandleAgentFormSave}>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.name")}
            </label>
            <input
              type="text"
              name="name"
              value={agentFormData.name}
              onChange={handleChange}
              placeholder="Alex"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.email")}
            </label>
            <input
              type="email"
              name="email"
              value={agentFormData.email}
              onChange={handleChange}
              placeholder="Alex@gmail.com"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.phone")}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={agentFormData.phoneNumber}
              onChange={handleChange}
              placeholder="ex: 90080 70060"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.category")}
            </label>
            <input
              type="text"
              name="category"
              value={agentFormData.category}
              onChange={handleChange}
              placeholder="ex: Traveler Guide"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
        </div>
        <div className="flex justify-end-safe gap-4">
          <button
            onClick={() => onClose()}
            className="text-[#F15623] border-primary px-5 py-2 rounded-full font-medium hover:underline transition shadow font-sans text-sm whitespace-nowrap mt-8 flex justify-self-end"
          >
            {t("contactUs-section.cancel")}
          </button>
          <button
            type="submit"
            className="bg-[#F15623] text-white px-5 py-2 rounded-full font-medium hover:bg-[#d54417] transition shadow font-sans text-sm whitespace-nowrap mt-8 flex justify-self-end"
          >
            {t("contactUs-section.send")}
          </button>
        </div>
      </form>
    </>
  );
};

const VendorForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [vendorFormData, setVendorFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    business: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vendorFormData);

    // TODO: Add API call to submit data

    onClose();
  };

  return (
    <>
      <p className="text-2xl font-jakarta font-bold text-primary mb-8 text-nowrap pr-10">
        {t("contactUs-section.vendor")}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-10">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.name")}
            </label>
            <input
              type="text"
              name="name"
              value={vendorFormData.name}
              onChange={handleChange}
              placeholder="Alex"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.email")}
            </label>
            <input
              type="email"
              name="email"
              value={vendorFormData.email}
              onChange={handleChange}
              placeholder="Alex@gmail.com"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.phone")}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={vendorFormData.phoneNumber}
              onChange={handleChange}
              placeholder="ex: 90080 70060"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.business")}
            </label>
            <input
              type="text"
              name="business"
              value={vendorFormData.business}
              onChange={handleChange}
              placeholder="ex: hotel"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
        </div>
        <div className="flex justify-end-safe gap-4">
          <button
            onClick={() => onClose()}
            className="text-[#F15623] border-primary px-5 py-2 rounded-full font-medium hover:underline transition shadow font-sans text-sm whitespace-nowrap mt-8 flex justify-self-end"
          >
            {t("contactUs-section.cancel")}
          </button>
          <button
            type="submit"
            className="bg-[#F15623] text-white px-5 py-2 rounded-full font-medium hover:bg-[#d54417] transition shadow font-sans text-sm whitespace-nowrap mt-8 flex justify-self-end"
          >
            {t("contactUs-section.send")}
          </button>
        </div>
      </form>
    </>
  );
};

const PartnershipForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Partnership Form Data:", formData);

    // TODO: Handle API call here
    onClose();
  };

  return (
    <>
      <p className="text-2xl font-jakarta font-bold text-primary mb-8 text-nowrap pr-10">
        {t("contactUs-section.Partnership")}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.name")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Alex"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Alex@gmail.com"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-sans font-semibold text-gray-500">
              {t("contactUs-section.phone")}
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="ex: 90080 70060"
              className="px-[17px] py-[15px] rounded-[5.25px] border border-[#CCCCCC]"
              required
            />
          </div>
        </div>
        <div className="flex justify-end-safe gap-4">
          <button
            onClick={() => onClose()}
            className="text-[#F15623] border-primary px-5 py-2 rounded-full font-medium hover:underline transition shadow font-sans text-sm whitespace-nowrap mt-8 flex justify-self-end"
          >
            {t("contactUs-section.cancel")}
          </button>
          <button
            type="submit"
            className="bg-[#F15623] text-white px-5 py-2 rounded-full font-medium hover:bg-[#d54417] transition shadow font-sans text-sm whitespace-nowrap mt-8 flex justify-self-end"
          >
            {t("contactUs-section.send")}
          </button>
        </div>
      </form>
    </>
  );
};
