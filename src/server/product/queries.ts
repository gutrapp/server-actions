"use server";

import { db } from "../db";

export async function getProducts(storeId: number) {
  return await db.product.findMany({ where: { storeId } });
}

export async function getProduct(id: number) {
  return await db.product.findFirst({
    where: { id },
    include: { comments: true },
  });
}
