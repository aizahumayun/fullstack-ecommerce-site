interface SearchBarProps {
  searchTerm: string;

  setSearchTerm: (
    value: string
  ) => void;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
        className="w-full rounded-xl border p-3 outline-none focus:border-black"
      />
    </div>
  );
};

export default SearchBar;