import { Category } from "../types/article";

interface CategoryFilterProps {
  selectedCategory: Category | "Все";
  onCategoryChange: (category: Category | "Все") => void;
}

const categories: (Category | "Все")[] = [
  "Все",
  "УК",
  "ДК",
  "Процессуальные",
  "Душка адвокатов",
  "Порядок Задержания",
  "10-Коды",
];

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            selectedCategory === category
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
