import React from "react";
import "../App.css";
import data from "../data.json";
import chart from "../Assets/Chart.svg";
import { useNavigate } from "react-router-dom";

interface Transaction {
  amount: number;
  avatar: string;
  category: string;
  date: string;
  name: string;
  recurring: boolean;
}

interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

function Overview() {
  const navigate = useNavigate();
  console.log(data);
  return (
    <div className="w-full h-full px-10 py-8 bg-[#F8F4F0] flex flex-col gap-8 ">
      <p className="text-1"> Overview</p>
      {/* Balance */}
      <div className="flex gap-6">
        <div className="flex flex-col w-[30%] h-[120px] bg-white border border-[#F8F4F0] rounded-[12px] text-[#201F24] p-4 gap-2 hover:text-white hover:bg-black">
          <p className="text-4">Current Balance</p>
          <p className="text-1">${data.balance.current}.00</p>
        </div>
        <div className="flex flex-col w-[30%] h-[120px] bg-white border border-[#F8F4F0] rounded-[12px] text-[#201F24] p-4 gap-2 hover:text-white hover:bg-black">
          <p className="text-4">Income</p>
          <p className="text-1">${data.balance.income}</p>
        </div>
        <div className="flex flex-col w-[30%] h-[120px] bg-white border border-[#F8F4F0] rounded-[12px] text-[#201F24] p-4 gap-2 hover:text-white hover:bg-black">
          <p className="text-4">Expenses</p>
          <p className="text-1">${data.balance.expenses}</p>
        </div>
      </div>
      <div className=" flex gap-6">
        {/* Balance */}
        {/* column cards */}
        <div className="w-[50%] flex flex-col gap-6">
          {/* Pots */}
          <div>
            <div className=" bg-white h-[218px] border border-white rounded-[12px] p-8 flex flex-col gap-5">
              <div className="flex justify-between">
                <p className="text-2">Pots</p>
                <button onClick={() => navigate("/pots")}>See Details</button>
              </div>
              <div className="flex gap-6">
                <div className="bg-[#F8F4F0] w-[50%] h-[110px] border-[#F8F4F0] rounded-[12px] p-6 flex items-center gap-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-10"
                  >
                    <path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                  <div className="flex flex-col gap-2">
                    <p className="text-4 text-[#696868]">Total Saved</p>
                    <p className="text-1">$850</p>
                  </div>
                </div>
                {/* savings */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <span className="inline-flex h-[43px] w-[4px] items-center rounded-full text-sm font-medium bg-[#277C78] text-[#277C78]"></span>
                    <div className="flex flex-col">
                      <p className="text-5">Savings</p>
                      <p className="text-4-bold">$159</p>
                    </div>
                    <span className="inline-flex h-[43px] w-[4px] items-center rounded-full text-sm font-medium bg-[#F2CDAC] text-[#F2CDAC]"></span>
                    <div className="flex flex-col">
                      <p className="text-5">Gift</p>
                      <p className="text-4-bold">$40</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-flex h-[43px] w-[4px] items-center rounded-full text-sm font-medium bg-[#626070] text-[#626070]"></span>
                    <div className="flex flex-col">
                      <p className="text-5">Concert Ticket</p>
                      <p className="text-4-bold">$110</p>
                    </div>
                    <span className="inline-flex h-[43px] w-[4px] items-center rounded-full text-sm font-medium bg-[#82C9D7] text-[#82C9D7]"></span>
                    <div className="flex flex-col">
                      <p className="text-5">New Laptop</p>
                      <p className="text-4-bold">$10</p>
                    </div>
                  </div>
                </div>

                {/* savings */}
              </div>
            </div>
          </div>
          {/* Pots */}
          {/* Transactions */}
          <div className="bg-white h-auto border border-white rounded-[12px] p-8 flex flex-col gap-5">
            <div className="flex justify-between">
              <p className="text-2">Transaction</p>
              <button onClick={() => navigate("/transaction")}>View All</button>
            </div>
            {data.transactions.map(
              (transaction: Transaction, index) =>
                index <= 4 && (
                  <div key={index} className="flex justify-between">
                    <div className="flex gap-2  items-center">
                      <img src={transaction.avatar} />
                      <p>{transaction.name}</p>
                    </div>
                    <div>
                      <p
                        className={`${
                          transaction.amount > 0 ? "text-green-500" : ""
                        }`}
                      >
                        {transaction.amount > 0
                          ? `${"+$"}` + transaction.amount
                          : `${"-$"}` + Math.abs(transaction.amount)}
                      </p>
                      <p>
                        {new Date(transaction.date).toLocaleDateString("tr-TR")}
                      </p>
                    </div>
                  </div>
                )
            )}
            {/* Transactions */}
          </div>
          {/* Transactions */}
        </div>
        {/* column cards */}
        <div className="flex flex-col gap-6 w-[42%]">
          {/* Budgets */}
          <div className=" bg-white h-auto border border-white rounded-[12px] p-8 flex flex-col gap-5">
            <div className="flex justify-between">
              <p className="text-2">Budgets</p>
              <button onClick={() => navigate("/budgets")} >See Details</button>
            </div>
            <div className="flex gap-4">
              <img src={chart} className="size-60" />
              <div className="flex flex-col gap-2 justify-center ">
                {data.budgets.map((budget, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="h-[43px] w-[4px] items-center rounded-full text-sm font-medium bg-[#277C78] text-[#277C78]"></span>
                    <div className="flex flex-col">
                      <p>{budget.category}</p>
                      <p>${budget.maximum}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Budgets */}
          {/* Bills */}
          <div className="bg-white h-auto border border-white rounded-[12px] p-8 flex flex-col gap-6">
            <div className="flex justify-between">
              <p className="text-2">Recurring Bills</p>
              <button onClick={() => navigate("/bills")}>See Details</button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="bg-[#F8F4F0] w-full h-[60px] border border-[#F8F4F0] rounded-[8px] p-4 flex justify-between ">
                <p>Paid Bills</p>
                <p>$190.00</p>
              </div>
              <div className="bg-[#F8F4F0] w-full h-[60px] border border-[#F8F4F0] rounded-[8px] p-4 flex justify-between ">
                <p>Paid Bills</p>
                <p>$190.00</p>
              </div>
              <div className="bg-[#F8F4F0] w-full h-[60px] border border-[#F8F4F0] rounded-[8px] p-4 flex justify-between ">
                <p>Paid Bills</p>
                <p>$190.00</p>
              </div>
            </div>
          </div>

          {/* Bills */}
        </div>
      </div>
    </div>
  );
}

export default Overview;
