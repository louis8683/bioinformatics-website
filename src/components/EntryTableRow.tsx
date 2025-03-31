// import React from "react";

interface Props {
  col0: string
  col1: string
  col2: string
  col3: string
  col4: string
  col5: string
}

const EntryTableRow = ({col0, col1, col2, col3, col4, col5}: Props) => {
  return (
    <>
      <tr>
        <td>{col0}</td>
        <td>{col1}</td>
        <td>{col2}</td>
        <td>{col3}</td>
        <td>{col4}</td>
        <td>{col5}</td>
      </tr>
    </>
  );
};

export default EntryTableRow;
