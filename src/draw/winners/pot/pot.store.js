import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { solscanFetch } from "../../../utils/solscan";
import { prizes, useDrawContext } from "../../draw.store";

const PotContext = createContext();

export const usePotContext = () => useContext(PotContext);

const address = "5LBuqY4atj7txzL6eri7XBcn9qy9MhSyVA6ACiHQGrGq";
const lamportsPerSol = 1000000000;

async function getPotBalance() {
  const [{ lamports }, { priceUsdt }] = await Promise.all([
    solscanFetch("account", { address }),
    solscanFetch("market", { symbol: "SOL" }),
  ]);
  return { balance: lamports / lamportsPerSol, solPrice: priceUsdt };
}

export function PotStore({ children }) {
  const [solPrice, setSolPrice] = useState(0);
  const [pot, setPot] = useState(0);
  useEffect(() => {
    (async function () {
      const { balance, solPrice } = await getPotBalance();
      setPot(balance);
      setSolPrice(solPrice);
    })();
  }, [setPot, setSolPrice]);
  const { tickets } = useDrawContext();

  const prizesPot = useMemo(() => {
    const ticketPrice = 0.1;
    return {
      [prizes.jackpot]: pot + tickets.length * ticketPrice * 0.47,
      [prizes.first]: tickets.length * ticketPrice * 0.2,
      [prizes.second]: tickets.length * ticketPrice * 0.1,
    };
  }, [pot, tickets]);

  return (
    <PotContext.Provider value={{ solPrice, prizesPot }}>
      {children}
    </PotContext.Provider>
  );
}
