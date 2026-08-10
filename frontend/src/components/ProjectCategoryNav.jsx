import { Link } from "react-router-dom";
import { portfolioData } from "../mockData";

export const ProjectCategoryNav = ({ activeCategory = "all" }) => {
  const items = [
    { id: "all", title: "All Projects", path: "/#works" },
    ...portfolioData.projectCategories.map((category) => ({
      id: category.id,
      title: category.title,
      path: category.path,
    })),
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {items.map((item) => {
        const isActive = activeCategory === item.id;

        return (
          <Link
            key={item.id}
            to={item.path}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "border-teal-500/50 bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20"
                : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-teal-500/50 hover:text-teal-300"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};
