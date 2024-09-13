import React,{useState} from 'react';

const Toggle: React.FC = () => {
  const [isBlue, setIsBlue] = useState(false);
  const toggleColor = () => {
    setIsBlue(!isBlue);
  };

  return (
    <div className="max-w-lg mx-auto">
      <link
        rel="stylesheet"
        href="https://unpkg.com/@themesberg/flowbite@1.1.0/dist/flowbite.min.css"
      />

      <label htmlFor="toggle-example" className="flex items-center cursor-pointer relative mb-4">
        <input type="checkbox" id="toggle-example" className="sr-only" />
        <div className={`toggle-bg border-2 h-6 w-11 rounded-full ${isBlue ? 'bg-blue-500' : 'bg-white'}`} onClick={toggleColor}></div>
        <span className="ml-3 text-white text-sm font-medium">Duplicate file/delegate will be removed</span>
      </label>

      <label htmlFor="toggle-example-checked" className="flex items-center cursor-pointer relative">
        <input type="checkbox" id="toggle-example-checked" className="sr-only" defaultChecked />
        <div className="toggle-bg bg-[#f0ecf3] border-2 h-6 w-11 rounded-full"></div>
        <span className="ml-3 text-white text-sm font-medium">Files will not be compressed before inscribing</span>
      </label>


      <script src="https://unpkg.com/@themesberg/flowbite@1.1.0/dist/flowbite.bundle.js"></script>
    </div>
  );
};

export default Toggle;
