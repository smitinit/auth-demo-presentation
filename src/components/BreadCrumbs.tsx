import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

function formatLabel(segment: string) {
  // Handle IDs and make labels readable
  if (/^\d+$/.test(segment)) return "Patient Details";
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function Breadcrumbs() {
  const location = useLocation();

  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    return (
      <BreadcrumbItem key={path}>
        {isLast ? (
          <BreadcrumbPage>{formatLabel(segment)}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link to={path}>{formatLabel(segment)}</Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.length > 0 && (
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
        )}

        {crumbs.map((crumb, index) => (
          <span key={index} className="flex gap-2 items-center">
            {crumb}
            {index < crumbs.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
