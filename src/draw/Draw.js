import "./draw.css";
import Tickets from "./tickets/Tickets";
import Winners from "./winners/Winners";

export default function Draw() {
  return (
    <div className="draw">
      <Tickets />
      <Winners />
    </div>
  );
}
