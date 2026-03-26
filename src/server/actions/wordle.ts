"use server"

import words from "~/data/swift-words.json"

export async function getDailyWord() {
  const startDate = new Date("2026-03-26T00:00:00")
  const today = new Date()

  const diffTime = today.getTime() - startDate.getTime()
  const diffDays = Math.floor(diffTime / 86400000)

  const index = Math.max(0, diffDays % words.length)

  const fallback = {
    word: "SWIFT",
    description: "The music industry herself"
  }

  return words[index] ?? fallback
}