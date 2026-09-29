function SearchBar({ searchTerm, onSearch }) {
    return (
      <input
        type="text"
        placeholder="Search for a meal..."
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
      />
    );
  }
  
  export default SearchBar;