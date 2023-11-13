"use server";

import { db } from "../db";
import { z } from "zod";

const productSchema = z.object({
  price: z.string(),
  storeId: z.string(),
});

export async function createProduct(formData: FormData) {
  try {
    console.log(formData.get("cellphones"));

    const product = productSchema.parse({
      price: formData.get("price"),
      storeId: formData.get("storeId"),
    });

    return await db.product.create({
      data: {
        price: parseInt(product.price),
        storeId: parseInt(product.storeId),
      },
    });
  } catch (error) {
    return error;
  }
}

export async function deleteProduct(id: number) {
  return await db.product.delete({ where: { id } });
}
