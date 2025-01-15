import React from "react";
import { FileEarmarkText } from "react-bootstrap-icons";

interface Prop {
    title: string
}

const SessionListItem = ({title}: Prop) => {
  return (
    <>
      <li className="nav-item">
        <a className="nav-link d-flex align-items-center gap-2" href="#">
          <FileEarmarkText />
          {title}
        </a>
      </li>
    </>
  );
};

export default SessionListItem;
