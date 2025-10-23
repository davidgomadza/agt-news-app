import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";

interface NavigationProps {
  onNavigate?: () => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await backend.category.list();
      return response.categories;
    },
  });

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
      <Link 
        to="/" 
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={onNavigate}
      >
        Home
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          className="text-sm font-medium hover:text-primary transition-colors"
          onClick={onNavigate}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
