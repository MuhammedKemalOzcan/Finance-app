import React from "react";
import { useNavigate } from "react-router-dom";

type Transaction = {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
};

interface Props {
  transaction: Transaction[];
  category: string;
}

const LatestSpending: React.FC<Props> = ({ transaction, category }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col bg-[#F8F4F0] h-[300px] rounded-[12px] p-5 gap-5  ">
      <div className="flex justify-between ">
        <p className="text-3">Latest Spending</p>
        <button
          onClick={() =>
            navigate(`/transaction?category=${encodeURIComponent(category)}`)
          }
        >
          See All {">"}
        </button>
      </div>
      {transaction
        .filter((transaction) => transaction.category === category)
        .slice(0, 3)
        .map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <img src={item.avatar} className="size-12 rounded-full" />
                <p>{item.name}</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <p className="text-5-bold">{item.amount.toFixed(2)}</p>
                <p className="text-5">
                  {new Date(item.date).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LatestSpending;
