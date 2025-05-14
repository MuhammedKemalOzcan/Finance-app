import React from "react";
import chart from "../../Assets/Chart.svg";
import data from "../../data.json";

interface Props {
  spentAmount: number | undefined;
  spentByCategory: Record<string, number>;
}

const Summary: React.FC<Props> = ({ spentAmount, spentByCategory }) => {
  return (
    <div className="w-[30%] h-[600px] p-8 flex flex-col items-center gap-3 bg-white rounded-[12px]">
      <img className="size-60" src={chart} />
      <p className="text-1">Spending Summary</p>
      {data.budgets.map((item, index) => {
        spentAmount = spentByCategory[item.category] || 0;
        return (
          <div
            className="flex w-[80%] items-center whitespace-nowrap gap-2"
            key={index}
          >
            <span
              style={{
                backgroundColor: item.theme,
                color: item.theme,
              }}
              className="inline-flex place-self-start h-[43px] w-[4px] items-center rounded-full text-sm font-medium"
            ></span>
            <div className="flex justify-between w-full ">
              <p>{item.category}</p>
              <div className="flex gap-3 text-left">
                <p className="text-3">${spentAmount.toFixed(2)}</p>
                <p> of ${item.maximum}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Summary;
