import { OrderByFilter } from "@/app/types/filtering";
import { db } from "@/server/db";
import {
  buildOrderByRelations,
  buildOrderBySimple,
} from "../../utils/build_order_by";

export async function getAllStores({
  name,
  orders,
  products,
}: {
  name: OrderByFilter;
  orders: OrderByFilter;
  products: OrderByFilter;
}) {
  return await db.store.findMany({
    orderBy: [
      ...buildOrderBySimple({ name }),
      ...buildOrderByRelations({ orders, products }),
    ],
    include: {
      _count: { select: { orders: true, products: true } },
    },
  });
}
