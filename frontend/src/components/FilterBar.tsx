interface Category {
  _id: string;
  name: string;
}

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

const FilterBar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: FilterBarProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory("")}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform ${
            selectedCategory === ""
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform ${
              selectedCategory === category.name
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;