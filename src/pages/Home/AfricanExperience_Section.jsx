import { Dot } from "lucide-react";
import BannerBottom from "../../assets/images/banner-bottom.png";
import DesktopLeftBg from "../../assets/images/new-3.png";
import { useTranslation } from "react-i18next";

const NewsDatas = [
  {
    time: "4 hours",
    Title:
      "TUI launches direct low-cost flights from the UK to Agadir, boosting Morocco tourism and making African travel more affordable for European tourists.",
  },
  {
    time: "4 hours",
    Title:
      "United and Delta Airlines expand services to Africa with new routes to Ghana, Senegal, and Morocco, strengthening U.S.–Africa air connectivity.",
  },
  {
    time: "4 hours",
    Title:
      "Ethiopian Airlines reveals Vision 2035 strategy to double fleet size, increase destinations, and become one of the world’s top 20 global carriers.",
  },
];

const AfricanExperience_Section = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen bg-red-50 relative w-full bg-gradient-to-r from-[rgb(250,217,207)] to-[#f28c72] px-4 overflow-hidden">
      <div className="max-w-7xl h-full mx-auto flex flex-col-reverse md:flex-row">
        <div className="left news-section h-full w-full flex items-center justify-start">
          {/* News component */}
          <NEWSSection newsData={NewsDatas} />
        </div>
        <div className="right image-section h-full w-full relative flex justify-center items-center">
          <span className="font-jakarta font-semibold text-[18px] lg:text-[30px] text-center lg:leading-[35px] pl-8">
            {/* Discover Local Options, <br /> Experience the Unexplored! */}
            {t("news.title.line1")} <br /> {t("news.title.line2")}
          </span>
          <img
            src={DesktopLeftBg}
            alt="African Experience Background"
            className="absolute mix-blend-plus-lighter lg:scale-[120%] w-full object-center object-cover"
          />
        </div>
      </div>
      <img
        src={BannerBottom}
        alt="Decorative bottom banner"
        height={40}
        width={662}
        className="absolute bottom-[-39px] z-30 h-20 w-full object-cover"
      />
    </div>
  );
};

export default AfricanExperience_Section;

const NEWSSection = ({ newsData }) => {
  const { t } = useTranslation();
  return (
    <>
      <div
        className="h-full flex flex-col items-start justify-center"
        data-aos="fade-left"
      >
        <div className="flex items-center justify-between w-full ">
          <div className="bg-gradient-to-r to-[#fad9cf]/0 from-[#f28c72] px-6 p-4 max-w-fit uppercase font-semibold font-jakarta">
            {t("news.feature")}
          </div>
          <a
            href=""
            className="uppercase text-sm pr-[12px] hover:underline font-jakarta font-medium text-primary"
          >
            {t("news.view")}
          </a>
        </div>
        <div className="max-h-[70%] lg:max-h-[70%] overflow-y-scroll no-scrollbar flex flex-col gap-4 mt-10">
          {newsData.map((news, index) => (
            <div className="p-4 group" key={index}>
              {/* <div className="h-px max-w-[200px] bg-black"></div> */}
              <div className="mb-2 flex text-sm font-jakarta items-center gap-1">
                Weefly<span className="text-xs"> NEWS</span> <Dot /> {news.time}
                ago
              </div>
              <p className="font-jakarta text-xl font-semibold text-black/50 transition-colors duration-150 max-w-[400px] text-justify leading-tight line-clamp-3 group-hover:text-black">
                {news.Title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
