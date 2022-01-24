import { useCallback, useState } from "react";
import Title from "../../../components/title/Title";
import { hashUrl, trimHash } from "../../../utils/tickets";
import { useDrawContext } from "../../draw.store";
import { usePotContext } from "../pot/pot.store";
import "./prize.css";

const placeholder = "...";

export default function Prize({ prize, className }) {
  const { solPrice, prizesPot } = usePotContext();
  const { canSubmitPrize, winners, submitWinner } = useDrawContext();
  const winner = winners[prize];
  const [error, setError] = useState(false);
  const onKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        const result = submitWinner(prize, event.target.value);
        setError(!result);
      }
    },
    [prize, submitWinner, setError]
  );
  const onCopyWinnerToClipboard = useCallback(() => {
    navigator.clipboard.writeText(`${prize}: ${winner.ticket}`);
  }, [prize, winner]);

  const prizePot = prizesPot[prize];

  return (
    <div className={className}>
      <Title className={"prize-title"}>
        {prize}
        <div className="prize-pot">
          {prizePot ? `${prizePot.toFixed(2)} ◎` : placeholder}
        </div>
        <div className="prize-pot-usd">
          {prizePot ? `($${(prizePot * solPrice).toFixed(2)})` : placeholder}
        </div>
      </Title>
      <div className="prize-input-container">
        <label>Pos:</label>
        <input
          className={`prize-input ${error && "error"}`}
          type="tel"
          onKeyPress={onKeyPress}
          disabled={!canSubmitPrize(prize)}
        />
      </div>
      <div className="winner">
        {!!winner && (
          <>
            <div className="winner-ticket" onClick={onCopyWinnerToClipboard}>
              {winner.ticket}
            </div>
            <a href={hashUrl(winner.hash)} target="_blank">
              <div
                className="image"
                style={{ backgroundImage: `url('${winner.imageUrl}')` }}
              />
            </a>
          </>
        )}
      </div>
    </div>
  );
}
