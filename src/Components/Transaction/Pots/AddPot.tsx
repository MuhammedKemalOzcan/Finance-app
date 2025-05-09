import React from "react";

interface Pots {
  name: string;
  target: number;
  total: number;
  theme: string;
}

interface Props {
  isAddingPot: boolean;
  setIsAddingPot: (value: boolean) => void;
  potName: string;
  setPotName: (value: string) => void;
  potTarget: number;
  setPotTarget: (value: number) => void;
  potTheme: string;
  setPotTheme: (value: string) => void;
  potsData: Pots[];
  setPotsData: React.Dispatch<React.SetStateAction<Pots[]>>;
}

const AddPot: React.FC<Props> = ({
  isAddingPot,
  setIsAddingPot,
  potName,
  setPotName,
  potTarget,
  setPotTarget,
  potTheme,
  setPotTheme,
  potsData,
  setPotsData,
}) => {
  const handleClose = () => {
    setIsAddingPot(false);
  };
  const handleAdd = () => {
    const newPot: Pots = {
      name: potName,
      target: potTarget,
      total: 0,
      theme: "#626070",
    };

    setPotsData((prev: Pots[]) => [...prev, newPot]);
    setIsAddingPot(false);
    setPotName("");
    setPotTarget(0);
  };
  return (
    <div>
      <button onClick={() => setIsAddingPot(true)} className="button-black">
        +Add New Pot
      </button>
      {isAddingPot && (
        <div className="modal-overlay">
          <div className="modal h-auto bg-white absolute flex flex-col p-8 gap-5 border border-white rounded-[12px] ">
            <div className="flex justify-between items-center">
              <p className="text-1">Edit</p>
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
            <p>If your saving targets change, feel free to update your pots.</p>
            <div>
              <p>Pot Name</p>
              <input
                className="w-full border px-5 py-4 rounded-[8px]"
                type="text"
                value={potName}
                onChange={(e) => setPotName(e.target.value)}
              />
            </div>
            <div>
              <p>Target</p>
              <input
                className="w-full border px-5 py-4 rounded-[8px]"
                type="number"
                value={potTarget}
                onChange={(e) => setPotTarget(Number(e.target.value))}
              />
            </div>
            <div>
              <p>Theme</p>
              <input
                className="w-full border px-5 py-4 rounded-[8px]"
                type="number"
                value={potTheme}
                onChange={(e) => setPotTheme(e.target.value)}
              />
            </div>
            <button onClick={handleAdd} className="button-black">
              Add Pot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPot;
