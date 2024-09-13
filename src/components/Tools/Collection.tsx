import { useRef } from "react";
interface CollectionProps {
  handleNextTab: () => void; // Ensure handleNextTab is a function
}
const Collection: React.FC<CollectionProps> = ({ handleNextTab }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const categories = [
    "Virtual Art",
    "Membership",
    "Domain Names",
    "Painting",
    "Photography",
    "Music",
    "Video",
    "Collectibles",
    "VI",
    "Games",
    "Education",
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-4">
        <label>Collection Name</label>
        <input
          className="text-gray-400 flex-grow rounded-md border-[1px] border-[#57534E] bg-[#25211F] px-2 py-4 focus:outline-none"
          type="text"
          placeholder="Collection Name"
        ></input>
      </div>
      <div className="flex flex-col p-4">
        <label>Description</label>
        <textarea
          className="text-gray-400 flex-grow rounded-md border-[1px] border-[#57534E] bg-[#25211F] px-2 py-4 focus:outline-none"
          placeholder="Collection Description"
        ></textarea>
      </div>
      <div className="relative flex flex-col justify-center p-4">
        <svg
          className="pointer-events-none absolute right-4 top-12 m-4 h-2 w-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fillRule="nonzero"
          />
        </svg>
        <label className="p-1 text-[#D6D3D1]">Collection category</label>
        <select className="text-gray-600 hover:border-gray-400 h-10 appearance-none rounded-md border-[1px] border-[#57534E] bg-[#25211F] pl-5 pr-10 focus:outline-none">
          {categories.map((item, key) => (
            <option key={key}>{item}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col p-4">
        <label>
          Website {"("}Optional{")"}
        </label>
        <input
          className="text-gray-400 flex-grow rounded-md border-[1px] border-[#57534E] bg-[#25211F] px-2 py-4 focus:outline-none"
          type="text"
          placeholder="https://website.url/info"
        ></input>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col p-4">
          <label>
            Twitter {"("}Optional{")"}
          </label>
          <input
            className="text-gray-400 flex-grow rounded-md border-[1px] border-[#57534E] bg-[#25211F] px-2 py-4 focus:outline-none"
            type="text"
            placeholder="https://x.com/pagename"
          ></input>
        </div>{" "}
        <div className="flex flex-col p-4">
          <label>
            Discord {"("}Optional{")"}
          </label>
          <input
            className="text-gray-400 flex-grow rounded-md border-[1px] border-[#57534E] bg-[#25211F] px-2 py-4 focus:outline-none"
            type="text"
            placeholder="https://discord.gg/invite"
          ></input>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-[]">Cover image. Recommended size: 250x250px</p>
      </div>
      <div className="flex justify-center p-6">
        <div
          className="flex h-[250px] w-[250px] cursor-pointer flex-col items-center justify-center rounded-md border-[3px] border-dotted border-[#57534E]"
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
          <p className="text-center">
            Drag and drop your cover Image: jpg,png,gif,svg,webp
          </p>
        </div>
      </div>
      <div className="flex items-start p-4">
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
export default Collection;
