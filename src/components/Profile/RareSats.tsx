import React, { useEffect, useState, useMemo } from "react";
import { validate } from "bitcoin-address-validation";

import Epic from "@/assets/icons/RareSats/Epic.png";
import Alpha from "@/assets/icons/RareSats/Alpha.png";
import Pali_1D from "@/assets/icons/RareSats/1D Pali.png";
import Pali_2D from "@/assets/icons/RareSats/2D Pali.png";
import Pali_3D from "@/assets/icons/RareSats/3D Pali.png";
import B666_Pali from "@/assets/icons/RareSats/B666 Pali.png";
import BlackRare from "@/assets/icons/RareSats/Black Rare.png";
import BlackEpic from "@/assets/icons/RareSats/Black Epic.png";
import BlackUncommon from "@/assets/icons/RareSats/Black Uncommon.png";
import Block9450X from "@/assets/icons/RareSats/Block 9 450x.png";
import Block9 from "@/assets/icons/RareSats/Block 9.png";
import Block78 from "@/assets/icons/RareSats/Block 78.png";
import Block286 from "@/assets/icons/RareSats/Block 286.png";
import Block666 from "@/assets/icons/RareSats/Block 666.png";
import FibonacciSequence from "@/assets/icons/RareSats/Fibonacci Sequence.png";
import Legacy from "@/assets/icons/RareSats/Legacy.png";
import NakamotoPalindrome from "@/assets/icons/RareSats/Nakamoto Palindrome.png";
import PaliBlockPalindrome from "@/assets/icons/RareSats/PaliBlock Palindrome.png";
import PizzaPalindrome from "@/assets/icons/RareSats/Pizza Palindrome.png";
import RodarmorName from "@/assets/icons/RareSats/Rodarmor Name.png";
import SequencePali from "@/assets/icons/RareSats/Sequence Pali.png";
import Silkroad from "@/assets/icons/RareSats/Silkroad.png";
import VintagePalindrome from "@/assets/icons/RareSats/Vintage Palindrome.png";
import Hitman from "@/assets/icons/RareSats/Hitman.png";
import Jpeg from "@/assets/icons/RareSats/JPEG.png";
import Nakamoto from "@/assets/icons/RareSats/Nakamoto.png";
import Omega from "@/assets/icons/RareSats/Omega.png";
import Rare from "@/assets/icons/RareSats/Rare.png";
import Palindrome from "@/assets/icons/RareSats/Palindrome.png";
import PerfectPalinception from "@/assets/icons/RareSats/Perfect Palinception.png";
import Pizza from "@/assets/icons/RareSats/Pizza.png";
import Uncommon from "@/assets/icons/RareSats/Uncommon.png";
import Vintage from "@/assets/icons/RareSats/Vintage.png";
import UniformPalincetion from "@/assets/icons/RareSats/Unifrom Palinception.png";
import { useAuth } from "@/context/AuthContext";

const typeIcons: { [key: string]: any } = {
  epic: Epic,
  alpha: Alpha,
  pali_1d: Pali_1D,
  pali_2d: Pali_2D,
  pali_3d: Pali_3D,
  b666_pali: B666_Pali,
  blackepic: BlackEpic,
  fibonaccisequence: FibonacciSequence,
  black_rare: BlackRare,
  black_uncommon: BlackUncommon,
  paliblockpalindrome: PaliBlockPalindrome,
  pizzapalindrome: PizzaPalindrome,
  rodarmorname: RodarmorName,
  sequencepali: SequencePali,
  silkroad: Silkroad,
  vintagepalindrome: VintagePalindrome,
  legacy: Legacy,
  nakamotopalindrome: NakamotoPalindrome,
  block9450x: Block9450X,
  block9: Block9,
  block78: Block78,
  block286: Block286,
  block666: Block666,
  hitman: Hitman,
  jpeg: Jpeg,
  nakamoto: Nakamoto,
  omega: Omega,
  rare: Rare,
  palindrome: Palindrome,
  perfect_palinception: PerfectPalinception,
  pizza: Pizza,
  uncommon: Uncommon,
  vintage: Vintage,
  uniform_palinception: UniformPalincetion,
};

const RareSats = () => {
  const { ordinalAddress } = useAuth();
    // const ordinalAddress =
    //   "bc1px9400fnrhfhhesde92u4r32jm4cwdaq93tyette8gwv4t32ajacsxgz4av";

  const itemsPerPage = 18;

  const [filteredDisplay, setFilteredDisplay] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredDisplay.slice(startIndex, endIndex);
  }, [currentPage, filteredDisplay]);

  const filteredContent = useMemo(() => {
    return renderRareSatsDisplay(paginatedData);
  }, [paginatedData]);

  const totalPages = Math.ceil(filteredDisplay.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    const fetchSats = async () => {
      //scraping data using API request
      if (!ordinalAddress) return;
      if (validate(ordinalAddress)) {
        const response = await fetch(
          `https://gw.sating.io/api/account/sats/${ordinalAddress}`,
          {
            method: "GET",
            headers: {},
          }
        );
        const data = await response.json();

        const typesToFilter = Object.keys(typeIcons);
        const tempFilteredTypes: { [key: string]: any[] } = {};
        typesToFilter.forEach((type) => (tempFilteredTypes[type] = []));

        data.forEach((item: any) => {
          if (item.sats && item.sats.length > 0) {
            item.sats.forEach((sat: any) => {
              typesToFilter.forEach((type) => {
                if (sat.types && sat.types.includes(type)) {
                  tempFilteredTypes[type].push(item);
                }
              });
            });
          } else {
            console.log(`Data does not have sats or sats is empty`);
          }
        });

        const filteredData = Object.values(tempFilteredTypes).flat();
        setFilteredDisplay(filteredData);
        setCurrentPage(1);
      } else {
        // toast.error("This Address is not a valid BTC address!");
      }
    };

    fetchSats();
  }, [ordinalAddress]);

  function renderRareSatsDisplay(rareSats: any) {
    return rareSats.map((item: any) => {
      const sat = item.sats[0];
      if (!sat) return null;
      return (
        <>
          <div className="rounded-lg border border-[#21252C] bg-[#14161A] text-white">
            <div>
              <div className="mb-2 flex flex-col items-center rounded-t-md bg-[#21252C]">
                <div className="mb-2 mt-8 h-16 w-16">
                  <img
                    src={typeIcons[sat.types[0]]}
                    alt={sat.types[0]}
                    className="ml-2 inline h-16 w-16"
                  />
                </div>
                <div className="my-2 flex justify-center text-2xl text-red-500">
                  {sat.types.map((type: any, idx: any) =>
                    idx !== 0 ? (
                      <img
                        key={idx}
                        src={typeIcons[type]}
                        alt={type}
                        className="inline h-6 w-6"
                      />
                    ) : (
                      <div key="placeholder" className="inline h-6 w-6"></div>
                    )
                  )}
                </div>
              </div>

              <div className="p-4">
                <div key='placeholder' className="text-start text-xl font-semibold">
                  {sat.types[0]}
                </div>
                <div className="text-gray-400 text-sm">
                  {sat.sat[0] != sat.sat[1] ? (
                    <div className="flex justify-start gap-1 text-[12px]">
                      <div>{sat.sat[0]}</div>
                      <div> - </div>
                      <div>{sat.sat[1]}</div>
                    </div>
                  ) : (
                    <div>{sat.sat[0]}</div>
                  )}
                </div>
                <div className="mt-4 grid w-full grid-cols-2 gap-2 text-[12px]">
                  <div className="rounded-bl-3xl border border-[#265a8a] bg-[#111E25] p-2 text-center">
                    <div className="text-gray-500">BlockHeight</div>
                    <div className="text-white">{sat.block}</div>
                  </div>
                  <div className="rounded-br-3xl border border-[#265a8a] bg-[#111E25] p-2 text-center">
                    <div className="text-gray-500">BlockTime</div>
                    <div className="text-white">{sat.time.split("T")[0]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  }

  return (
    <div>
      <div className="mt-10 grid grid-cols-6 gap-4">{filteredContent}</div>
      <div className="mt-4 flex items-center justify-center">
        <button
          className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-white disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 text-white disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RareSats;
