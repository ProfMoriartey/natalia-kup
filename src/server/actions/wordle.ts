// src/app/_actions/game.ts
"use server"
import { db } from "~/server/db"
import { swiftPuzzles } from "~/server/db/schema"
import { eq } from "drizzle-orm"

export async function getDailyWord() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const result = await db.query.swiftPuzzles.findFirst({
    where: eq(swiftPuzzles.activeDate, today)
  })
  
  return result?.word.toUpperCase() ?? "LOVER"
}