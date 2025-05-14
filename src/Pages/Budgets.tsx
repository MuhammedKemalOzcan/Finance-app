import React, { useEffect, useRef, useState } from "react";
import data from "../data.json";
import Summary from "../Components/Budgets/Summary";
import BudgetOptions from "../Components/Budgets/BudgetOptions";
import DeleteBudget from "../Components/Budgets/DeleteBudget";
import ProgressBar from "../Components/Budgets/ProgressBar";
import Spent from "../Components/Budgets/Spent";
import LatestSpending from "../Components/Budgets/LatestSpending";
import EditBudget from "../Components/Budgets/EditBudget";
import AddBudget from "../Components/Budgets/AddBudget";

interface Budgets {
  category: string;
  maximum: number;
  theme: string;
}

interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

function Budgets() {
  const [budget, setBudget] = useState<Budgets[]>(data.budgets);
  const [transaction, setTransaction] = useState<Transaction[]>(
    data.transactions
  );
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [optionIndex, setOptionIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#277C78");
  const [category, setCategory] = useState<string>();
  let [spentAmount, setSpentAmount] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newMax, setNewMax] = useState(0);

  useEffect(() => {
    const element = divRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        setWidth(newWidth);
      }
    });

    setWidth(element.getBoundingClientRect().width);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [budget]);

  // Kategori bazlı harcama toplamlarını hesapla
  const spentByCategory = data.transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] -= transaction.amount;
    return acc;
  }, {} as Record<string, number>); //entertainment: number alacağını belirttik

  const openDropdown = (index: number) => {
    setIsOptionsOpen(!isOptionsOpen);
    setOptionIndex(index);
  };

  return (
    <div className="h-auto w-screen bg-[#F8F4F0] p-8 flex flex-col gap-8">
      <div className="flex w-full justify-between">
        <p className="text-1">Budgets</p>
        <AddBudget
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          budget={budget}
          setBudget={setBudget}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
      <div className="flex gap-6 w-full">
        <Summary spentAmount={spentAmount} spentByCategory={spentByCategory} />
        <div className="flex flex-col w-[70%] h-auto gap-6 ">
          {budget.map((item, index) => {
            spentAmount = spentByCategory[item.category] || 0;
            console.log(item.category, spentAmount);
            return (
              <div
                key={index}
                className="flex flex-col bg-white w-full gap-2 p-8 rounded-[12px] w-auto"
              >
                <div className="relative flex items-center w-full justify-between ">
                  <div className="flex items-center gap-2">
                    <span
                      style={{ backgroundColor: item.theme }}
                      className={`size-4 rounded-full flex  `}
                    ></span>
                    <p className="text-2">{item.category}</p>
                  </div>
                  <button onClick={() => openDropdown(index)}>
                    <svg
                      width="14"
                      height="4"
                      viewBox="0 0 14 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.75 2C8.75 2.34612 8.64736 2.68446 8.45507 2.97225C8.26278 3.26003 7.98947 3.48434 7.6697 3.61679C7.34993 3.74924 6.99806 3.7839 6.65859 3.71637C6.31913 3.64885 6.00731 3.48218 5.76256 3.23744C5.51782 2.9927 5.35115 2.68087 5.28363 2.34141C5.2161 2.00194 5.25076 1.65007 5.38321 1.3303C5.51567 1.01053 5.73997 0.737221 6.02775 0.544928C6.31554 0.352636 6.65388 0.25 7 0.25C7.46413 0.25 7.90925 0.434375 8.23744 0.762563C8.56563 1.09075 8.75 1.53587 8.75 2ZM2 0.25C1.65388 0.25 1.31554 0.352636 1.02775 0.544928C0.739967 0.737221 0.515665 1.01053 0.383212 1.3303C0.250758 1.65007 0.216102 2.00194 0.283627 2.34141C0.351151 2.68087 0.517822 2.9927 0.762564 3.23744C1.00731 3.48218 1.31913 3.64885 1.65859 3.71637C1.99806 3.7839 2.34993 3.74924 2.6697 3.61679C2.98947 3.48434 3.26278 3.26003 3.45507 2.97225C3.64737 2.68446 3.75 2.34612 3.75 2C3.75 1.53587 3.56563 1.09075 3.23744 0.762563C2.90925 0.434375 2.46413 0.25 2 0.25ZM12 0.25C11.6539 0.25 11.3155 0.352636 11.0278 0.544928C10.74 0.737221 10.5157 1.01053 10.3832 1.3303C10.2508 1.65007 10.2161 2.00194 10.2836 2.34141C10.3512 2.68087 10.5178 2.9927 10.7626 3.23744C11.0073 3.48218 11.3191 3.64885 11.6586 3.71637C11.9981 3.7839 12.3499 3.74924 12.6697 3.61679C12.9895 3.48434 13.2628 3.26003 13.4551 2.97225C13.6474 2.68446 13.75 2.34612 13.75 2C13.75 1.77019 13.7047 1.54262 13.6168 1.3303C13.5288 1.11798 13.3999 0.925066 13.2374 0.762563C13.0749 0.600061 12.882 0.471156 12.6697 0.383211C12.4574 0.295265 12.2298 0.25 12 0.25Z"
                        fill="#B3B3B3"
                      />
                    </svg>
                  </button>
                </div>
                <BudgetOptions
                  isOptionsOpen={isOptionsOpen}
                  optionIndex={optionIndex}
                  index={index}
                  budget={budget}
                  category={item.category}
                  spent={spentAmount}
                  setIsDeleting={setIsDeleting}
                  isDeleting={isDeleting}
                  setOptionIndex={setOptionIndex}
                  setIsEditing={setIsEditing}
                  isEditing={isEditing}
                  setIsOptionsOpen={setIsOptionsOpen}
                  setEditingIndex={setEditingIndex}
                  setCategory={setCategory}
                  setSpentAmount={setSpentAmount}
                />
                <DeleteBudget
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  setBudget={setBudget}
                  setIsOptionsOpen={setIsOptionsOpen}
                  optionIndex={optionIndex}
                  index={index}
                  category={item.category}
                />
                <EditBudget
                  category={category}
                  setCategory={setCategory}
                  budget={budget}
                  setBudget={setBudget}
                  editingIndex={editingIndex}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  transaction={transaction}
                  setTransaction={setTransaction}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  spentAmount={spentAmount}
                  setSpentAmount={setSpentAmount}
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  newMax={newMax}
                  setNewMax={setNewMax}
                />

                <p>Maximum of ${item.maximum}</p>
                <ProgressBar
                  divRef={divRef}
                  spentAmount={spentAmount}
                  width={width}
                  theme={item.theme}
                  maximum={item.maximum}
                />
                <Spent
                  spentAmount={spentAmount}
                  theme={item.theme}
                  maximum={item.maximum}
                />
                <LatestSpending
                  transaction={transaction}
                  category={item.category}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Budgets);
