import React from "react";

interface Props {
  total: number;
  target: number;
  theme: string;
  width: number;
}

const Percentage: React.FC<Props> = ({ total, target, theme, width }) => {
  return (
    <div>
      <div className="flex justify-between text-[#696868] ">
        <p>{((total / target) * 100).toFixed(2)}%</p>
        <p>Target of {target}</p>
      </div>
      <div className="w-full transition-all duration-300 border border-[#F8F4F0] h-2 bg-[#F8F4F0] rounded-[4px] ">
        <div
          style={{
            backgroundColor: theme,
            width: (total / target) * width,
          }}
          className="h-2 rounded-[4px]"
        ></div>
      </div>
    </div>
  );
};

export default Percentage;
