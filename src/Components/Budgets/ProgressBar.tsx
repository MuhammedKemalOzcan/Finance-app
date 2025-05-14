import React from "react";

interface Props {
  divRef: React.RefObject<HTMLDivElement | null>;
  spentAmount: number;
  width: number;
  theme: string;
  maximum: number;
}

const ProgressBar: React.FC<Props> = ({
  divRef,
  spentAmount,
  width,
  theme,
  maximum,
}) => {
  return (
    <div>
      <div
        ref={divRef}
        className="p-1 w-auto rounded-[4px] w-full h-8 bg-[#F8F4F0] "
      >
        <div
          style={{
            backgroundColor: theme,
            width: spentAmount < maximum ? (spentAmount / maximum) * width : width,
          }}
          className="h-6 rounded-[4px]"
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
