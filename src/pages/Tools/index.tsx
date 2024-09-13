import ToolComponent from "@/components/Tools/ToolComponent";
import React from "react";

const Tools = () => {
  return (
    <div className="mt-36 flex flex-col justify-center bg-transparent">
      <p className="bg-gradient-to-r from-[#d4406f] via-[#8e56bb] to-[#55b0cc] bg-clip-text text-center text-4xl text-transparent">
        Deploy your Collection in minutes
      </p>
      <p className="text-center text-xl">
        Follow the steps below to deploy your collection
      </p>
      <p className="bg-gradient-to-r from-[#d4406f] via-[#8e56bb] to-[#55b0cc] bg-clip-text text-center text-3xl text-transparent">
        {"["}Inscribe with Files{"]"}
      </p>
      <div className="mt-10 flex justify-center">
        <ToolComponent />
      </div>
    </div>
  );
};
export default Tools;
