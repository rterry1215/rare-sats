import { useRef } from "react";
import Toggle from "./Toggle";
import SatType from "./SatType";
interface CollectionProps {
  handleNextTab: () => void; // Ensure handleNextTab is a function
  handlePrevTab: () => void; // Ensure handleNextTab is a function
}

const Inscription: React.FC<CollectionProps> = ({
  handleNextTab,
  handlePrevTab,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center gap-4 p-6">
        <p>Inscription files. You can choose multiple files.</p>
        <div
          className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-md border-[3px] border-dotted border-[#57534E]"
          onClick={handleDivClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden" // Hide the file input
            accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp" // Acceptable file types
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                console.log(files); // Handle the selected files
              }
            }}
          />
          <svg
            className="text-gray-500 dark:text-gray-400 mb-4 h-8 w-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="text-center text-[#a5a2a2]">
            Drag and drop your cover Image: jpg,png,gif,svg,webp
          </p>
          <p className="p-4 text-start text-xs text-[#a5a2a2]">
            apng, asc, avif, bin, binpb, cbor, css, flac, gif, glb, gltf, html,
            jpg, js, json, md, mp3, mp4, otf, pdf, png, py, stl, svg, ttf, txt,
            wav, webm, webp, woff, woff2, yaml
          </p>
        </div>
      </div>
      <div className="flex items-start justify-start">
        <Toggle />
      </div>
      <div className="flex w-full flex-col p-4">
        <p>Files to inscribe - 0 files.</p>
        <input className="rounded-md bg-[#292524]"></input>
      </div>
      {/* */}
         <SatType />
      {/* */}
      <div className="flex flex-col justify-center gap-4 p-6">
        <p>
          JSON Metadata {"("}optional{")"}
        </p>
        <div
          className="flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-md border-[3px] border-dotted border-[#57534E]"
          onClick={handleDivClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden" // Hide the file input
            accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp" // Acceptable file types
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                console.log(files); // Handle the selected files
              }
            }}
          />
          <svg
            className="text-gray-500 dark:text-gray-400 mb-4 h-8 w-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="text-center text-[#a5a2a2]">
            Drag and drop your cover Image: jpg,png,gif,svg,webp
          </p>
          <p className="p-4 text-start text-xs text-[#a5a2a2]">
            Metadata:json file only
          </p>
        </div>
      </div>
      <div className="gap-2 p-4">
        <p className="">Parent/Child Inscription</p>
        <button className="h-8 w-28 gap-2 rounded-md border-[1px] border-[#ff00ff] bg-[#25211F] text-sm hover:bg-[#ff00ff]">
          Add Parent
        </button>
      </div>
      <div className="flex flex-col p-4">
        <label>
          Destination Address{"("}es{")"}
        </label>
        <input
          className="text-gray-400 flex-grow rounded-md border-[1px] border-[#57534E] bg-[#25211F] px-2 py-4 focus:outline-none"
          placeholder="Destination Address"
        ></input>
      </div>
      <div className="flex flex-row justify-start gap-6 p-4">
        <button className="from-primary-900 via-secondary-900 to-tertiary-900 flex w-[24%] items-center gap-1 rounded border-[1px] border-[#a55da5] bg-[#25211F] p-2  px-4 py-2 text-sm font-medium text-white transition-all hover:gap-2 hover:bg-gradient-to-r">
          <span>Send to many</span>
        </button>
        <button className="from-primary-900 via-secondary-900 to-tertiary-900 flex w-[25%] items-center gap-1 rounded bg-gradient-to-r p-2 px-4 py-2 text-sm font-medium text-white transition-all hover:gap-2">
          <span>Send to one</span>
        </button>
        <button className="from-primary-900 via-secondary-900 to-tertiary-900 flex w-[40%] items-center gap-1 rounded  border-[1px] border-[#a55da5] bg-[#25211F] p-2 px-4 py-2 text-sm font-medium text-white transition-all hover:gap-2 hover:bg-gradient-to-r">
          <span>Use connected address</span>
        </button>
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
        <button
          className="from-primary-900 via-secondary-900 to-tertiary-900 flex items-center gap-1 rounded bg-gradient-to-r p-2 px-4 py-2 text-sm font-medium text-white transition-all hover:gap-2"
          onClick={handleNextTab}
        >
          <span>Continue</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="currentColor"
            className="bi bi-arrow-right-short h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default Inscription;
