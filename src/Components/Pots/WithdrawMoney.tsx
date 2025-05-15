import React, { useState } from "react";

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
  isWithdraw: boolean;
  setIsWithdraw: (value: boolean) => void;
  potsData: Pots[];
  setPotsData: (value: Pots[]) => void;
  amountToWithdraw: number;
  setAmountToWithdraw: (value: number) => void;
  index: number;
  name: string;
  total: number;
  target: number;
  theme: string;
  width: number;
}

const WithdrawMoney: React.FC<Props> = ({
  activeIndex,
  isModalOpen,
  isWithdraw,
  setIsWithdraw,
  setActiveIndex,
  potsData,
  setPotsData,
  amountToWithdraw,
  setAmountToWithdraw,
  index,
  name,
  total,
  target,
  theme,
  width,
}) => {
  const [error, setError] = useState(false);

  const openWithdraw = (index: number) => {
    if (activeIndex === index && isModalOpen) {
      // Aynı index'e tekrar tıklanırsa kapat
      setIsWithdraw(false);
      setActiveIndex(null);
    } else {
      // Farklı bir karta tıklanırsa modalı göster
      setActiveIndex(index);
      setIsWithdraw(true);
    }
  };

  //Withdraw Kapat
  const closeWithdraw = () => {
    setIsWithdraw(false);
  };

  //Para Çekme
  const confirmWithdraw = (index: number, total: number) => {
    if (
      activeIndex === index &&
      amountToWithdraw !== null &&
      amountToWithdraw <= total
    ) {
      const newPots = [...potsData];
      newPots[index] = {
        ...newPots[index],
        total: newPots[index].total - amountToWithdraw,
      };
      setPotsData(newPots);
    } else {
      setError(true);
      return
    }
    setIsWithdraw(false);
    setAmountToWithdraw(0);
  };

  return (
    <div className="w-[50%]">
      <button
        onClick={() => openWithdraw(index)}
        className="button-white text-4-bold w-full"
      >
        <p>Withdraw</p>
      </button>
      {/* Withdraw Money Modal başlangıç */}

      {isWithdraw && activeIndex === index && (
        <div className="modal-overlay">
          <div className="modal flex flex-col gap-5 bg-[#F8F4F0] w-[33%] z-30 h-[auto] p-8 border border-white rounded-[12px] ">
            <div className="flex justify-between">
              <p className="text-1">Withdraw from `{name}`</p>
              <button onClick={closeWithdraw}>
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
              <p className="text-1">${total - amountToWithdraw}</p>
            </div>
            <div className="w-full flex bg-white border border-[#F8F4F0] h-2 bg-[#F8F4F0] rounded-[4px] gap-0.5">
              <div
                style={{
                  backgroundColor: theme,
                  // width: (item.total / item.target) * width,
                  width:
                    (total / target) * width -
                    (amountToWithdraw / target) * width,
                }}
                className="h-2 rounded-l-[4px]"
              ></div>
              <div
                style={{
                  backgroundColor: "red",
                  width: (amountToWithdraw / target) * width,
                }}
                className="h-2 rounded-r-[4px]"
              ></div>
            </div>
            <div className="flex justify-between items-center text-[#696868] ">
              <p>
                {(
                  (total / target) * 100 -
                  (amountToWithdraw / target) * 100
                ).toFixed(2)}
                %
              </p>
              <p>Target of {target}</p>
            </div>
            <div>
              <p>Amount To Withdraw</p>
              <input
                placeholder="$"
                type="number"
                className="w-full px-5 py-3 border border-gray-400 rounded-[12px]"
                value={amountToWithdraw}
                onChange={(e) => setAmountToWithdraw(Number(e.target.value))}
              />
            </div>
            {error === true && <p className="text-red-500">*Hesabınızda olandan fazla para çekemezsiniz</p>}
            <button
              onClick={() => confirmWithdraw(index, total)}
              className="button-black w-full"
            >
              Confirm Withdraw
            </button>
          </div>
        </div>
      )}
      {/* Withdraw Money Modal başlangıç */}
    </div>
  );
};

export default WithdrawMoney;
