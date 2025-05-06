import React, { FC } from "react";

interface Props {
  setCurrentPage: (value: number) => void;
  currentPage: number;
  pageNumbers: number[];
  pages: number;
}

const TransactionPagination: React.FC<Props> = ({
  setCurrentPage,
  currentPage,
  pageNumbers,
  pages,
}) => {
  const nextPage = () => {
    setCurrentPage(
      currentPage === pageNumbers.length
        ? currentPage - (pageNumbers.length - 1)
        : currentPage + 1
    );
  };
  const prevPage = () => {
    setCurrentPage(
      currentPage === 1 ? pageNumbers.length + 1 - currentPage : currentPage - 1
    );
  };
  const handlePage = (index: number) => {
    setCurrentPage(index + 1);
  };
  return (
    <div className="flex justify-between">
      <button
        onClick={prevPage}
        className="flex border px-4 py-2 rounded-[8px] gap-4 "
      >
        <p>{"<"}</p>
        <p>Prev</p>
      </button>
      <div>
        {pages > 1 && (
          <div className="flex gap-4 items-center">
            {pageNumbers.map((page, index) => (
              <ul
                onClick={() => handlePage(index)}
                style={{
                  cursor: "pointer",
                }}
                key={index}
                className={`${
                  page === currentPage ? "bg-black text-white" : ""
                } border px-4 py-2 rounded-[8px]`}
              >
                <li>{page}</li>
              </ul>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={nextPage}
        className="flex border px-4 py-2 rounded-[8px] gap-4 "
      >
        <p>Next</p>
        <p>{">"}</p>
      </button>
    </div>
  );
};

export default TransactionPagination;
