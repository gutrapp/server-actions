"use server";

import { db } from "../db";

export async function getComments() {
  return await db.comment.findMany({
    include: { parentComment: true, subComments: true },
  });
}

export async function getComment(id: number) {
  return await db.comment.findFirst({
    where: { id },
    include: { parentComment: true, subComments: true },
  });
}
