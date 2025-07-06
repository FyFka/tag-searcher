export const SuggestedTags = ({ onSearchChange, search }) => {
  const suggestedSearchTags = [":3", "AURA", "୨ৎ", "69", "meow", ">ᴗ<", "cute"];
  const onSuggestedTagClick = (tag) => {
    onSearchChange({ target: { value: tag } });
  };

  return (
    <div className="absolute right-0 top-0 flex items-center justify-center pr-3 gap-1 h-full z-20">
      {suggestedSearchTags.map((tag, idx) => (
        <button
          key={tag}
          className={`btn btn-xs btn-neutral ${idx >= 3 ? "hidden md:flex" : ""} ${
            idx >= 4 ? "md:hidden lg:flex" : ""
          }`}
          onClick={() => onSuggestedTagClick(tag)}
          disabled={search === tag}
          type="button"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
