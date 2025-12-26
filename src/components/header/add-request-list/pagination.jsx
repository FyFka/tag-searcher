import { useState } from "react";

export const Pagination = ({ totalPages, currentPage, onPageChange, loading }) => {
  const [inputState, setInputState] = useState({ side: null, value: "" });

  const handleInputSubmit = () => {
    const pageNum = parseInt(inputState.value);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) onPageChange(pageNum);
    setInputState({ side: null, value: "" });
  };

  const renderPageButton = (p) => (
    <button
      disabled={loading}
      key={`p-${p}`}
      onClick={() => onPageChange(p)}
      className={`btn rounded-none btn-sm w-9 outline-transparent transition-none ${
        currentPage === p ? "btn-primary" : "bg-base-100"
      }`}
    >
      {p}
    </button>
  );

  const renderEllipsisOrInput = (side) => {
    const isActive = inputState.side === side;
    return isActive ? (
      <input
        key={`${side}-inp`}
        type="text"
        className="input input-sm rounded-none w-9 p-0.5 text-center border-none outline-transparent"
        name="Page"
        placeholder="..."
        value={inputState.value}
        onChange={(e) => setInputState({ side, value: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
        onBlur={() => setInputState({ side: null, value: "" })}
        autoFocus
      />
    ) : (
      <button
        key={`${side}-d`}
        onClick={() => setInputState({ side, value: "" })}
        className="btn rounded-none outline-transparent btn-sm w-9"
        disabled={loading}
      >
        ...
      </button>
    );
  };

  const pages = [];

  pages.push(renderPageButton(1));
  if (currentPage > 3) pages.push(renderEllipsisOrInput("left"));

  // Middle pages (current -1, current, current +1)
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let i = start; i <= end; i++) {
    pages.push(renderPageButton(i));
  }

  if (currentPage < totalPages - 2) pages.push(renderEllipsisOrInput("right"));
  if (totalPages > 1) pages.push(renderPageButton(totalPages));

  if (totalPages <= 1) return <div className="h-8.5"></div>;

  return (
    <div
      className={`overflow-hidden rounded-lg border border-[color-mix(in_oklab,var(--color-base-content)_20%,transparent)]`}
    >
      {pages}
    </div>
  );
};
