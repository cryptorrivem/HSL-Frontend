import { useCallback, useState } from "react";
import FileInput from "../../components/file-input/FileInput";
import { getId, hashUrl, parseTextFile, trimHash } from "../../utils/tickets";
import "./tickets.css";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const onFileReady = useCallback(
    (data) => {
      setTickets(parseTextFile(data));
    },
    [setTickets]
  );

  return (
    <div>
      <FileInput
        id="tickets-file"
        placeholder="<< Load Lotto file >>"
        onReady={onFileReady}
      />
      <div className="table">
        <div className="tickets header">
          <div>pos</div>
          <div>#</div>
          <div>Ticket</div>
          <div>Hash</div>
        </div>
        <div className="scrollable-tickets">
          <div className="tickets">
            {tickets.map(({ pos, number, ticket, hash }) => (
              <>
                <div>{pos}</div>
                <a id={getId(number)} href={`#${getId(number)}`}>
                  {number}
                </a>
                <div>{ticket}</div>
                <a href={hashUrl(hash)} target="_blank">
                  {trimHash(hash)}
                </a>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
