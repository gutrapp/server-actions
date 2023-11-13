"use server";

import { Comment } from "@prisma/client";
import { db } from "../db";

export async function createComment(comment: Comment) {
  return await db.comment.create({
    data: {
      ...comment,
    },
  });
}

export async function deleteComment(id: number) {
  return await db.comment.delete({ where: { id } });
}

export async function updateComment(id: number, comment: Comment) {
  return await db.comment.update({ where: { id }, data: { ...comment } });
}
