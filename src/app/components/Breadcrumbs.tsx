import { Link } from "react-router";
import { ChevronLeft, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm py-4 px-4 md:px-0">
      <Link
        to="/"
        className="flex items-center gap-1 text-gray-400 hover:text-[#d4af37] transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>الرئيسية</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
          {item.path ? (
            <Link
              to={item.path}
              className="text-gray-400 hover:text-[#d4af37] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#d4af37] font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
