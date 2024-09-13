import { useState } from "react";
import Collection from "./Collection";
import Inscription from "./Inscription";
import Review from "./Review";
const ToolComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Collection", "Inscription", "Review & Deploy"]; // tab options
  const handleNextTab = () => {
    setActiveTab((prevTab) => (prevTab + 1) % tabs.length); // Loop back if it's the last tab
  };
  const handlePrevTab = () => {
    setActiveTab((prevTab) => (prevTab - 1) % tabs.length);
  }
  return (
    <div>
    <div className="flex flex-col min-h-[500px] w-[620px] bg-[#25211F] rounded-md">
      <div className="text-center">
        <ul className="my-4 flex items-center justify-center gap-12">
          {tabs.map((tab, index) => (
            <div 
            key={index} 
            >
            <li
              key={index}
              className={`text-gray-500 cursor-pointer border-b-[1px] px-4 py-2 text-2xl ${activeTab === index ? "border-[#A855F7] text-[#AA55F7]" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="">
        {activeTab===0 && (
            <Collection handleNextTab={handleNextTab} />
        )}
        {activeTab===1 && (
            <Inscription handleNextTab={handleNextTab} handlePrevTab={handlePrevTab}/>
        )}
        {activeTab===2 && (
            <Review handlePrevTab={handlePrevTab}/>
        )}
      </div>
    </div>
    </div>
  );
};
export default ToolComponent;
