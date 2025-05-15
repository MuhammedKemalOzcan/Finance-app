// App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Overview from "./Pages/Overview";
import Sidebar from "./Pages/Sidebar";
import Transaction from "./Pages/Transaction";
import Pots from "./Pages/Pots";
import Bills from "./Pages/Bills";
import Budgets from "./Pages/Budgets";
import data from "./data.json";
import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path={`/transaction`} element={<Transaction />} />
          <Route path="/pots" element={<Pots />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/budgets" element={<Budgets />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
