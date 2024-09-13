import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import logo from "@/assets/images/logo.png";
import Unisat from "@/assets/images/unisat.svg";
import xverse from "@/assets/images/xverse-logo.png";
import magiceden from "@/assets/images/magic-eden-logo.png";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { addressShortening } from "@/utils/address";
import { useNavigate } from "react-router-dom";
import SearchComponent from "./Search";
const Header = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const { connectWallet, walletType, paymentAddress, signOut } = useAuth();
  const handleOpenWalletModal = () => {
    setModalOpen(!modalOpen);
  };
  const moveProfile = () => {
    navigate("/profile");
  };
  const handleOut = () => {
    signOut(); // Call the signOut function
    navigate("/"); // Navigate to the login page (or any other page)
  };
  const moveTools = () => {
    navigate("/tools")
  }
  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-dark">
      <div className="mx-40 my-4 flex items-center justify-between">
        <div className="flex flex-row gap-4">
          <Link to="https://rare-sat.adors.org/">
            <div className="flex cursor-pointer items-center justify-start gap-2">
              <img src={logo} width={40} />
              <div className="text-[36px]">Adors</div>
            </div>
          </Link>
          <SearchComponent />
        </div>
            <Link to="/">
              <div className="flex cursor-pointer items-center justify-start gap-2">
                <div className="text-[24px]">Rare Sats</div>
              </div>
            </Link>
            <button onClick={moveTools} className="bg-[#ff00ff] w-[8%] rounded-md p-2 ml-48">
              <p className="text-sm">Tools</p>
            </button>
        {walletType ? (
          <Menu>
            <MenuHandler>
              <Button
                placeholder={undefined}
                className="bg-[#ff00ff]"
                onClick={handleOpenWalletModal}
              >
                {addressShortening(paymentAddress)}
              </Button>
            </MenuHandler>

            <MenuList placeholder={undefined} className="bg-dark">
              <MenuItem placeholder={undefined}>
                <div
                  className="flex items-center justify-start gap-2 text-white"
                  onClick={moveProfile}
                >
                  <div>Profile</div>
                </div>
              </MenuItem>
              <MenuItem placeholder={undefined}>
                <div
                  className="flex items-center justify-start gap-2 text-white"
                  onClick={handleOut}
                >
                  <div>Logout</div>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            {/* <MenuHandler>
              <Button
                placeholder={undefined}
                className="bg-[#ff00ff] ml-80"
                onClick={handleOpenWalletModal}
              >
                Connect Wallet
              </Button>
            </MenuHandler> */}
            <MenuHandler>
              <Button
                placeholder={undefined}
                className="bg-[#ff00ff]"
                onClick={handleOpenWalletModal}
              >
                Connect Wallet
              </Button>
            </MenuHandler>
            <MenuList placeholder={undefined} className="bg-dark">
              <MenuItem placeholder={undefined}>
                <div
                  className="flex items-center justify-start gap-2 text-white"
                  onClick={() => connectWallet("Unisat")}
                >
                  <Unisat />
                  <div>Unisat</div>
                </div>
              </MenuItem>
              <MenuItem placeholder={undefined}>
                <div
                  className="flex items-center justify-start gap-2 text-white"
                  onClick={() => connectWallet("Xverse")}
                >
                  <img src={xverse} />
                  <div>Xverse</div>
                </div>
              </MenuItem>
              <MenuItem placeholder={undefined}>
                <div
                  className="flex items-center justify-start gap-2 text-white"
                  onClick={() => connectWallet("MagicEden")}
                >
                  <img src={magiceden} width={30} />
                  <div>Magic Eden</div>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Header;
