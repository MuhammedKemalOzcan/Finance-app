import React, { useState } from "react";
import data from "../data.json";
import TransactionInput from "../Components/TransactionInput";
import TransactionTable from "../Components/TransactionTable";
import TransactionPagination from "../Components/TransactionPagination";

function Transaction() {
  const [selectedSort, setSelectedSort] = useState("Latest");
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

  const pageSize = 10;

  //Kaçıncı veriden başlayacağını seçelim:slice(start,end)
  // let paginatedData = data.transactions.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize
  // );
  //Category'e göre filtreleme işlemi:
  // const filteredData = data.transactions.filter((item) => {
  //   if (selectedCategory === "All Transaction") {
  //     return true;
  //   }
  //   return item.category === selectedCategory;
  // });

  // const displayData =
  //   selectedCategory === "All Transaction" ? paginatedData : filteredData;

  let sortedData = [...data.transactions].sort((a, b) => {
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
  console.log("sorrtedData sıralanması:", sortedData);
  sortedData = data.transactions.filter((item) => {
    if (selectedCategory === "All Transaction") {
      return true;
    }
    return item.category === selectedCategory;
  });

  const pages: number = Math.ceil(sortedData.length / pageSize);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  console.log("pages", pages);

  console.log("sorrtedData filtreleme:", sortedData);

  sortedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  console.log("SortedData pagination:", sortedData);

  return (
    <div className="w-screen h-screen px-10 py-8 bg-[#F8F4F0] flex flex-col gap-8">
      <p className="text-1">Transaction</p>
      <div className="w-full h-full bg-white border border-white rounded-[12px] flex flex-col p-8 gap-8 ">
        <TransactionInput
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

        <TransactionTable sortedData={sortedData} />
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
