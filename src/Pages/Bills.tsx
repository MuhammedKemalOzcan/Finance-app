import React, { useEffect, useState } from "react";
import "../App.css";
import data from "../data.json";

function Bills() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [input, setInput] = useState("");
  const sort = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
  const today = new Date();
  const thirtyDaysAgo = new Date();
  const fiveDaysRemain = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  fiveDaysRemain.setDate(today.getDate() + 5);

  console.log(fiveDaysRemain.getDate());

  const handleSort = () => {
    setIsSortOpen(true);
  };
  const selectSort = (s: string) => {
    setSelectedSort(s);
    setIsSortOpen(false);
  };

  const sortedData = [...data.transactions].sort((a, b) => {
    switch (selectedSort) {
      case "Latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "Oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "A to Z":
        return a.name.localeCompare(b.name);
      case "Z to A":
        return b.name.localeCompare(a.name);
      case "Highest":
        return b.amount - a.amount;
      case "Lowest":
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  const filteredData = sortedData.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );

  const totalBills = data.transactions.reduce((acc, item) => {
    const itemDate = new Date(item.date);
    if (item.recurring === true && itemDate >= thirtyDaysAgo) {
      return acc - item.amount;
    }
    return acc;
  }, 0);

  const paidBills = data.transactions.reduce((acc, item) => {
    const itemDate = new Date(item.date);
    if (item.recurring === true && itemDate <= today) {
      return acc - item.amount;
    }
    return acc;
  }, 0);

  const upcomingBills = data.transactions.reduce((acc, item) => {
    const itemDate = new Date(item.date);
    if (item.recurring === true && itemDate >= today) {
      return acc - item.amount;
    }
    return acc;
  }, 0);

  const dueSoon = data.transactions.reduce((acc, item) => {
    const itemDate = new Date(item.date);
    if (
      item.recurring === true &&
      itemDate >= today &&
      itemDate <= fiveDaysRemain
    ) {
      return acc - item.amount;
    }
    return acc;
  }, 0);

  console.log(dueSoon);

  const billsData = input.length > 0 ? filteredData : sortedData;

  return (
    <div className="w-full flex flex-col h-screen bg-[#F8F4F0] px-10 py-8 gap-8 ">
      <p className="text-1">Recurring Bills</p>
      <div className="w-full flex gap-6">
        <div className="w-[30%] flex flex-col gap-6 ">
          {/* TOPLAM FATURA BAŞLANGIÇ */}
          <div className="bg-black w-full h-auto text-white p-6 rounded-[12px] flex flex-col gap-4 ">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.4375 16.25C28.4375 16.4986 28.3387 16.7371 28.1629 16.9129C27.9871 17.0887 27.7486 17.1875 27.5 17.1875H12.5C12.2514 17.1875 12.0129 17.0887 11.8371 16.9129C11.6613 16.7371 11.5625 16.4986 11.5625 16.25C11.5625 16.0014 11.6613 15.7629 11.8371 15.5871C12.0129 15.4113 12.2514 15.3125 12.5 15.3125H27.5C27.7486 15.3125 27.9871 15.4113 28.1629 15.5871C28.3387 15.7629 28.4375 16.0014 28.4375 16.25ZM27.5 20.3125H12.5C12.2514 20.3125 12.0129 20.4113 11.8371 20.5871C11.6613 20.7629 11.5625 21.0014 11.5625 21.25C11.5625 21.4986 11.6613 21.7371 11.8371 21.9129C12.0129 22.0887 12.2514 22.1875 12.5 22.1875H27.5C27.7486 22.1875 27.9871 22.0887 28.1629 21.9129C28.3387 21.7371 28.4375 21.4986 28.4375 21.25C28.4375 21.0014 28.3387 20.7629 28.1629 20.5871C27.9871 20.4113 27.7486 20.3125 27.5 20.3125ZM35.9375 8.75V32.5C35.9373 32.6598 35.8963 32.8168 35.8184 32.9563C35.7404 33.0958 35.6282 33.213 35.4922 33.2969C35.3446 33.389 35.174 33.4378 35 33.4375C34.8547 33.4376 34.7113 33.4039 34.5813 33.3391L30 31.0484L25.4187 33.3391C25.2887 33.404 25.1453 33.4378 25 33.4378C24.8547 33.4378 24.7113 33.404 24.5813 33.3391L20 31.0484L15.4187 33.3391C15.2887 33.404 15.1453 33.4378 15 33.4378C14.8547 33.4378 14.7113 33.404 14.5813 33.3391L10 31.0484L5.41875 33.3391C5.2758 33.4104 5.11697 33.4441 4.95736 33.4368C4.79775 33.4295 4.64264 33.3816 4.50676 33.2975C4.37089 33.2135 4.25875 33.0961 4.18099 32.9565C4.10324 32.8169 4.06245 32.6598 4.0625 32.5V8.75C4.0625 8.16984 4.29297 7.61344 4.7032 7.2032C5.11344 6.79297 5.66984 6.5625 6.25 6.5625H33.75C34.3302 6.5625 34.8866 6.79297 35.2968 7.2032C35.707 7.61344 35.9375 8.16984 35.9375 8.75ZM34.0625 8.75C34.0625 8.66712 34.0296 8.58763 33.971 8.52903C33.9124 8.47042 33.8329 8.4375 33.75 8.4375H6.25C6.16712 8.4375 6.08763 8.47042 6.02903 8.52903C5.97042 8.58763 5.9375 8.66712 5.9375 8.75V30.9828L9.58125 29.1609C9.71129 29.096 9.85465 29.0622 10 29.0622C10.1453 29.0622 10.2887 29.096 10.4187 29.1609L15 31.4516L19.5813 29.1609C19.7113 29.096 19.8547 29.0622 20 29.0622C20.1453 29.0622 20.2887 29.096 20.4187 29.1609L25 31.4516L29.5813 29.1609C29.7113 29.096 29.8547 29.0622 30 29.0622C30.1453 29.0622 30.2887 29.096 30.4187 29.1609L34.0625 30.9828V8.75Z"
                fill="white"
              />
            </svg>

            <p className="text-4">Total Bills</p>
            <p className="text-1">${totalBills}</p>
          </div>
          {/* TOPLAM FATURA sON */}

          {/* ÖZET BAŞLANGIÇ */}
          <div className="bg-white w-full h-auto p-5 rounded-[12px] flex flex-col gap-4 ">
            <p className="text-1">Summary</p>
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between">
                <p className="text-5">Paid Bills</p>
                <p className="text-5-bold">${paidBills}</p>
              </div>
              <div className="border-b"></div>
              <div className="flex justify-between">
                <p className="text-5">Total Upcoming</p>
                <p className="text-5-bold">${upcomingBills}</p>
              </div>
              <div className="border-b"></div>
              <div className="flex justify-between">
                <p className="text-5 text-red-500">Due Soon</p>
                <p className="text-5-bold text-red-500">${dueSoon}</p>
              </div>
            </div>
          </div>
          {/* ÖZET SON */}
        </div>
        <div className="bg-white w-full p-8 flex flex-col gap-6 rounded-[12px] ">
          <div className="flex justify-between">
            <input
              type="text"
              className="border flex gap-4 px-4 py-3 rounded-[8px] mr-[42%]"
              placeholder="Search Bills"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex items-center gap-2 relative  whitespace-nowrap">
              <p>Sort By</p>
              <button
                onClick={handleSort}
                className="flex justify-center items-center gap-2 border px-4 py-2 rounded-[8px] whitespace-nowrap"
              >
                {selectedSort}
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3541 0.85375L6.35414 5.85375C6.30771 5.90024 6.25256 5.93712 6.19186 5.96228C6.13117 5.98744 6.0661 6.00039 6.00039 6.00039C5.93469 6.00039 5.86962 5.98744 5.80892 5.96228C5.74822 5.93712 5.69308 5.90024 5.64664 5.85375L0.646644 0.85375C0.576638 0.783823 0.528954 0.694696 0.509629 0.597654C0.490304 0.500611 0.500206 0.400016 0.538082 0.308605C0.575959 0.217193 0.640106 0.139075 0.722403 0.08414C0.8047 0.0292046 0.901446 -7.77138e-05 1.00039 1.549e-07L11.0004 1.549e-07C11.0993 -7.77138e-05 11.1961 0.0292046 11.2784 0.08414C11.3607 0.139075 11.4248 0.217193 11.4627 0.308605C11.5006 0.400016 11.5105 0.500611 11.4912 0.597654C11.4718 0.694696 11.4241 0.783823 11.3541 0.85375Z"
                    fill="#201F24"
                  />
                </svg>
              </button>
              <div className="absolute bg-white z-30 top-12  right-4 border rounded-[8px]">
                {isSortOpen &&
                  sort.map((s, index) => (
                    <div key={index} className="p-2 flex flex-col ">
                      <button
                        onClick={() => selectSort(s)}
                        className="border-b"
                      >
                        {s}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* BILLS TABLE */}
          <table className="w-full table-auto text-left">
            <thead className="text-gray-600 text-sm uppercase border-b ">
              <tr>
                <th className="px-4 py-2 text-5">Bill Title</th>
                <th className="px-4 py-2 text-5">Due Date</th>
                <th className="px-4 py-2 text-5">Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {billsData
                .filter((item) => {
                  const itemDate = new Date(item.date);
                  return item.recurring === true && itemDate >= thirtyDaysAgo;
                })
                .map((item, index) => {
                  const itemDate = new Date(item.date);
                  const isPast = itemDate <= today;
                  const dueSoon =
                    itemDate >= today && itemDate <= fiveDaysRemain;

                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 flex items-center gap-2">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-4-bold">{item.name}</span>
                      </td>
                      <td
                        className={`${isPast ? "text-green-500" : ""} ${
                          dueSoon ? "text-red-500" : ""
                        } "px-4 py-3 text-5"`}
                      >
                        {"Monthly-" +
                          new Date(item.date).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        <span className="text-4-bold">
                          ${Math.abs(item.amount)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* BILLS TABLE */}
        </div>
      </div>
    </div>
  );
}

export default Bills;
