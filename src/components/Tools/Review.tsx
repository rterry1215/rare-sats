import { useState } from "react";
interface CollectionProps {
    handlePrevTab: () => void; // Ensure handleNextTab is a function
  }
const Review: React.FC<CollectionProps> = ({ handlePrevTab }) => {
  const categories = [
    "546 sat",
    "1,000 sat",
    "2,000 sat",
    "5,000 sat",
    "10,000 sat",
  ];
  const [click, setClick] = useState(0);

  const handleClickTurbo = () => {
    setClick(1);
  };
  const handleClickFastest = () => {
    setClick(2);
  };
  const handleClickRegular = () => {
    setClick(3);
  };
  const handleClickCustom = () => {
    setClick(4);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4">
        <p className="text-xl">File to inscribe: 0</p>
        <p className="text-xl">Metadata: No metadata file</p>
        <p className="text-xl">Total Size: 0 kb</p>
      </div>
      <div className="p-4">
        <p className="text-xl">Network fee</p>
        <div className="mt-4 flex flex-row justify-center gap-4">
          <div
            className={`rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262] ${click === 1 && "border-[#d36fd3]"}`}
            onClick={handleClickTurbo}
          >
            <p>Turbo</p>
            <p>8 sats/vByte</p>
          </div>
          <div
            className={`rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262] ${click === 2 && "border-[#d36fd3]"}`}
            onClick={handleClickFastest}
          >
            <p>Fastest</p>
            <p>6 sats/vByte</p>
          </div>
          <div
            className={`rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262] ${click === 3 && "border-[#d36fd3]"}`}
            onClick={handleClickRegular}
          >
            <p>Regular</p>
            <p>5 sats/vByte</p>
          </div>
          <div
            className={`rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262] ${click === 4 && "border-[#d36fd3]"}`}
            onClick={handleClickCustom}
          >
            <p>Custom</p>
            <p>Set sats/vByte</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <p>Fee estimate</p>
        <div className="flex flex-col rounded-sm border-[1px] border-[#57534E]">
          <div className="flex w-full">
            <div className="flex w-1/2 flex-col">
              <div className="flex flex-row px-4">
                <p className="flex items-center justify-center pt-0">Postage</p>
                <div className="relative flex flex-col justify-center p-4">
                  <svg
                    className="pointer-events-none absolute right-4 top-5 m-4 h-2 w-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#648299"
                      fillRule="nonzero"
                    />
                  </svg>
                  <select className="text-gray-600 hover:border-gray-400 h-10 appearance-none rounded-md border-[1px] border-[#57534E] bg-[#25211F] pl-5 pr-10 focus:outline-none">
                    {categories.map((item, key) => (
                      <option key={key}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="px-4">
                <p>Service Fee</p>
              </div>
              <div className="px-4 pt-2">
                <p>Inscription fee</p>
              </div>
            </div>
            <div className="flex w-1/2 flex-col gap-4 px-12 py-6">
              <div className="flex flex-row justify-between">
                <p>0</p>
                <p>$0.00</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>3,690</p>
                <p>$2.10</p>
              </div>
              <div className="flex flex-row justify-between">
                <p>0</p>
                <p>$0.00</p>
              </div>
            </div>
          </div>
          <div className="h-0.5 w-full bg-white"></div>
          <div className="flex w-full flex-row p-4">
            <div className="w-1/2 pt-4">
              <p>Overall fee</p>
            </div>
            <div className="flex w-1/2 justify-between px-8 py-4">
              <p>7,380</p>
              <p>$4.19</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-red-400">
          Please fill all non-optional fields and select network fee
        </p>
      </div>
      <div className="flex flex-row justify-between p-4">
        <button
          className="from-primary-900 via-secondary-900 to-tertiary-900 flex items-center gap-1 rounded bg-gradient-to-r p-2 px-4 py-2 text-sm font-medium text-white transition-all hover:gap-2"
          onClick={handlePrevTab}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="currentColor"
            className="bi bi-arrow-left-short h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            ></path>
          </svg>
          <span>Back</span>
        </button>
        <button className="from-primary-900 via-secondary-900 to-tertiary-900 flex w-[40%] items-center gap-1 rounded  border-[1px] border-[#a55da5] bg-[#25211F] p-2 px-4 py-2 text-sm font-medium text-white transition-all hover:gap-2 hover:bg-gradient-to-r">
          <span>Create Inscription Order</span>
        </button>
      </div>
    </div>
  );
};
export default Review;
