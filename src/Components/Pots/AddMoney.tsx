import React from "react";

interface Pots {
  name: string;
  target: number;
  total: number;
  theme: string;
}

interface Props {
  activeIndex: number | null;
  setActiveIndex: (value: number | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  amountToAdd: number;
  setAmountToAdd: (value: number) => void;
  potsData: Pots[];
  setPotsData: (value: Pots[]) => void;
  index: number;
  name: string;
  total: number;
  target: number;
  theme: string;
  width: number;
}

const AddMoney: React.FC<Props> = ({
  activeIndex,
  setActiveIndex,
  isModalOpen,
  setIsModalOpen,
  amountToAdd,
  potsData,
  setPotsData,
  index,
  name,
  setAmountToAdd,
  total,
  target,
  theme,
  width,
}) => {
  //Add Money modali aç
  const openAddModal = (index: number) => {
    if (activeIndex === index && isModalOpen) {
      // Aynı index'e tekrar tıklanırsa kapat
      setIsModalOpen(false);
      setActiveIndex(null);
    } else {
      // Farklı bir karta tıklanırsa modalı göster
      setActiveIndex(index);
      setIsModalOpen(true);
    }
  };

  //Add Money Kapat
  const handleClose = () => {
    setIsModalOpen(false);
  };

  //Para ekleme
  const handleConfirm = (index: number) => {
    if (activeIndex === index && amountToAdd !== null) {
      const newPots = [...potsData];
      newPots[index] = {
        ...newPots[index],
        total: newPots[index].total + amountToAdd,
      };
      setPotsData(newPots);
      setAmountToAdd(0);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="w-[50%] flex gap-4">
      <button
        onClick={() => openAddModal(index)}
        className="button-white text-4-bold w-full relative"
      >
        <p>+ Add Money</p>
      </button>

      {isModalOpen && activeIndex === index && (
        <div className="modal-overlay">
          <div className="modal flex flex-col gap-5 bg-[#F8F4F0] w-[33%] z-30 h-auto p-8 border border-white rounded-[12px] ">
            <div className="flex justify-between">
              <p className="text-1">Add to `{name}`</p>
              <button onClick={handleClose}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
            <p className="text-4">
              `
              {
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet."
              }
              `
            </p>
            <div className="flex justify-between items-center">
              <p className="text-4 text-gray-500">New Amount</p>
              <p className="text-1">${total + amountToAdd}</p>
            </div>
            <div className="w-full flex bg-white border border-[#F8F4F0] h-2 bg-[#F8F4F0] rounded-[4px] gap-0.5">
              <div
                style={{
                  backgroundColor: theme,
                  width: (total / target) * width,
                }}
                className="h-2 rounded-l-[4px]"
              ></div>
              <div
                style={{
                  backgroundColor: "black",
                  width: (amountToAdd / target) * width,
                }}
                className="h-2 rounded-r-[4px]"
              ></div>
            </div>
            <div className="flex justify-between items-center text-[#696868] ">
              <p>
                {(
                  (total / target) * 100 +
                  (amountToAdd / target) * 100
                ).toFixed(2)}
                %
              </p>
              <p>Target of {target}</p>
            </div>
            <div>
              <p>Amount To Add</p>
              <input
                placeholder="$"
                type="number"
                className="w-full px-5 py-3 border border-gray-400 rounded-[12px]"
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(Number(e.target.value))}
              />
            </div>
            <button
              onClick={() => handleConfirm(index)}
              className="button-black w-full"
            >
              Confirm Addition
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMoney;
