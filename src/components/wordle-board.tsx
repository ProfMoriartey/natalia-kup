"use client";

import { useState, useEffect, useCallback } from "react";
import WordleGrid from "~/components/wordle-grid";
import WordleKeyboard from "~/components/wordle-keyboard";

type WordleBoardProps = {
  solutionData: {
    word: string;
    description: string;
  };
};

export default function WordleBoard({ solutionData }: WordleBoardProps) {
  const solution = solutionData.word.toUpperCase();
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const onKeyPress = useCallback(
    (key: string) => {
      if (isGameOver) return;

      if (key === "ENTER") {
        if (currentGuess.length === 5) {
          const newGuesses = [...guesses, currentGuess];
          setGuesses(newGuesses);
          if (currentGuess === solution || newGuesses.length === 6) {
            setIsGameOver(true);
          }
          setCurrentGuess("");
        }
      } else if (key === "BACKSPACE" || key === "DELETE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, isGameOver, guesses, solution],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        onKeyPress(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-between bg-pink-50 pt-4 pb-8">
      <div className="flex w-full max-w-sm flex-col items-center px-4">
        <h1 className="mb-6 text-3xl font-bold tracking-widest text-pink-900 uppercase">
          Swiftle
        </h1>

        <WordleGrid
          guesses={guesses}
          currentGuess={currentGuess}
          solution={solution}
        />
      </div>

      {isGameOver && (
        <div className="mt-4 w-full max-w-sm rounded-lg border border-pink-200 bg-pink-100 p-4 text-center shadow-sm">
          <p className="mb-1 font-bold text-pink-900">{solution}</p>
          <p className="text-sm text-pink-800">{solutionData.description}</p>
        </div>
      )}

      <div className="mt-auto w-full max-w-md px-2">
        <WordleKeyboard
          onKeyPress={onKeyPress}
          guesses={guesses}
          solution={solution}
        />
      </div>
    </div>
  );
}
