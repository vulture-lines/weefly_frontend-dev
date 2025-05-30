import React from "react";
import { GridLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="fixed z-50 bg-white inset-0 flex justify-center items-center">
      <GridLoader color="#EE5128" />
    </div>
  );
};

export default LoadingScreen;
