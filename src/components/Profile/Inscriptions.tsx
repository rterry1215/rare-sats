import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { validate } from "bitcoin-address-validation";
import { useAuth } from "@/context/AuthContext";

const Inscriptions = () => {
  const { ordinalAddress } = useAuth();
  // const ordinalAddress = "bc1pxfgth5u8dpvtwzcfkud87n9sfs56ypymc7gv0r2ydvp64clkdxzsv4mvty"
  const [inscriptions, setInscriptions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!ordinalAddress) return;
      if (validate(ordinalAddress)) {
        try {
          const response = await fetch(
            `https://api-prod.magisat.io/profile/inscriptions?walletAddress=${ordinalAddress}`,
            {
              method: "GET",
              headers: {},
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          // console.log(data);
          const newInscriptions: string[] = []; // Ensure this is an array of strings

          data.results.forEach((item: any) => {
            if (item.includedInCollections) {
              item.includedInCollections.forEach((index: any) => {
                // Check if inscriptionId is empty and set it to '1' if it
                // console.log(index);
                const inscriptionId = index.inscriptionId;
                newInscriptions.push(inscriptionId);
              });
            }
          });

          // Update the state with the new inscriptions
          setInscriptions((prevInscriptions) => [
            ...prevInscriptions,
            ...newInscriptions.filter(id => !prevInscriptions.includes(id))
          ]);

          // Log the updated inscriptions to verify
          console.log("Updated Inscriptions1:", [
            ...inscriptions,
            ...newInscriptions,
          ]);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch inscriptions. Please try again.");
        }
      } else {
        toast.error("This Address is not a valid BTC address!");
      }
    })();
  }, [ordinalAddress]);

  return (
    <div className="flex flex-wrap">
      {inscriptions.map((item, key) => (
        <img
          key={key}
          src={`https://snapshots.magisat.io/${item}`}
          alt=""
          className="h-36 w-32 p-4"
        />
      ))}
    </div>
  );
};

export default Inscriptions;
