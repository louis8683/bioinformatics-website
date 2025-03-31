// import React, { useContext } from "react";
import { FileEarmarkText } from "react-bootstrap-icons";
import { Session } from "../models/session";
// import { SessionContext } from "../context/SessionContext";

interface Props {
  title: string;
  session?: Session;
  setSession?: (session: Session) => void;
}

const SessionListItem = ({ title, session, setSession }: Props) => {
  const formattedTime =
    session?.startTimestamp &&
    new Date(session.startTimestamp).toLocaleString("en-US", {
      month: "short",     // 'Apr'
      day: "numeric",     // '14'
      hour: "numeric",    // '6'
      minute: "2-digit",  // '23'
      hour12: true,       // 'AM/PM'
    });

  return (
    <li
      className="nav-item px-3 py-2"
      onClick={() => {
        if (session && setSession) {
          setSession(session);
        }
      }}
      style={{ cursor: session && setSession ? "pointer" : "default" }}
    >
      <div className="nav-link d-flex flex-column gap-1 p-0">
        {formattedTime && (
          <small className="text-muted">{formattedTime}</small>
        )}
        <div className="d-flex align-items-center gap-2">
          <FileEarmarkText />
          <span className="fw-bold">{title}</span>
        </div>
      </div>
    </li>
  );
};

export default SessionListItem;