import { useEffect, useRef, useState } from "react";
import data from "../data.json";
import AddPot from "../Components/Transaction/Pots/AddPot";
import Percentage from "../Components/Transaction/Pots/Percentage";
import AddMoney from "../Components/Transaction/Pots/AddMoney";
import WithdrawMoney from "../Components/Transaction/Pots/WithdrawMoney";
import PotsOption from "../Components/Transaction/Pots/PotsOption";

interface Pots {
  name: string;
  target: number;
  total: number;
  theme: string;
}

function Pots() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isAddingPot, setIsAddingPot] = useState(false);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [optionsIndex, setOptionsIndex] = useState<null | number>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState<number>(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState<number>(0);
  const [potsData, setPotsData] = useState<Pots[]>(() => data.pots as Pots[]);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);
  const [potName, setPotName] = useState("");
  const [potTheme, setPotTheme] = useState("");
  const [potTarget, setPotTarget] = useState<number>(0);

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
  }, [isModalOpen, activeIndex]);

  return (
    <div className="w-screen h-auto px-10 py-8 bg-[#F8F4F0] flex flex-col gap-8">
      <div className="flex justify-between pr-6">
        <p className="text-1">Pots</p>
        <AddPot
          isAddingPot={isAddingPot}
          setIsAddingPot={setIsAddingPot}
          potName={potName}
          setPotName={setPotName}
          potTarget={potTarget}
          setPotTarget={setPotTarget}
          potTheme={potTheme}
          setPotTheme={setPotTheme}
          potsData={potsData}
          setPotsData={setPotsData}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {potsData.map((item, index) => (
          <div
            ref={divRef}
            key={index}
            className="bg-white h-[300px] w-[95%] border border-white rounded-[12px] gap-6 p-6 flex flex-col"
          >
            {/* Kart Divi */}
            <div className="flex justify-between relative">
              <div className="flex items-center gap-4">
                <div
                  className={`bg-[${item.theme}] size-4 rounded-full  `}
                ></div>
                <p className="text-2">{item.name}</p>
              </div>

              {/* option divi */}
              <div className="flex">
                <PotsOption
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                  optionsIndex={optionsIndex}
                  setOptionsIndex={setOptionsIndex}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  potName={potName}
                  setPotName={setPotName}
                  potTarget={potTarget}
                  setPotTarget={setPotTarget}
                  index={index}
                  name={item.name}
                  target={item.target}
                  potsData={potsData}
                  setPotsData={setPotsData}
                />
              </div>
              {/* option divi */}
            </div>
            {/* Kart Divi */}

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
              <AddMoney
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                amountToAdd={amountToAdd}
                potsData={potsData}
                setPotsData={setPotsData}
                index={index}
                name={item.name}
                setAmountToAdd={setAmountToAdd}
                total={item.total}
                target={item.target}
                theme={item.theme}
                width={width}
              />
              <WithdrawMoney
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                isModalOpen={isModalOpen}
                isWithdraw={isWithdraw}
                setIsWithdraw={setIsWithdraw}
                potsData={potsData}
                setPotsData={setPotsData}
                amountToWithdraw={amountToWithdraw}
                index={index}
                name={item.name}
                total={item.total}
                target={item.target}
                theme={item.theme}
                width={width}
                setAmountToWithdraw={setAmountToWithdraw}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pots;
