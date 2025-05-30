// ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToHash = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // slight timeout ensures DOM is ready
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [hash]);

  return null;
};

export default ScrollToHash;
