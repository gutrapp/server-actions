import { OrderByFilter } from "@/app/types/filtering";

type FilterType = "filter" | "sort";

type SearchParam = { [x: string]: OrderByFilter | string };

export const HandleQueries = <T extends SearchParam>(
  searchParams: T,
  filter: keyof T,
  typeOfFilter: FilterType = "filter",
) => {
  return {
    ...searchParams,
    [filter]:
      typeOfFilter === "filter"
        ? searchParams[filter]
        : searchParams[filter] === "asc"
          ? "desc"
          : "asc",
  };
};
