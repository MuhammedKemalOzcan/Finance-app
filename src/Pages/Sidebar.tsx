import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-[#F8F4F0]">
      <div
        className={`${
          open === true
            ? "bg-[#201F24] h-full w-[300px] h-screen sticky p-6 border border-[#201F24] rounded-r-[24px] flex flex-col justify-between "
            : "hidden"
        }`}
      >
        <div className="text-3 text-[#B3B3B3] mt-10 flex flex-col gap-6 justify-between">
          <h1 className="text-white font-bold ">Finance</h1>
          <div className="flex flex-col gap-6">
            <div className="flex gap-6  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <button onClick={() => navigate("/")}>Overview</button>
            </div>
            <div className="flex gap-6  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M6.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06L8.25 4.81V16.5a.75.75 0 0 1-1.5 0V4.81L3.53 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5Zm9.53 4.28a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V7.5a.75.75 0 0 1 .75-.75Z" />
              </svg>

              <button onClick={() => navigate("/transaction")}>
                Transaction
              </button>
            </div>
            <div className="flex gap-6  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" />
                <path d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" />
              </svg>

              <button onClick={() => navigate("/budgets")}>Budgets</button>
            </div>
            <div className="flex gap-6  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="size-6"
              >
                <path d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>

              <button onClick={() => navigate("/pots")}>Pots</button>
            </div>
            <div className="flex gap-6  ">
              <svg
              className="size-6"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.4375 16.25C28.4375 16.4986 28.3387 16.7371 28.1629 16.9129C27.9871 17.0887 27.7486 17.1875 27.5 17.1875H12.5C12.2514 17.1875 12.0129 17.0887 11.8371 16.9129C11.6613 16.7371 11.5625 16.4986 11.5625 16.25C11.5625 16.0014 11.6613 15.7629 11.8371 15.5871C12.0129 15.4113 12.2514 15.3125 12.5 15.3125H27.5C27.7486 15.3125 27.9871 15.4113 28.1629 15.5871C28.3387 15.7629 28.4375 16.0014 28.4375 16.25ZM27.5 20.3125H12.5C12.2514 20.3125 12.0129 20.4113 11.8371 20.5871C11.6613 20.7629 11.5625 21.0014 11.5625 21.25C11.5625 21.4986 11.6613 21.7371 11.8371 21.9129C12.0129 22.0887 12.2514 22.1875 12.5 22.1875H27.5C27.7486 22.1875 27.9871 22.0887 28.1629 21.9129C28.3387 21.7371 28.4375 21.4986 28.4375 21.25C28.4375 21.0014 28.3387 20.7629 28.1629 20.5871C27.9871 20.4113 27.7486 20.3125 27.5 20.3125ZM35.9375 8.75V32.5C35.9373 32.6598 35.8963 32.8168 35.8184 32.9563C35.7404 33.0958 35.6282 33.213 35.4922 33.2969C35.3446 33.389 35.174 33.4378 35 33.4375C34.8547 33.4376 34.7113 33.4039 34.5813 33.3391L30 31.0484L25.4187 33.3391C25.2887 33.404 25.1453 33.4378 25 33.4378C24.8547 33.4378 24.7113 33.404 24.5813 33.3391L20 31.0484L15.4187 33.3391C15.2887 33.404 15.1453 33.4378 15 33.4378C14.8547 33.4378 14.7113 33.404 14.5813 33.3391L10 31.0484L5.41875 33.3391C5.2758 33.4104 5.11697 33.4441 4.95736 33.4368C4.79775 33.4295 4.64264 33.3816 4.50676 33.2975C4.37089 33.2135 4.25875 33.0961 4.18099 32.9565C4.10324 32.8169 4.06245 32.6598 4.0625 32.5V8.75C4.0625 8.16984 4.29297 7.61344 4.7032 7.2032C5.11344 6.79297 5.66984 6.5625 6.25 6.5625H33.75C34.3302 6.5625 34.8866 6.79297 35.2968 7.2032C35.707 7.61344 35.9375 8.16984 35.9375 8.75ZM34.0625 8.75C34.0625 8.66712 34.0296 8.58763 33.971 8.52903C33.9124 8.47042 33.8329 8.4375 33.75 8.4375H6.25C6.16712 8.4375 6.08763 8.47042 6.02903 8.52903C5.97042 8.58763 5.9375 8.66712 5.9375 8.75V30.9828L9.58125 29.1609C9.71129 29.096 9.85465 29.0622 10 29.0622C10.1453 29.0622 10.2887 29.096 10.4187 29.1609L15 31.4516L19.5813 29.1609C19.7113 29.096 19.8547 29.0622 20 29.0622C20.1453 29.0622 20.2887 29.096 20.4187 29.1609L25 31.4516L29.5813 29.1609C29.7113 29.096 29.8547 29.0622 30 29.0622C30.1453 29.0622 30.2887 29.096 30.4187 29.1609L34.0625 30.9828V8.75Z"
                  fill="white"
                />
              </svg>

              <button onClick={() => navigate("/bills")}>
                Recurring Bills
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={handleOpen}
          className="text-3 text-[#B3B3B3] flex gap-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#B3B3B3"
            className="size-6"
          >
            <path d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" />
          </svg>
          <p>Minimize Menu</p>
        </button>
      </div>

      <button
        onClick={handleClose}
        className={`${open === false ? "size-6 absolute top-2" : "hidden"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="size-6"
        >
          <path d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
      </button>
    </div>
  );
}

export default Sidebar;
