import { Link } from "@tanstack/react-router";

interface NavPaginationProps {
  page: number;
  pageCount: number;
}

export function NavPagination({ page, pageCount }: NavPaginationProps) {
  return (
    <nav className="flex gap-2">
      {page > 1 && (
        <Link
          from="/listings"
          search={(prev) => ({
            ...prev,
            page: prev.page - 1,
          })}
        >
          Previous
        </Link>
      )}

      <span>
        Page {page} of {pageCount}
      </span>

      {page < pageCount && (
        <Link
          from="/listings"
          search={(prev) => ({
            ...prev,
            page: prev.page + 1,
          })}
        >
          Next
        </Link>
      )}
    </nav>
  );
}
