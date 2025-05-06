import React from "react";

interface Transaction {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
}

interface Props {
  sortedData: Transaction[];
}

const TransactionTable: React.FC<Props> = ({
  sortedData,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left ">
        <thead className="text-gray-600 text-sm uppercase border-b ">
          <tr>
            <th className="px-4 py-2 text-5">Recipient / Sender</th>
            <th className="px-4 py-2 text-5">Category</th>
            <th className="px-4 py-2 text-5">Transaction Date</th>
            <th className="px-4 py-2 text-5">Amount</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sortedData.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 flex items-center gap-2">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-4-bold">{item.name}</span>
              </td>
              <td className="px-4 py-3 text-5">{item.category}</td>
              <td className="px-4 py-3 text-5">
                {new Date(item.date).toLocaleDateString("tr-TR")}
              </td>
              <td className="px-4 py-3 font-medium">
                {item.amount > 0 ? (
                  <span className="text-green-600 text-4-bold">
                    +${item.amount}
                  </span>
                ) : (
                  <span className="text-red-500 text-4-bold">
                    -${Math.abs(item.amount)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
