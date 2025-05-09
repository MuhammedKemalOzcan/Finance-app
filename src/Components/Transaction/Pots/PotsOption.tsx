import React, { useState } from "react";
import "../../../App.css";

interface Pots {
  name: string;
  target: number;
  total: number;
  theme: string;
}

interface Props {
  editingIndex: number | null;
  setEditingIndex: (value: number) => void;
  optionsIndex: number | null;
  setOptionsIndex: (value: number | null) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
  potName: string;
  setPotName: (value: string) => void;
  potTarget: number;
  setPotTarget: (value: number) => void;
  potsData: Pots[];
  setPotsData: React.Dispatch<React.SetStateAction<Pots[]>>;
  index: number;
  name: string;
  target: number;
}

const PotsOption: React.FC<Props> = ({
  editingIndex,
  setEditingIndex,
  optionsIndex,
  setOptionsIndex,
  isEditing,
  setIsEditing,
  setPotName,
  setPotTarget,
  index,
  name,
  target,
  potsData,
  setPotsData,
  potName,
  potTarget,
  isDeleting,
  setIsDeleting,
}) => {
  const [error, setError] = useState(false);

  //Edit modali açma
  const handleEdit = (index: number, name: string) => {
    setPotTarget(target);
    setPotName(name);
    setOptionsIndex(null);
    setIsEditing(!isEditing);
    setEditingIndex(index);
    setOptionsIndex(null);
  };

  const handleDelete = (index: number) => {
    setIsDeleting(true);
    setEditingIndex(index);
  };

  //Ayarları açma
  const handlePots = (index: number) => {
    if (optionsIndex === index) {
      setOptionsIndex(null); // Aynı karta tekrar tıklanırsa kapat
    } else {
      setOptionsIndex(index); // Yeni karta tıklanırsa o kartın menüsünü göster
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setIsDeleting(false);
  };

  const handleSave = () => {
    if (potName.length === 0 || potTarget < 1) {
      setError(true);
      return;
    }

    setPotsData((prev: Pots[]) =>
      prev.map((item, i) =>
        i === editingIndex
          ? { ...item, name: potName, target: potTarget }
          : item
      )
    );
    setIsEditing(false);
    setError(false);
    setPotName("");
    setPotTarget(0);
  };

  const confirmDelete = (index: number) => {
    setPotsData((prev: Pots[]) => prev.filter((item, i) => i !== index));
    setIsDeleting(false);
  };
  const refuseDelete = () => {
    setIsDeleting(false);
  };

  return (
    <div className="flex">
      <button onClick={() => handlePots(index)} className="relative h-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="size-6"
        >
          <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
          <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>
      {optionsIndex === index && (
        <div className="absolute  w-auto flex flex-col top-6 px-4 py-3 border rounded-[8px] gap-3 z-30 bg-white w-full whitespace-nowrap">
          <button onClick={() => handleEdit(index, name)}>Edit Pot</button>

          <div className="border-b"></div>
          <button onClick={() => handleDelete(index)} className="text-red-500">
            Delete Pot
          </button>
        </div>
      )}
      {isDeleting === true && editingIndex === index && (
        <div className="modal-overlay">
          <div className="modal w-[30%] h-auto flex flex-col gap-5 p-8 border border-white rounded-[12px]  ">
            <div className="flex justify-between">
              <p className="text-1">Delete "{`${name}`}?"</p>{" "}
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
              </button>{" "}
            </div>
            <p>
              Are you sure you want to delete this pot? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </p>
            <button
              onClick={() => confirmDelete(index)}
              className="w-full bg-red-500 p-2 border border-red-500 rounded-[8px] text-white "
            >
              Yes, Confirm deletion
            </button>
            <button onClick={refuseDelete} className="w-">
              No, Go Back
            </button>
          </div>
        </div>
      )}
      {/* Edit Modali buraya açılacak */}
      {isEditing === true && editingIndex == index && (
        <div className="modal-overlay">
          <div className="modal h-auto bg-white absolute flex flex-col p-8 gap-5 border border-white rounded-[12px] ">
            <div className="flex justify-between items-center">
              <p className="text-1">Edit {name}</p>
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
            {error === true && (
              <p className="text-red-500">
                Pot name or target cannot be left blank
              </p>
            )}
            <button onClick={handleSave} className="button-black">
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PotsOption;
