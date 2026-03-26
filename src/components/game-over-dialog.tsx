import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

type GameOverDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isWin: boolean;
  solutionData: {
    word: string;
    description: string;
  };
  guesses: string[];
};

const FEEDBACK_MESSAGES = [
  "Taylor Swift",
  "Mastermind",
  "Smart",
  "Lovly",
  "Sweet Spot",
  "So CLose",
];

export default function GameOverDialog({
  isOpen,
  setIsOpen,
  isWin,
  solutionData,
  guesses,
}: GameOverDialogProps) {
  const attemptCount = guesses.length;
  // Fallback to "Blank Space" if she loses
  const feedbackText =
    isWin && attemptCount > 0
      ? FEEDBACK_MESSAGES[attemptCount - 1]
      : "Blank Space";

  const handleShare = async () => {
    const solution = solutionData.word.toUpperCase();

    const grid = guesses
      .map((guess) => {
        const solutionChars = solution.split("");
        const guessChars = guess.split("");
        const statuses = Array.from({ length: 5 }, () => "absent");

        guessChars.forEach((char, i) => {
          if (char === solutionChars[i]) {
            statuses[i] = "correct";
            solutionChars[i] = "";
          }
        });

        guessChars.forEach((char, i) => {
          if (statuses[i] !== "correct" && solutionChars.includes(char)) {
            statuses[i] = "present";
            const targetIndex = solutionChars.indexOf(char);
            if (targetIndex !== -1) {
              solutionChars[targetIndex] = "";
            }
          }
        });

        return statuses
          .map((status) => {
            if (status === "correct") return "\uD83D\uDFE5";
            if (status === "present") return "\uD83D\uDFEA";
            return "\u2B1C";
          })
          .join("");
      })
      .join("\n");

    const attempts = isWin ? attemptCount : "X";
    const textToShare = `Swiftle ${attempts}/6\n${feedbackText}\n\n${grid}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Swiftle",
          text: textToShare,
        });
      } catch (err) {
        console.error("Share failed");
      }
    } else {
      await navigator.clipboard.writeText(textToShare);
      alert("Copied to clipboard");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 max-w-sm rounded-xl border-pink-200 bg-pink-50 p-6 sm:rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold tracking-widest text-pink-900 uppercase">
            {isWin ? "You Won!" : "Game Over"}
          </DialogTitle>
          <DialogDescription className="mt-2 text-lg font-semibold text-pink-700">
            {feedbackText}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-3xl font-bold tracking-widest text-rose-500 uppercase">
            {solutionData.word}
          </p>
          <p className="text-sm font-medium text-pink-800">
            {solutionData.description}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={handleShare}
            className="w-full max-w-xs bg-rose-500 font-bold text-white hover:bg-rose-600"
          >
            Share Result
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
