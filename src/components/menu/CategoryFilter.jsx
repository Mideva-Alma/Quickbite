function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
      <select
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="All">All Categories</option>
  
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    );
  }
  
  export default CategoryFilter;