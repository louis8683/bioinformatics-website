import React from "react";
import { Calendar3 } from "react-bootstrap-icons";
import EntryTableRow from "./EntryTableRow";

const MainContent = () => {
  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Share
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Export
              </button>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
            >
              <Calendar3 />
              This week
            </button>
          </div>
        </div>

        <canvas
          className="my-4 w-100"
          id="myChart"
          width="900"
          height="380"
        ></canvas>

        <h2>Section title</h2>
        <div className="table-responsive small">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
              </tr>
            </thead>
            <tbody>
              <EntryTableRow id="1,001" col1="random" col2="data" col3="placeholder" col4="text"/>
              <EntryTableRow id="1,002" col1="placeholder" col2="irrelevant" col3="visual" col4="layout"/>
              <EntryTableRow id="1,003" col1="data" col2="rich" col3="dashboard" col4="tabular"/>
              <EntryTableRow id="1,004" col1="information" col2="placeholder" col3="illustrative" col4="data"/>
              <EntryTableRow id="1,005" col1="data" col2="rich" col3="dashboard" col4="tabular"/>
              <EntryTableRow id="1,006" col1="random" col2="data" col3="placeholder" col4="text"/>
              <EntryTableRow id="1,007" col1="placeholder" col2="irrelevant" col3="visual" col4="layout"/>
              <EntryTableRow id="1,008" col1="data" col2="rich" col3="dashboard" col4="tabular"/>
              <EntryTableRow id="1,009" col1="information" col2="placeholder" col3="illustrative" col4="data"/>
              <EntryTableRow id="1,010" col1="data" col2="rich" col3="dashboard" col4="tabular"/>
              <EntryTableRow id="1,011" col1="random" col2="data" col3="placeholder" col4="text"/>
              <EntryTableRow id="1,012" col1="placeholder" col2="irrelevant" col3="visual" col4="layout"/>
              <EntryTableRow id="1,013" col1="data" col2="rich" col3="dashboard" col4="tabular"/>
              <EntryTableRow id="1,014" col1="information" col2="placeholder" col3="illustrative" col4="data"/>
              <EntryTableRow id="1,015" col1="data" col2="rich" col3="dashboard" col4="tabular"/>
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default MainContent;
