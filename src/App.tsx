// App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Overview from "./Pages/Overview";
import Sidebar from "./Pages/Sidebar";
import Transaction from "./Pages/Transaction";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
