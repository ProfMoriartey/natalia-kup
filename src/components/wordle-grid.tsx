import { cn } from "~/lib/utils";

type WordleGridProps = {
  guesses: string[];
  currentGuess: string;
  solution: string;
};

export default function WordleGrid({
  guesses,
  currentGuess,
  solution,
}: WordleGridProps) {
  const rows = Array.from({ length: 6 });

  return (
    <div className="grid w-full max-w-75 grid-rows-6 gap-2">
      {rows.map((_, i) => {
        if (i < guesses.length) {
          return (
            <WordleRow
              key={i}
              guess={guesses[i] ?? ""}
              solution={solution}
              isFinal={true}
            />
          );
        }
        if (i === guesses.length) {
          return (
            <WordleRow
              key={i}
              guess={currentGuess}
              solution={solution}
              isFinal={false}
            />
          );
        }
        return (
          <WordleRow key={i} guess="" solution={solution} isFinal={false} />
        );
      })}
    </div>
  );
}

type WordleRowProps = {
  guess: string;
  solution: string;
  isFinal: boolean;
};

type LetterStatus = "empty" | "correct" | "present" | "absent";

function WordleRow({ guess, solution, isFinal }: WordleRowProps) {
  const splitGuess = guess
    .split("")
    .concat(Array.from({ length: 5 - guess.length }, () => ""));

  const statuses: LetterStatus[] = Array.from({ length: 5 }, () => "empty");

  if (isFinal) {
    const solutionChars: (string | null)[] = solution.split("");

    splitGuess.forEach((char, i) => {
      if (char === solutionChars[i]) {
        statuses[i] = "correct";
        solutionChars[i] = null;
      }
    });

    splitGuess.forEach((char, i) => {
      if (statuses[i] !== "correct" && solutionChars.includes(char)) {
        statuses[i] = "present";
        const targetIndex = solutionChars.indexOf(char);
        if (targetIndex !== -1) {
          solutionChars[targetIndex] = null;
        }
      } else if (statuses[i] !== "correct") {
        statuses[i] = "absent";
      }
    });
  }

  return (
    <div className="grid grid-cols-5 gap-2">
      {splitGuess.map((char, i) => {
        let bgColor = "bg-transparent border-pink-200 text-pink-900";

        if (isFinal) {
          if (statuses[i] === "correct")
            bgColor = "bg-pink-500 border-pink-500 text-white";
          if (statuses[i] === "present")
            bgColor = "bg-green-300 border-green-300 text-white";
          if (statuses[i] === "absent")
            bgColor = "bg-rose-500 border-rose-500 text-white";
        } else if (char) {
          bgColor = "border-pink-400 text-pink-900";
        }

        return (
          <div
            key={i}
            className={cn(
              "flex h-14 w-14 items-center justify-center border-2 text-2xl font-bold uppercase transition-colors duration-300 sm:h-16 sm:w-16",
              bgColor,
            )}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
}
