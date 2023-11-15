import { OrderByFilter } from "@/app/types/filtering";

export const buildSearchParams = <T extends { [key: string]: string }>(
  searchParams: T,
) => {
  return `?${Object.keys(searchParams)
    .map(
      (searchParam) =>
        `${searchParam}=${
          searchParams[searchParam as keyof typeof searchParams]
        }`,
    )
    .join("&")}`;
};

export const invertCurrentOrdering = (param: OrderByFilter): OrderByFilter => {
  return param === "asc" ? "desc" : "asc";
};
