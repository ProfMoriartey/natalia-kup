import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

type GameOverDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isWin: boolean;
  solutionData: {
    word: string;
    description: string;
  };
  guessCount: number;
};

export default function GameOverDialog({
  isOpen,
  setIsOpen,
  isWin,
  solutionData,
  guessCount,
}: GameOverDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 max-w-sm rounded-xl border-pink-200 bg-pink-50 p-6 sm:rounded-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold tracking-widest text-pink-900 uppercase">
            {isWin ? "You Won!" : "Game Over"}
          </DialogTitle>
          <DialogDescription className="text-pink-700">
            {isWin
              ? `You guessed it in ${guessCount} tries.`
              : "Better luck next time."}
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
      </DialogContent>
    </Dialog>
  );
}
