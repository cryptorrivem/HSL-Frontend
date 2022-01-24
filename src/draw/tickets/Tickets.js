import { useCallback } from "react";
import FileInput from "../../components/file-input/FileInput";
import Title from "../../components/title/Title";
import { getId, hashUrl, parseTextFile, trimHash } from "../../utils/tickets";
import { useDrawContext } from "../draw.store";
import "./tickets.css";

function Ticket({ pos, number, hash, currentTicket }) {
  const isCurrent = currentTicket && currentTicket.number === number;
  const className = isCurrent ? "title" : "";

  return (
    <>
      <div className={className}>{pos}</div>
      <a id={getId(number)} href={`#${getId(number)}`} className={className}>
        {number}
      </a>
      <a href={hashUrl(hash)} target="_blank" className={className}>
        {trimHash(hash)}
      </a>
    </>
  );
}

export default function Tickets() {
  const { tickets, setTickets, currentTicket } = useDrawContext();
  const onFileReady = useCallback(
    (data) => {
      setTickets(parseTextFile(data));
    },
    [setTickets]
  );

  return (
    <div>
      <div className="tickets-header">
        <FileInput
          id="tickets-file"
          placeholder="<< Load Lotto file >>"
          onReady={onFileReady}
        />
        {tickets.length > 0 && (
          <span>
            <Title>Tickets purchased:</Title> {tickets.length}
          </span>
        )}
      </div>
      <div className={`table ${tickets.length === 0 && "hidden"}`}>
        <div className="tickets">
          <Title>pos</Title>
          <Title>#</Title>
          <Title>Hash</Title>
        </div>
        <div className="scrollable-tickets">
          <div className="tickets">
            {tickets.map((t) => (
              <Ticket key={t.number} {...t} currentTicket={currentTicket} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
