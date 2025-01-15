import { useState } from "react";
import "./App.css";

import { Calendar3, Cart, Check2, CircleHalf, DoorClosed, FileEarmark, FileEarmarkText, GearWideConnected, GraphUp, HouseFill, List, MoonStarsFill, People, PlusCircle, Puzzle, Search, SunFill } from 'react-bootstrap-icons'

import "./assets/css/dashboard.css";
import "./assets/css/template.css";
import DarkModeToggle from "./components/DarkModeToggle";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  return (
    <>
      <DarkModeToggle />

      <Header />

      

      <div className="container-fluid">
        <div className="row">
          <Sidebar />

          <MainContent />
        </div>
      </div>
    </>
  );
}

export default App;
