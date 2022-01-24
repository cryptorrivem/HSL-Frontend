import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { publicSolscanFetch } from "../utils/solscan";
import { getId } from "../utils/tickets";

const DrawContext = createContext();

export const useDrawContext = () => useContext(DrawContext);

export const prizes = {
  second: "2nd guaranteed prize",
  first: "1st guaranteed prize",
  jackpot: "Jackpot",
};

export function DrawStore({ children }) {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [winners, setWinners] = useState({});
  const submitWinner = useCallback(
    (prize, winnerPos) => {
      if (
        winnerPos > 0 &&
        winnerPos <= tickets.length &&
        Object.keys(winners)
          .filter((k) => k !== prize)
          .every((k) => winners[k].pos !== winnerPos)
      ) {
        const winner = tickets.find((t) => t.pos === winnerPos);
        window.location.hash = `#${getId(winner.number)}`;
        setCurrentTicket(winner);
        setWinners({ ...winners, [prize]: winner });
        return winner;
      }
      return false;
    },
    [tickets, winners, setCurrentTicket, setWinners]
  );
  useEffect(() => {
    const toProcess = Object.values(winners).filter((w) => !w.imageUrl);
    if (toProcess.length > 0) {
      (async function () {
        const results = await Promise.all(
          toProcess.map(({ hash }) => publicSolscanFetch(`account/${hash}`))
        );
        toProcess.forEach((w, ix) => {
          w.imageUrl = results[ix].metadata.data.image;
        });
        setWinners({ ...winners });
      })();
    }
  }, [winners, setWinners]);
  const canSubmitPrize = useCallback(
    (prize) => {
      if (tickets.length === 0) {
        return false;
      }
      switch (prize) {
        case prizes.first:
          return !!winners[prizes.second];
        case prizes.jackpot:
          return !!winners[prizes.first] && !!winners[prizes.second];
        default:
          return true;
      }
    },
    [winners, tickets]
  );

  return (
    <DrawContext.Provider
      value={{
        tickets,
        setTickets,
        currentTicket,
        winners,
        submitWinner,
        canSubmitPrize,
      }}
    >
      {children}
    </DrawContext.Provider>
  );
}
