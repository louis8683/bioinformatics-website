import "./App.css";

import "./assets/css/dashboard.css";
import "./assets/css/template.css";
import DarkModeToggle from "./components/DarkModeToggle";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { SessionContext } from "./context/SessionContext";
import { useState } from "react";
import { Session } from "./models/session";
// import { useAuth } from "react-oidc-context";
// import { signOutRedirect } from "./auth/functions";

function App() {

  const [session, setSession] = useState<Session | undefined>(undefined)

  return (
    <>
      <DarkModeToggle />

      <Header />

      <div className="container-fluid">
        <SessionContext.Provider value={session}>
          <div className="row">
            <Sidebar setSession={setSession}/>

            <MainContent />
          </div>
        </SessionContext.Provider>
      </div>
    </>
  );
}

export default App;
