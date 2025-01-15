import React from "react";

interface Props {
  id: string
  col1: string
  col2: string
  col3: string
  col4: string
}
const EntryTableRow = ({id, col1, col2, col3, col4}: Props) => {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{col1}</td>
        <td>{col2}</td>
        <td>{col3}</td>
        <td>{col4}</td>
      </tr>
    </>
  );
};

export default EntryTableRow;
