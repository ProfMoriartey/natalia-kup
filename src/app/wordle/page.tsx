import { getDailyWord } from "~/server/actions/wordle";
import WordleBoard from "~/components/wordle-board";

export default async function HomePage() {
  const dailyData = await getDailyWord();

  return (
    <main className="min-h-dvh bg-pink-50 selection:bg-pink-200">
      <WordleBoard solutionData={dailyData} />
    </main>
  );
}
