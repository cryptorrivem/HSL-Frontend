import { prizes } from "../draw.store";
import Jackpot from "./jackpot/Jackpot";
import { PotStore } from "./pot/pot.store";
import Prize from "./prize/Prize";
import "./winners.css";

export default function Winners() {
  return (
    <PotStore>
      <div className="winners">
        <Jackpot prize={prizes.jackpot} />
        <Prize prize={prizes.first} />
        <Prize prize={prizes.second} />
      </div>
    </PotStore>
  );
}
