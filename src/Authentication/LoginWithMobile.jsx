import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import WeeFlyLogo from "../assets/Auth/OrangeWeeflyLogo.svg";
import ForgetPasswordBg from "../assets/Auth/ForgotPasswordBg.png";
import PhoneInput from "react-phone-input-2";

import LoginWithMobileBg from "../assets/Auth/Login-with-mobile-Bg.png";
import "react-phone-input-2/lib/style.css";
import { SendOTP } from "../features/firebase";

function LoginWithMobile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  console.log(location.state.loginUserData);

  // const [, set] = useState(second)

  useEffect(() => {
    const userData = location?.state?.loginUserData;

    if (userData) {
      console.log(userData);
    } else {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    // const testdata = "9361450717";
    // const res = await SendOTP(testdata);
    const res = await SendOTP(`+${phone}`);

    console.log("Submitting phone:", phone);
    console.log("Submitting phone:", res);

    if (res) {
      navigate("/OTP-Verification", { state: { res } });
    }
  };
  return (
    <div className="h-screen flex relative overflow-hidden">
      <div
        data-aos="fade-right"
        className="left-section w-full xl:w-1/2 h-full bg-white flex flex-col px-[24px] xl:px-[136px]"
      >
        {/* Add form or content here */}
        <div className=" h-full flex flex-col items-center justify-center gap-[15px]">
          <img
            src={WeeFlyLogo}
            alt="WeeFly Logo"
            className="h-[70px] w-[92px]"
          />
          <h1 className="font-jakarta font-semibold text-[24px]">
            Login with mobile number
          </h1>
          <h1 className="font-jakarta font-normal text-[16px] text-[#555555] text-center max-w-[430px]">
            Please confirm your country code and enter your mobile number
          </h1>
          <form onSubmit={handleSubmit} className="max-w-[430px] w-full">
            <div className="mb-4 w-full">
              <label className="font-jakarta font-normal text-base text-[#555555]">
                Phone number
              </label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={setPhone}
                inputClass="!w-full !pl-14 !pr-[20px] !py-[14px] !text-base !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-2 !focus:ring-orange-500"
                buttonClass="!bg-transparent !pl-3"
                containerClass="!w-full !rounded-md"
                dropdownClass="!w-48 !rounded-md"
              />
            </div>

            {/* 🔧 This is required for Firebase to attach reCAPTCHA */}
            <div id="recaptcha-container" className="my-2" />

            <button
              type="submit"
              className="font-jakarta font-semibold text-[18px] w-full bg-[#EE5128] py-[14px] rounded-[8px] text-white mt-[40px] drop-shadow-xl drop-shadow-[#FD74014D]"
            >
              Login now
            </button>
          </form>

          <p className="mt-[30px] font-jakarta font-normal text-[16px]">
            Don’t have an account?{" "}
            <Link
              to={"/SignUp"}
              className="font-bold text-[18px] text-[#EE5128]"
            >
              Signup
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
          src={LoginWithMobileBg}
          alt="Login With Mobile Background"
          className="object-cover object-right w-full h-full"
        />
      </div>
    </div>
  );
}

export default LoginWithMobile;
