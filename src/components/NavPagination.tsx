import { Await, DeferredPromise, Link } from "@tanstack/react-router";
import { Suspense } from "react";

interface NavPaginationProps {
  pageSize: number;
  page: number;
  defferedElementsCount: DeferredPromise<number>;
}

export function NavPagination({
  pageSize,
  page,
  defferedElementsCount,
}: NavPaginationProps) {
  return (
    <nav className="grid grid-cols-3 items-center justify-items-center gap-4 py-4">
      {page > 1 ? (
        <Link
          from="/listings"
          search={(prev) => ({
            ...prev,
            page: prev.page - 1,
          })}
          className="focus:shadow-outline justify-self-end rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Previous
        </Link>
      ) : (
        <div></div> // Empty div to keep the grid structure
      )}

      <span className="text-sm font-semibold sm:text-base">
        Page {page} of{" "}
        <Suspense fallback={<span>...</span>}>
          <Await promise={defferedElementsCount}>
            {(elementsCount) => {
              const pageCount = Math.ceil(elementsCount / pageSize);
              return pageCount;
            }}
          </Await>
        </Suspense>
      </span>

      <Suspense fallback={<div></div>}>
        {" "}
        {/* Empty div for alignment if Next is not rendered */}
        <Await promise={defferedElementsCount}>
          {(elementsCount) =>
            page < Math.ceil(elementsCount / pageSize) && (
              <Link
                from="/listings"
                search={(prev) => ({
                  ...prev,
                  page: prev.page + 1,
                })}
                className="focus:shadow-outline justify-self-start rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Next
              </Link>
            )
          }
        </Await>
      </Suspense>
    </nav>
  );
}
