import React, { useState } from "react";
import i18n from "i18next";
import { Languages } from "lucide-react";

const LanguageCodes = [
  { code: "en", lang: "English" },
  { code: "pt", lang: "Portuguese" },
  { code: "fr", lang: "French" },
];

const TranslatorSwitch = () => {
  const [selectedLng, setSelectedLng] = useState(i18n.language || "en");

  const handleLangSubmit = (e) => {
    const newLang = e.target.value;
    setSelectedLng(newLang);
    i18n.changeLanguage(newLang); // <- i18next switch
  };

  return (
    <div className="flex items-center gap-2">
      <Languages />
      <select
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={handleLangSubmit}
        value={selectedLng}
      >
        {LanguageCodes.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TranslatorSwitch;
