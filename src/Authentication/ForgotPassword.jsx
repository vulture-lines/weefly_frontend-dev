import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
import MobileIcon from "../assets/Auth/MobileIcon.svg";
import ForgetPasswordBg from "../assets/Auth/ForgotPasswordBg.png";
import MailIcon from "../assets/Auth/MailIcon.svg";
import { Link, useNavigate } from "react-router";
import { AlignRight, ArrowLeft, X } from "lucide-react";
// import { Link, useNavigate } from "react-router";
// import { HandleGoogleLogin } from "../features/firebase";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const NavLinks = [
    { label: t("navbar.home"), link: "/" },
    { label: t("navbar.aboutus"), link: "/" },
    { label: t("navbar.services"), link: "/#ServicesOffered" },
    { label: t("navbar.news"), link: "/#newsSection" },
    { label: t("navbar.media"), link: "/" },
    { label: t("navbar.contactus"), link: "/Contact" },
  ];
  return (
    <div className="h-screen flex relative overflow-hidden">
      <div
        data-aos="fade-right"
        className="left-section w-full xl:w-1/2 h-full bg-white flex flex-col px-[24px] xl:px-[136px]"
      >
        <div
          className={`fixed h-full transition-all duration-300 origin-left right-0 bg-black/40 backdrop-blur-md z-[60] overflow-hidden ${
            isMenuOpen ? "w-full" : "w-0"
          }`}
        >
          <div className="w-full z-50 top-0 px-10 xl:px-40 font-sans h-20 flex justify-between items-center text-white">
            <div className="text-2xl font-bold">
              <p
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <span>
                  <ArrowLeft />
                </span>
                <span> {t("back")}</span>
              </p>
            </div>
            <div className="" onClick={() => setIsMenuOpen(false)}>
              <X className="h-8 w-8 -rotate-90" />
            </div>
          </div>
          <div className="flex flex-col text-right top-0 px-10 xl:px-40 text-3xl font-medium text-white gap-5 mt-5">
            {NavLinks.map((link, index) => (
              <Link
                to={link.link}
                key={index}
                onClick={() => setIsMenuOpen(false)}
                className="transition duration-300 hover:underline hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        {/* menu */}
        <div className="w-full z-50 top-0 font-sans h-20 flex justify-between items-center text-primary">
          <div
            className="font-bold flex items-center gap-1 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <span>
              <ArrowLeft />
            </span>
            <span>{t("back")}</span>
          </div>
          <div className="" onClick={() => setIsMenuOpen(true)}>
            <AlignRight className="h-8 w-8" />
          </div>
        </div>
        {/* Add form or content here */}
        <div className=" h-full flex flex-col items-center justify-center gap-[15px]">
          <img
            src={WeeFlyLogo}
            alt="WeeFly Logo"
            className="h-[70px] w-[92px]"
          />
          <h1 className="font-jakarta font-semibold text-[24px]">
            {t("forgotPassword.title")}
          </h1>
          <h1 className="font-jakarta font-normal text-[16px] text-[#555555] text-center max-w-[430px]">
            {t("forgotPassword.description")}
          </h1>
          <form action="" className="max-w-[430px] w-full">
            <div className="w-full">
              <label
                htmlFor=""
                className="font-jakarta font-normal text-base text-[#555555]"
              >
                {t("forgotPassword.email")}
              </label>
              <div className="relative bg-[#F1F3F6] flex rounded-l-[8px] w-full mt-[14px]">
                <input
                  type="email"
                  placeholder="alex@email.com"
                  className="px-[20px] py-[14px] w-full outline-[#EE5128]"
                />
                <div className="px-[20px] py-[14px] rounded-[8px] bg-[#EE5128] grid place-items-center">
                  <img src={MailIcon} alt="Mail Icon" />
                </div>
              </div>
            </div>

            <button className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[40px] drop-shadow-xl drop-shadow-[#FD74014D]">
              {t("forgotPassword.send")}
            </button>
          </form>
          <p className="mt-[30px] font-jakarta font-normal text-[16px]">
            {t("forgotPassword.resend-msg")}
            <Link to={"#"} className="font-bold text-[18px] text-[#EE5128]">
              {t("forgotPassword.resend")}
            </Link>
          </p>
          <p className="font-jakarta font-normal text-[16px]">
            Are you a business?
            <Link
              to={"/#travel-section"}
              className="font-bold pl-1 text-[18px] text-[#EE5128]"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
      <div
        data-aos="fade-left"
        className="right-section hidden xl:block xl:w-1/2 h-full bg-black relative"
      >
        {/* <div className=""></div> */}
        <img
          src={ForgetPasswordBg}
          alt="ForgetPassword Background"
          className="object-cover object-center w-full h-full"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
