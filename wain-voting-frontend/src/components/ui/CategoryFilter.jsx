import classNames from "classnames";
import React from "react";

function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex flex-row gap-2 mb-3 container">
      <button
        onClick={() => setSelectedCategory(null)}
        className={classNames(
          selectedCategory === null
            ? "bg-primary text-white border-primary"
            : "bg-dark-100 border-dark-50",
          "p-2 border rounded-lg"
        )}
      >
        Tất cả
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={classNames(
            selectedCategory === category.id
              ? "bg-primary text-white border-primary"
              : "bg-dark-100 border-dark-50 text-secondary-900",
            "p-2 border border-dark-50 rounded-lg"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
