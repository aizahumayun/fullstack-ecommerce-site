interface Category {
  _id: string;

  name: string;
}

interface FilterBarProps {
  categories: Category[];

  selectedCategory: string;

  setSelectedCategory: (
    value: string
  ) => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: FilterBarProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <button
        onClick={() =>
          setSelectedCategory("")
        }
        className={`rounded-lg border px-4 py-2 ${
          selectedCategory === ""
            ? "bg-black text-white"
            : ""
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() =>
            setSelectedCategory(
              category.name
            )
          }
          className={`rounded-lg border px-4 py-2 ${
            selectedCategory ===
            category.name
              ? "bg-black text-white"
              : ""
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;