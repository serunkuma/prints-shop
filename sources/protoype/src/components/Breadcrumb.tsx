import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center flex-wrap gap-x-1 gap-y-0.5"
      style={{ padding: "var(--space-md) 0" }}
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && (
            <span
              className="text-caption mx-2"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              /
            </span>
          )}
          {item.path ? (
            <Link
              to={item.path}
              className="text-caption hover:underline"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-caption"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
