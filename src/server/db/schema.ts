// src/server/db/schema.ts
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const swiftPuzzles = pgTable("swift_puzzles", {
  id: varchar("id", { length: 255 }).primaryKey(),
  word: varchar("word", { length: 5 }).notNull(),
  activeDate: timestamp("active_date").unique().notNull(),
})