import {
  Output,
  coerce,
  fallback,
  integer,
  minValue,
  number,
  object,
  picklist,
} from "valibot";

export const PAGE_SIZE_OPTIONS = [10, 25, 50] as const;
export const PageSize = coerce(picklist(PAGE_SIZE_OPTIONS), Number);
export type PageSize = Output<typeof PageSize>;

export const Page = number([integer(), minValue(1)]);

export const Paginate = object({
  pageSize: fallback(PageSize, PAGE_SIZE_OPTIONS[0]),
  page: fallback(Page, 1),
});
export type Paginate = Output<typeof Paginate>;
