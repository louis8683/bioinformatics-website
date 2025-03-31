import { useContext } from "react";
import EntryTableRow from "./EntryTableRow";
import { useQuery } from "react-query";
import { fetchEntriesFromSession } from "../api/entry";
import { SessionContext } from "../context/SessionContext";
import { Entry } from "../models/entry";
import { useAuth } from "react-oidc-context";


function formattedTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",     // 'Apr'
    day: "numeric",     // '14'
    hour: "numeric",    // '6'
    minute: "2-digit",  // '23'
    hour12: true,       // 'AM/PM'
  });
}

const MainContent = () => {
  const session = useContext(SessionContext);

  const auth = useAuth();

  const accessToken = auth.user?.access_token

  const {
    data: entries,
    // isLoading,
    // isError,
    // error,
  } = useQuery(["entry", session], () => fetchEntriesFromSession(session!.id, accessToken!), {
    enabled: !!session && !!accessToken,
  });

  // TODO: loading and error indicator

  console.log(entries)

  const handleExport = () => {
    if (!entries || entries.length === 0) {
      alert("No data to export.");
      return;
    }
  
    // Define the order of CSV columns based on Entry interface
    const headers = [
      "id",
      "userId",
      "sessionId",
      "timestamp",
      "latitude",
      "longitude",
      "coLevel",
      "pm2_5Level",
      "temperature",
      "humidity",
    ];
  
    const csvRows = [
      headers.join(","), // header row
      ...entries.map((entry: Entry) =>
        headers.map(key => {
          const value = entry[key as keyof Entry];
          return typeof value === "string" ? `"${value}"` : value;
        }).join(",")
      ),
    ];
  
    const csvContent = csvRows.join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `session-${session?.id}-entries.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group me-2">
              {/* <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Share
              </button> */}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleExport}
              >
                Export session to CSV
              </button>
            </div>
            {/* <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
            >
              <Calendar3 />
              This week
            </button> */}
          </div>
        </div>

        {/* <canvas
          className="my-4 w-100"
          id="myChart"
          width="900"
          height="380"
        ></canvas> */}

        <h2>Title: {session?.title}</h2>
        <p>Description: {session?.description}</p>
        <div className="table-responsive small">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">PM2.5</th>
                <th scope="col">CO</th>
                <th scope="col">Temperature</th>
                <th scope="col">Humidity</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            <tbody>
              {entries && entries.length > 0 ? (
                entries.map((entry: Entry) => (
                  <EntryTableRow
                    key={`${entry.id}`}
                    col0={`${formattedTime(entry.timestamp)}`}
                    col1={`${entry.pm2_5Level}`}
                    col2={`${entry.coLevel}`}
                    col3={`${entry.temperature.toFixed(1)}`}
                    col4={`${Math.round(entry.humidity * 100)}%`}
                    col5={`(${entry.latitude},${entry.longitude})`}
                  />
                ))
              ) : (
                <EntryTableRow
                  col0="no entry"
                  col1="no entry"
                  col2="no entry"
                  col3="no entry"
                  col4="no entry"
                  col5="no entry"
                />
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default MainContent;
