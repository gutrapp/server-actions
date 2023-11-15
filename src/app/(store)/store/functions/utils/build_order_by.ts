import { OrderByFilter } from "@/app/types/filtering";

export const buildOrderBySimple = (searchParams: {
  [key: string]: OrderByFilter;
}) => {
  return Object.keys(searchParams).map((searchParam) => ({
    ...(searchParams[searchParam] && {
      [searchParam]: searchParams[searchParam],
    }),
  }));
};

export const buildOrderByRelations = (searchParams: {
  [key: string]: OrderByFilter;
}) => {
  return Object.keys(searchParams).map((searchParam) => ({
    ...(searchParams[searchParam] && {
      [searchParam]: {
        _count: searchParams[searchParam],
      },
    }),
  }));
};
