import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface TransactionInputProps {
  isSortOpen: boolean;
  setIsSortOpen: (value: boolean) => void;
  isCategoryOpen: boolean;
  setIsCategoryOpen: (value: boolean) => void;
  setSelectedSort: (value: string) => void;
  selectedSort: string;
  setSelectedCategory: (value: string) => void;
  selectedCategory: string;
  sort: string[];
  category: string[];
  input: string;
  setInput: (value: string) => void;
}

const TransactionInput: React.FC<TransactionInputProps> = ({
  isSortOpen,
  setIsSortOpen,
  isCategoryOpen,
  setIsCategoryOpen,
  selectedSort,
  setSelectedSort,
  setSelectedCategory,
  selectedCategory,
  sort,
  category,
  input,
  setInput,
}) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSort = (selectedSort: string) => {
    setSelectedSort(selectedSort);
    setIsSortOpen(false);
  };
  const handleCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory);
    setIsCategoryOpen(false);
    navigate(`/transaction?category=${selectedCategory}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCategoryOpen(false);
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="flex justify-between ">
      <input
        type="text"
        className="border flex gap-4 px-4 py-3 rounded-[8px] mr-[42%]"
        placeholder="Search transaction"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex items-center gap-2 relative  whitespace-nowrap">
        <p>Sort By</p>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="border px-4 py-2  rounded-[8px] whitespace-nowrap"
        >
          {selectedSort}
        </button>
        <div className="absolute bg-white z-30 top-12 -right-1 border rounded-[8px]">
          {isSortOpen &&
            sort.map((s, index) => (
              <div key={index} className="border-b flex justify-center">
                <button
                  className="px-4 w-full py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSort(s)}
                >
                  {s}
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="flex relative items-center gap-2">
        <p>Category</p>
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className=" mr-10 border px-4 py-2 rounded-[8px] whitespace-nowrap"
        >
          {selectedCategory}
        </button>
        <div className="absolute bg-white z-30 top-[92%] left-[72px] border rounded-[8px]">
          {isCategoryOpen &&
            category.map((c, index) => (
              <div
                key={index}
                className="border-b flex justify-center whitespace-nowarp"
              >
                <button
                  className="px-4 w-full py-2 hover:bg-gray-100 cursor-pointer flex justify-center items-center"
                  onClick={() => handleCategory(c)}
                >
                  {c}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionInput;
