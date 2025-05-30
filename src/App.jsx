import { Route, Routes } from "react-router";
import { useEffect } from "react";
import Aos from "aos";
import "./hook/I18n";

import RootLayout from "./RootLayout";
import WebsiteLayout from "./Layouts/WebsiteLayout";

import Home from "./pages/Home/Home";
import FlightList from "./pages/FlightsList/FlightList";
import FlightBooking from "./pages/FlightBooking/FlightBooking";

// Authentication Pages
import LoginPage from "./Authentication/LoginPage";
import SignupPage from "./Authentication/SignupPage";
import LoginWithMobile from "./Authentication/LoginWithMobile";
import OTP_VerificationPage from "./Authentication/OTP_VerificationPage";
import ForgotPassword from "./Authentication/ForgotPassword";

// Booking sections
import ReviewYourBooking from "./pages/FlightBooking/ReviewYourBooking";
import TravelersDetails from "./pages/FlightBooking/TravelersDetails";
import SeatSelectionPage from "./pages/FlightBooking/SeatSelectionPage";
import PaymentPage from "./pages/FlightBooking/PaymentPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ScrollToTop from "./components/ScrollToTop";
import ContactUsPage from "./pages/ContactUsPage/ContactUsPage";
import ScrollToHash from "./components/ScrollToHash";

const App = () => {
  useEffect(() => {
    Aos.init({
      once: true,
    });
  }, []);
  return (
    <>
      <ScrollToHash />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Website Route */}
          <Route path="" element={<WebsiteLayout />}>
            <Route index element={<Home />} />
            <Route path="/List" element={<FlightList />} />
            <Route path="/Booking" element={<FlightBooking />}>
              <Route path="ReviewYourBooking" element={<ReviewYourBooking />} />
              <Route path="TravelersDetails" element={<TravelersDetails />} />
              <Route path="SeatSelection" element={<SeatSelectionPage />} />
              <Route path="Payment" element={<PaymentPage />} />
            </Route>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="/Contact" element={<ContactUsPage />} />
          </Route>
          {/* Authentication Route */}
          <Route path="SignUp" element={<SignupPage />} />
          <Route path="Login" element={<LoginPage />} />
          <Route path="Login-with-mobile" element={<LoginWithMobile />} />
          <Route path="OTP-Verification" element={<OTP_VerificationPage />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
