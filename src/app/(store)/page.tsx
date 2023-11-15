import Link from "next/link";
import { OrderByFilter } from "../types/filtering";
import { getAllStores } from "./store/functions/db/queries/getAllStores";
import {
  buildSearchParams,
  invertCurrentOrdering,
} from "./store/functions/utils/build_search_params";
import { displayArrows } from "./store/functions/utils/display_arrows";
import { TableCell } from "./components/TableCell";

const TABLE_HEAD_FILTERS: {
  label: string;
  order: "name" | "products" | "orders";
}[] = [
  { label: "Name", order: "name" },
  { label: "Quantity of Products", order: "products" },
  { label: "Quantity of Orders", order: "orders" },
];

export default async function Page({
  searchParams,
}: {
  searchParams: {
    name: OrderByFilter;
    products: OrderByFilter;
    orders: OrderByFilter;
  };
}) {
  const stores = await getAllStores(searchParams);

  const buildUri = (param: keyof typeof searchParams) => {
    return buildSearchParams<typeof searchParams>({
      ...searchParams,
      [param]: invertCurrentOrdering(searchParams[param]),
    });
  };

  return (
    <main className="flex flex-col items-start gap-2 p-20 text-black">
      <div className=" flex items-center gap-5">
        <Link href="/store">
          <button className="rounded-md border-2 border-black px-4 py-2">
            Create Store
          </button>
        </Link>
      </div>
      <Link href="/">Clear filters</Link>
      <div className="mx-20 flex w-full items-center justify-center">
        <table className="w-full">
          <thead>
            <tr>
              {TABLE_HEAD_FILTERS.map((filter, idx) => (
                <td key={idx} className="text-center">
                  {filter.label}
                  <Link className="ml-3" href={buildUri(filter.order)}>
                    {displayArrows(searchParams, filter.order)}
                  </Link>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {stores.map((store, idx) => (
              <tr key={idx}>
                <TableCell url={`/store/${store.id}`} value={store.name} />
                <TableCell
                  url={`/store/${store.id}`}
                  value={store._count.products}
                />
                <TableCell
                  url={`/store/${store.id}`}
                  value={store._count.orders}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
