import React, { useEffect, useRef, useState } from "react";
import data from "../data.json";
import AddPot from "../Components/Transaction/Pots/AddPot";
import Percentage from "../Components/Transaction/Pots/Percentage";
import AddMoney from "../Components/Transaction/Pots/AddMoney";

function Pots() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [optionsIndex, setOptionsIndex] = useState<null | number>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState<number>(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState<number>(0);
  const [potsData, setPotsData] = useState(data.pots);

  //Divin width'ini alma
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
  }, [isAdding, activeIndex]);

  //Withdraw modali aç
  const openWithdraw = (index: number) => {
    if (activeIndex === index && isAdding) {
      // Aynı index'e tekrar tıklanırsa kapat
      setIsWithdraw(false);
      setActiveIndex(null);
    } else {
      // Farklı bir karta tıklanırsa modalı göster
      setActiveIndex(index);
      setIsWithdraw(true);
    }
  };

  //Add Money modali aç
  const addMoney = (index: number) => {
    if (activeIndex === index && isAdding) {
      // Aynı index'e tekrar tıklanırsa kapat
      setIsAdding(false);
      setActiveIndex(null);
    } else {
      // Farklı bir karta tıklanırsa modalı göster
      setActiveIndex(index);
      setIsAdding(true);
    }
  };

  //Add Money Kapat
  const handleClose = () => {
    setIsAdding(false);
  };

  //Withdraw Kapat
  const closeWithdraw = () => {
    setIsWithdraw(false);
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
    }

    setIsAdding(false);
  };

  //Para Çekme
  const confirmWithdraw = (index: number) => {
    if (activeIndex === index && amountToAdd !== null) {
      const newPots = [...potsData];
      newPots[index] = {
        ...newPots[index],
        total: newPots[index].total - amountToWithdraw,
      };
      setPotsData(newPots);
    }

    setIsWithdraw(false);
  };

  const handleEdit = (index: number) => {
    if (optionsIndex === index) {
      setIsEditing(true);
      setOptionsIndex(index);
    } else {
      setIsEditing(false);
      setOptionsIndex(null);
    }
  };

  console.log("isEditing", isEditing);
  console.log("ootion index", optionsIndex);
  const handleDelete = (index: number) => {};

  //Ayarları açma
  const handlePots = (index: number) => {
    if (optionsIndex === index) {
      setOptionsIndex(null); // Aynı karta tekrar tıklanırsa kapat
    } else {
      setOptionsIndex(index); // Yeni karta tıklanırsa o kartın menüsünü göster
    }
  };

  return (
    <div className="w-screen h-full px-10 py-8 bg-[#F8F4F0] flex flex-col gap-8">
      <AddPot />
      <div className="grid grid-cols-2 gap-4">
        {potsData.map((item, index) => (
          <div
            ref={divRef}
            key={index}
            className="bg-white h-[300px] w-[95%] border border-white rounded-[12px] gap-6 p-6 flex flex-col"
          >
            <div className="flex justify-between relative">
              <div className="flex items-center gap-4">
                <div
                  className={`bg-[${item.theme}] size-4 rounded-full  `}
                ></div>
                <p className="text-2">{item.name}</p>
              </div>
              <div className="flex">
                <button
                  onClick={() => handlePots(index)}
                  className="relative h-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
                {optionsIndex === index && (
                  <div className="absolute flex flex-col top-6 px-4 py-3 border rounded-[8px] gap-3 z-30 bg-white w-full whitespace-nowrap w-[100px]">
                    <button onClick={() => handleEdit(index)}>Edit Pot</button>

                    <div className="border-b"></div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500"
                    >
                      Delete Pot
                    </button>
                  </div>
                )}
                {isEditing === true && (
                  <div className="w-[200px] h-[200px] bg-black absolute ">
                    a
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-4 text-[#696868]">Total Saved</p>
              <p className="text-1">${item.total}</p>
            </div>
            <Percentage
              total={item.total}
              target={item.target}
              theme={item.theme}
              width={width}
            />
            <div className="flex gap-4">
              <button
                onClick={() => addMoney(index)}
                className="button-white text-4-bold w-[50%] relative"
              >
                <p>+ Add Money</p>
              </button>
              {/* Add Money Modal başlangıç */}
              {isAdding && activeIndex === index && (
                <div className="absolute flex flex-col gap-5 bg-[#F8F4F0] w-[33%] z-30 h-[460px] p-8 border border-white rounded-[12px] ">
                  <div className="flex justify-between">
                    <p className="text-1">Add to `{item.name}`</p>
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
                    <p className="text-1">${item.total + amountToAdd}</p>
                  </div>
                  <div className="w-full flex bg-white border border-[#F8F4F0] h-2 bg-[#F8F4F0] rounded-[4px] gap-0.5">
                    <div
                      style={{
                        backgroundColor: item.theme,
                        width: (item.total / item.target) * width,
                      }}
                      className="h-2 rounded-l-[4px]"
                    ></div>
                    <div
                      style={{
                        backgroundColor: "black",
                        width: (amountToAdd / item.target) * width,
                      }}
                      className="h-2 rounded-r-[4px]"
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[#696868] ">
                    <p>
                      {(
                        (item.total / item.target) * 100 +
                        (amountToAdd / item.target) * 100
                      ).toFixed(2)}
                      %
                    </p>
                    <p>Target of {item.target}</p>
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
              )}
              {/* Add Money Modal bitiş */}

              <button
                onClick={() => openWithdraw(index)}
                className="button-white text-4-bold w-[50%]"
              >
                <p>Withdraw</p>
              </button>
              {/* Withdraw Money Modal başlangıç */}

              {isWithdraw && activeIndex === index && (
                <div className="absolute flex flex-col gap-5 bg-[#F8F4F0] w-[33%] z-30 h-[460px] p-8 border border-white rounded-[12px] ">
                  <div className="flex justify-between">
                    <p className="text-1">Withdraw from `{item.name}`</p>
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
                    <p className="text-1">${item.total - amountToWithdraw}</p>
                  </div>
                  <div className="w-full flex bg-white border border-[#F8F4F0] h-2 bg-[#F8F4F0] rounded-[4px] gap-0.5">
                    <div
                      style={{
                        backgroundColor: item.theme,
                        // width: (item.total / item.target) * width,
                        width:
                          (item.total / item.target) * width -
                          (amountToWithdraw / item.target) * width,
                      }}
                      className="h-2 rounded-l-[4px]"
                    ></div>
                    <div
                      style={{
                        backgroundColor: "red",
                        width: (amountToWithdraw / item.target) * width,
                      }}
                      className="h-2 rounded-r-[4px]"
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[#696868] ">
                    <p>
                      {(
                        (item.total / item.target) * 100 -
                        (amountToWithdraw / item.target) * 100
                      ).toFixed(2)}
                      %
                    </p>
                    <p>Target of {item.target}</p>
                  </div>
                  <div>
                    <p>Amount To Withdraw</p>
                    <input
                      placeholder="$"
                      type="number"
                      className="w-full px-5 py-3 border border-gray-400 rounded-[12px]"
                      value={amountToWithdraw}
                      onChange={(e) =>
                        setAmountToWithdraw(Number(e.target.value))
                      }
                    />
                  </div>
                  <button
                    onClick={() => confirmWithdraw(index)}
                    className="button-black w-full"
                  >
                    Confirm Withdraw
                  </button>
                </div>
              )}
              {/* Withdraw Money Modal başlangıç */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pots;
