import React from "react";

interface Props {
  spentAmount: number;
  theme: string;
  maximum: number;
}

const Spent: React.FC<Props> = ({ spentAmount, theme, maximum }) => {
  return (
    <div className="flex justify-">
      <div className="flex gap-2 w-[50%] ">
        <span
          style={{
            backgroundColor: theme,
            color: theme,
          }}
          className="inline-flex h-[43px] w-[4px] items-center rounded-full text-sm font-medium"
        ></span>
        <div className="flex flex-col">
          <p>Spent</p>
          <p className="text-4-bold">${spentAmount}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <span
          style={{
            backgroundColor: theme,
            color: theme,
          }}
          className="inline-flex h-[43px] w-[4px] items-center rounded-full text-sm font-medium"
        ></span>
        <div className="flex flex-col w-[50%]">
          <p>Remaing</p>
          <p className="text-4-bold">
            ${maximum >= spentAmount ? maximum - spentAmount : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spent;
