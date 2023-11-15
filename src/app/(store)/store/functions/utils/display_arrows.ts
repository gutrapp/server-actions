import { OrderByFilter } from "@/app/types/filtering";

export const displayArrows = (order: OrderByFilter) => {
  return !order ? "↑↓" : order === "asc" ? "↑" : "↓";
};
