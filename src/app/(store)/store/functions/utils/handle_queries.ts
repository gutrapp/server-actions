import { OrderByFilter } from "@/app/types/filtering";

type FilterType = "filter" | "sort";

type SearchParam = { [x: string]: OrderByFilter | string };

export const HandleQueries = <T extends SearchParam>(
  searchParams: T,
  filters: (keyof T)[],
  typeOfFilter: FilterType = "filter",
) => {
  filters.map((filter) => {
    searchParams = {
      ...searchParams,
      [filter]:
        typeOfFilter === "filter"
          ? searchParams[filter]
          : searchParams[filter] === "asc"
            ? "desc"
            : "asc",
    };
  });

  return searchParams;
};
