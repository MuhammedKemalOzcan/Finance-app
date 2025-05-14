import React from "react";

interface Budget {
  category: string;
  maximum: number;
  theme: string;
}

interface Props {
  isOptionsOpen: boolean;
  setIsOptionsOpen: (value: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
  optionIndex: number;
  setOptionIndex: (value: number) => void;
  setIsEditing: (value: boolean) => void;
  isEditing: boolean;
  setEditingIndex: (value: number) => void;
  index: number;
  setCategory: (value: string) => void;
  budget: Budget[];
  spent: number | undefined;
  setSpentAmount: (value: number) => void;
  category: string;
}

const BudgetOptions: React.FC<Props> = ({
  isOptionsOpen,
  category,
  optionIndex,
  index,
  budget,
  spent,
  setIsDeleting,
  isDeleting,
  setOptionIndex,
  setIsEditing,
  isEditing,
  setIsOptionsOpen,
  setEditingIndex,
  setCategory,
  setSpentAmount,
}) => {
  const openDeleteModal = (index: number) => {
    setIsDeleting(!isDeleting);
    setOptionIndex(index);
  };
  const openEditModal = (index: number, category: string) => {
    setIsEditing(!isEditing);
    setIsOptionsOpen(false);
    setEditingIndex(index);
    setCategory(category);
  };

  return (
    <div className="relative">
      {isOptionsOpen && optionIndex === index && (
        <div className="absolute right-0 flex flex-col bg-black text-white p-2 rounded-[12px] gap-2 w-auto z-30">
          <button onClick={() => openEditModal(index, category)}>
            Edit Budget
          </button>
          <span className="border-b"></span>
          <button onClick={() => openDeleteModal(index)}>Delete Budget</button>
        </div>
      )}
    </div>
  );
};

export default React.memo(BudgetOptions);
