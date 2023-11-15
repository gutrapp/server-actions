export const displayArrows = <T extends { [key: string]: string }>(
  searchParams: T,
  order: keyof T,
) => {
  return searchParams[order]
    ? searchParams[order] === "asc"
      ? "↑"
      : "↓"
    : "↑↓";
};
