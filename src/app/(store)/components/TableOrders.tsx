import { OrderByFilter } from "@/app/types/filtering";
import { getOrders } from "@/server/order/queries";
import Link from "next/link";
import { displayArrows } from "../store/functions/utils/display_arrows";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  buildSearchParams,
  invertCurrentOrdering,
} from "../store/functions/utils/build_search_params";
import { TableCell } from "./TableCell";

const searchParamsFilteringSchema = z.object({
  orderFilter: z.string(),
});

const searchParamsOrderSchema = z.object({
  orderOrder: z.string(),
});

const FILTERS = [
  { label: "Client's Name", filter: "orderFilter", order: "orderOrder" },
];

export async function TableOrders({
  storeId,
  searchParams,
}: {
  storeId: number;
  searchParams: { orderFilter: string; orderOrder: OrderByFilter };
}) {
  const orders = await getOrders(storeId);

  const buildUri = (param: keyof { orderOrder: OrderByFilter }) => {
    return buildSearchParams<{ orderOrder: OrderByFilter }>({
      ...{ orderOrder: searchParams.orderOrder },
      [param]: invertCurrentOrdering(searchParams[param]),
    });
  };

  async function handleSubmitFilters(formData: FormData) {
    const filterParams = searchParamsFilteringSchema.parse({
      orderFilter: formData.get("orderFilter"),
    });

    const orderParams = searchParamsOrderSchema.parse({
      orderOrder: formData.get("orderFilter"),
    });

    redirect(
      `${buildSearchParams<typeof orderParams>(orderParams)}&${Object.keys(
        filterParams,
      )
        .map(
          (param) =>
            `${param}=${filterParams[param as keyof typeof filterParams]}`,
        )
        .join("&")}`,
    );
  }

  return (
    <form action={handleSubmitFilters}>
      <button className="mb-2" type="submit">
        Filter
      </button>
      <table>
        <thead>
          <tr>
            {FILTERS.map((filter) => (
              <td className="text-center">
                <div className="flex gap-2">
                  {filter.label}
                  <Link href={buildUri("orderOrder")}>
                    {displayArrows(
                      searchParams,
                      filter.order as keyof typeof searchParams,
                    )}
                  </Link>
                </div>
                <input type="text" name={filter.filter} id={filter.filter} />
                <input
                  type="text"
                  name={filter.order}
                  id={filter.order}
                  hidden
                />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <TableCell
                url={`/store/${storeId}/order/${order.id}`}
                value={order.client}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
}
