import Pro from "@/assets/images/profile.png";
import { useAuth } from "@/context/AuthContext";
import Copy from "@/assets/images/copy.svg";
import TabComponent from "./TabComponent";

const Address = () => {
  const { ordinalAddress } = useAuth();
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="ml-10 flex flex-row justify-center p-20">
          <img src={Pro} className="w-full" />
          <span className="ml-4 mt-6">{ordinalAddress}</span>
          <div className="ml-2 mt-7 w-full">
            <Copy />
          </div>
        </div>
      </div>
      <TabComponent />
    </div>
  );
};
export default Address;
