"use server";

import { redirect } from "next/dist/server/api-utils";
import { db } from "../db";
import { z } from "zod";

const orderSchema = z.object({
  client: z.string(),
});

const orderProductSchema = z.object({
  productId: z.string(),
  storeId: z.string(),
});

export async function createOrder(formData: FormData) {
  try {
    const order = orderSchema.parse({
      client: formData.get("client"),
    });

    const { productId, storeId } = orderProductSchema.parse({
      productId: formData.get("productId"),
      storeId: formData.get("storeId"),
    });

    const _order = await db.order.create({
      data: {
        ...order,
        storeId: parseInt(storeId),
        productOrders: {
          create: { productId: parseInt(productId) },
        },
      },
    });

    return _order;
  } catch (error) {
    return error;
  }
}

export async function deleteOrder(id: number) {
  return await db.order.delete({ where: { id } });
}
