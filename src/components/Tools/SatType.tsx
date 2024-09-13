import { useState, useEffect } from "react";

const SatTypes = [
  {
    name: "Uncommon",
    content: "First satoshi in a block.",
    price: "$214.99",
  },
  {
    name: "Block 9 450x",
    content: "One of the earliest satoshis mined in the 9th block.",
    price: "$22.22",
  },
  {
    name: "Block 666",
    content: "Any satoshi mined in the 666th block.",
    price: "$6.66",
  },
  {
    name: "Block 78",
    content: "Any satoshi from the first block mined by Hal Finney.",
    price: "$0.49",
  },
  {
    name: "Block 286",
    content: "Any satoshi mined by Satoshi Nakamoto.",
    price: "$0.49",
  },
  {
    name: "Hitman",
    content: "A satoshi spent by Ross Ulbricht to hire a hitman.",
    price: "$0.49",
  },
  {
    name: "Pizza",
    content: "A satoshi from Laszlo Hanyecz's pizza transaction.",
    price: "$0.25",
  },
  {
    name: "Silk Road",
    content: "A satoshi seized from Silk Road.",
    price: "$0.25",
  },
];

const SatType = () => {
  const [owned, setOwned] = useState<any[]>([]);
  const [utxo, setUtxo] = useState<any[]>([]);
  const rareSatInfo = async () => {
    try {
      const response = await fetch(
        `https://api-prod.magisat.io/profile/rare-sats?walletAddress=bc1p4739f92lqh6jxtfh9ax3wlg0crufykrvpmrtlkdk2mm54auqsmcq8ydlyk`,
        {
          method: "GET",
          headers: {},
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Assuming data.results is an array and each item has a utxo property
      const newUtxo = data.results.map((item: any) => item.utxo).flat();// Flatten if necessary
      if(newUtxo && newUtxo.length > 0){
          setUtxo(newUtxo); // Update the state with the new UTXO data
          console.log(utxo);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gw.sating.io/api/account/sats/bc1preuq80rf78r0074rz4t04yj4wefn7th2he3m7jpck82fwst8v4zsmk0tpg`,
          {
            method: "GET",
            headers: {},
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const uniqueNewOwned: string[] = [];

        data.forEach((item: any) => {
          if (item.sats && item.sats.length > 0) {
            item.sats.forEach((sat: any) => {
              if (sat.types) {
                const type = sat.types[0]; // Get type from the current sat
                if (type && type !== "inscription") {
                  // Check if the type is already in the uniqueNewOwned array
                  if (!uniqueNewOwned.includes(type)) {
                    uniqueNewOwned.push(type); // Add type if it's not already included
                  }
                }
              }
            });
          }
        });

        // Update the owned state with unique values
        setOwned((prevOwned) => {
          const combinedOwned = [...prevOwned, ...uniqueNewOwned];
          // Filter out duplicates
          return Array.from(new Set(combinedOwned));
        });
        // console.log("Updated owned:", owned);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [owned]);

  // Only re-run if `owned` state changes
  const [click, setClick] = useState(0);
  const handleClickRandom = () => {
    setClick(1);
  };

  const handleClickPurchase = () => {
    setClick(2);
  };
  const handleClickOwned = () => {
    setClick(3);
  };

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex flex-row justify-center gap-2 p-2">
        <div
          className={`rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262] ${click === 1 && "border-[#d36fd3]"}`}
          onClick={handleClickRandom}
        >
          <p>Random</p>
          <p className="text-xs">this will randomly inscribe on any sat</p>
        </div>
        <div
          className={`rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262] ${click === 2 && "border-[#d36fd3]"}`}
          onClick={handleClickPurchase}
        >
          <p>Purchase</p>
          <p className="text-xs">this can be greyed out for now</p>
        </div>
        <div
          className={`rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262] ${click === 3 && "border-[#d36fd3]"}`}
          onClick={handleClickOwned}
        >
          <p>Owned</p>
          <p className="text-xs">Inscribe a satoshi you already own.</p>
        </div>
      </div>
      {click === 2 && (
        <div className="flex flex-wrap p-4">
          {SatTypes.map((item, key) => (
            <div
              key={key}
              className="flex w-1/2 justify-between rounded-md border-[1px] border-[#57534E] px-3 py-4 hover:bg-[#646262]"
            >
              <div>
                <p>{item.name}</p>
                <p className="text-xs">{item.content} </p>
              </div>
              <div>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {click === 3 && (
        <div className="flex flex-col p-4">
          <p>
            Chisel will automatically inscribe the first satoshi of the UTXO you
            send in the "Send Your Ordinal" step.
          </p>
          <div className="flex flex-wrap">
            {owned.map((item: string, key: number) =>
              // Split the item into words and map over them
              item.split(" ").map((word: string, index: number) => (
                <div
                  key={`${key}-${index}`}
                  className="m-1 rounded border-[#57534E] border-[1px] p-2 hover:bg-[#a55da5] cursor-pointer"
                  onClick={rareSatInfo}
                >
                  {word}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default SatType;
