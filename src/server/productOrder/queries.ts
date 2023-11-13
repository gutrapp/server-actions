import { db } from "../db";

export async function getProductOrders(productId: number) {
  return await db.productOrder.findMany({
    where: {
      productId,
    },
    include: {
      order: true,
    },
  });
}

export async function getProductsOrder(orderId: number) {
  return await db.productOrder.findMany({
    where: {
      orderId,
    },
    include: {
      product: true,
    },
  });
}
