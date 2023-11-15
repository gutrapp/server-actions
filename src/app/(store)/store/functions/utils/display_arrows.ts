import { OrderByFilter } from "@/app/types/filtering";

export const displayArrows = <T extends { [key: string]: OrderByFilter }>(
  searchParams: T,
  order: keyof T,
) => {
  return searchParams[order]
    ? searchParams[order] === "asc"
      ? "↑"
      : "↓"
    : "↑↓";
};
