"use server";

import { z } from "zod";
import { db } from "../db";

const storeSchema = z.object({
  name: z.string(),
});

export async function newStore(formData: FormData) {
  const store = storeSchema.parse({
    name: formData.get("name"),
  });

  return await db.store.create({ data: { ...store } });
}
