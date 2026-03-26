"use client";

import { useState, useEffect, useCallback } from "react";
import WordleGrid from "~/components/wordle-grid";
import WordleKeyboard from "~/components/wordle-keyboard";
import GameOverDialog from "~/components/game-over-dialog";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const onKeyPress = useCallback(
    (key: string) => {
      if (isGameOver) return;

      if (key === "ENTER") {
        if (currentGuess.length === 5) {
          const newGuesses = [...guesses, currentGuess];
          setGuesses(newGuesses);

          if (currentGuess === solution) {
            setIsGameOver(true);
            setIsWin(true);
            setTimeout(() => setIsDialogOpen(true), 1500);
          } else if (newGuesses.length === 6) {
            setIsGameOver(true);
            setIsWin(false);
            setTimeout(() => setIsDialogOpen(true), 1500);
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
    const savedState = localStorage.getItem("swiftle-state");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const today = new Date().toDateString();

      if (parsedState.date === today) {
        setGuesses(parsedState.guesses);
        setIsGameOver(parsedState.isGameOver);
        setIsWin(parsedState.isWin);
        if (parsedState.isGameOver) {
          setTimeout(() => setIsDialogOpen(true), 500);
        }
      } else {
        localStorage.removeItem("swiftle-state");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const stateToSave = {
      guesses,
      isGameOver,
      isWin,
      date: new Date().toDateString(),
    };
    localStorage.setItem("swiftle-state", JSON.stringify(stateToSave));
  }, [guesses, isGameOver, isWin, isLoaded]);

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

  if (!isLoaded) {
    return <div className="min-h-dvh bg-pink-50" />;
  }

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

      <div className="mt-auto w-full max-w-md px-2">
        <WordleKeyboard
          onKeyPress={onKeyPress}
          guesses={guesses}
          solution={solution}
        />
      </div>

      <GameOverDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        isWin={isWin}
        solutionData={solutionData}
        guessCount={guesses.length}
      />
    </div>
  );
}
