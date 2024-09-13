import React, { useState } from "react";
import Table from "./Table";
import RareSats from "./RareSats";
import Inscriptions from "./Inscriptions";

const TabComponent: React.FC = () => {
  //this component displays data for the inscriptio tab, rare-sats tab and other sats tab based on the wallet address(ordinal address)
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Inscriptions", "Rare Sats", "Other Sats"]; // tab options

  return (
    <div className="ml-24 flex min-h-screen items-start justify-start">
      <div className="text-center">
        <ul className="my-4 flex items-center justify-start">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={`text-gray-500 cursor-pointer border-b-4 px-4 py-2 ${activeTab === index ? "border-pink-500 text-pink-500" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </li>
          ))}
        </ul>

        <div className="mx-auto w-full">
          {activeTab === 0 && <Inscriptions />}
          {activeTab === 2 && (
            <div className="bg-[#929c9c]">
              <Table />
            </div>
          )}
          {activeTab === 1 && <RareSats />}
        </div>
      </div>
    </div>
  );
};

export default TabComponent;
