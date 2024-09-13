import React, { FC, useMemo, useState } from "react";
import OOF from "@/assets/images/oof.png";
import { typeIcons } from "@/pages/Home";

const AllSats: FC<{ sats: any[] }> = ({ sats }) => {
  const itemsPerPage = 18;
  const [currentPage, setCurrentPage] = useState(1);

  function renderRareSatsDisplay(rareSats: any) {
    return rareSats.map((item: any, index: any) => {
      const sat = item.sats[0];
      if (!sat) return null;
      return (
        <div
          key={index}
          className="rounded-lg border border-[#21252C] bg-[#14161A] text-white"
        >
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
                    <div key='placeholder' className="inline h-6 w-6"></div>
                  )
                )}
              </div>
            </div>

            <div className="p-4">
              <div className="text-start text-xl font-semibold">
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
      );
    });
  }

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sats.slice(startIndex, endIndex);
  }, [currentPage, sats]);

  const filteredContent = useMemo(() => {
    return renderRareSatsDisplay(paginatedData);
  }, [paginatedData]);

  const totalPages = Math.ceil(sats.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="mx-10">
        {sats.length == 0 ? (
          <div className="mt-4 text-center font-bold italic">
            <div className="text-[64px] text-[#f53dc7]">OOF - Keep Hunting</div>
            <div className="mt-4 text-[24px]">
              Nothing here, who knows maybe your next try will be victorious!
            </div>
            <div className="mt-4 flex justify-center">
              <img src={OOF} />
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-4 text-center font-bold italic">
              <div className="text-[64px] text-[#f53dc7]">CONGRATULATIONS!</div>
              <div className="mt-4 text-[24px]">
                You found some special sats! Lets see what you discovers...
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <div className="grid max-w-[1200px] grid-cols-3 gap-4 md:grid-cols-6">
                {filteredContent}
              </div>
            </div>
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
        )}
      </div>
    </>
  );
};

export default AllSats;
