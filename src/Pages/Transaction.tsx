import { useEffect, useState } from "react";
import data from "../data.json";
import TransactionInput from "../Components/Transaction/TransactionInput";
import TransactionTable from "../Components/Transaction/TransactionTable";
import TransactionPagination from "../Components/Transaction/TransactionPagination";
import { useLocation } from "react-router-dom";

function Transaction() {
  const [selectedSort, setSelectedSort] = useState("Latest");
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Transaction");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sort = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"];
  const category = [
    "All Transaction",
    "General",
    "Entertainment",
    "Lifestyle",
    "Personal Care",
    "Education",
    "Shopping",
    "Bills",
    "Groceries",
    "Dining Out",
    "Transportation",
  ];

  const query = new URLSearchParams(useLocation().search);
  const categoryParams = query.get("category");


  useEffect(() => {
    if (categoryParams) {
      setSelectedCategory(categoryParams);
    }
    setCurrentPage(1);
  }, [categoryParams]);

  const pageSize = 10;

  let filteredCategory = data.transactions.filter((item) => {
    if (selectedCategory === "All Transaction") {
      return true;
    }
    return item.category === selectedCategory;
  });

  let sortedData = [...filteredCategory].sort((a, b) => {
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

  const pages: number = Math.ceil(filteredData.length / pageSize);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  sortedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full h-screen px-10 py-8 bg-[#F8F4F0] flex flex-col gap-8 ">
      <p className="text-1">Transaction</p>
      <div className="w-full h-full bg-white border border-white rounded-[12px] flex flex-col p-8 gap-8 box-border ">
        <TransactionInput
          input={input}
          setInput={setInput}
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          isCategoryOpen={isCategoryOpen}
          setIsCategoryOpen={setIsCategoryOpen}
          setSelectedSort={setSelectedSort}
          selectedSort={selectedSort}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          sort={sort}
          category={category}
        />

        <TransactionTable
          sortedData={sortedData}
          filteredData={filteredData}
          input={input}
        />
        <TransactionPagination
          setCurrentPage={setCurrentPage}
          pageNumbers={pageNumbers}
          currentPage={currentPage}
          pages={pages}
        />
      </div>
    </div>
  );
}

export default Transaction;
