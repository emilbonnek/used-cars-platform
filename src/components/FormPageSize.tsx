import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { Output, fallback, object } from "valibot";
import { PAGE_SIZE_OPTIONS, PageSize } from "../pagination";
import { useEffect } from "react";

const PageSizeObject = object({
  pageSize: fallback(PageSize, PAGE_SIZE_OPTIONS[0]),
});
type PageSizeObject = Output<typeof PageSizeObject>;

interface FormPageSizeProps {
  search: PageSizeObject;
  onSubmit: (newSearch: PageSizeObject) => void;
}
export function FormPageSize({ search, onSubmit }: FormPageSizeProps) {
  const { register, handleSubmit, watch } = useForm<PageSizeObject>({
    defaultValues: search,
    resolver: valibotResolver(PageSizeObject),
  });

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, [handleSubmit, onSubmit, watch]);

  return (
    <form
      onSubmit={handleSubmit((newSearch) => {
        onSubmit(newSearch);
      })}
    >
      <div className="px-8">
        <label
          htmlFor="pageSize"
          className="mb-2 block text-nowrap text-sm font-bold text-gray-700"
        >
          Per page
        </label>
        <select
          {...register("pageSize")}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        >
          {PAGE_SIZE_OPTIONS.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
