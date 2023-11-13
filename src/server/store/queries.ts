"use server";

import { db } from "../db";

export async function getStores() {
  return await db.store.findMany();
}

export async function getStore(id: number) {
  return await db.store.findUnique({ where: { id } });
}
