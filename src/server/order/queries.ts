"use server";

import { db } from "../db";

export async function getOrders(storeId: number) {
  return await db.order.findMany({ where: { storeId } });
}

export async function getOrder(id: number) {
  return await db.order.findFirst({
    where: { id },
  });
}
