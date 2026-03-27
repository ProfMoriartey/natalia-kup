import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

type InstructionsDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function InstructionsDialog({
  isOpen,
  setIsOpen,
}: InstructionsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-11/12 max-w-sm rounded-xl border-pink-200 bg-pink-50 p-6 sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold tracking-widest text-pink-900 uppercase">
            How To Play
          </DialogTitle>
          <DialogDescription className="mt-2 text-center text-base text-pink-800">
            Guess the Swiftle in 6 tries.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4 text-sm text-pink-900">
          <ul className="list-disc space-y-1 pl-5">
            <li>Each guess must be a valid 5-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>

          <div className="space-y-4 pt-2">
            <h3 className="border-b border-pink-200 pb-1 font-bold tracking-widest uppercase">
              Examples
            </h3>

            <div className="space-y-1">
              <div className="flex gap-1">
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-500 bg-pink-500 text-xl font-bold text-white uppercase">
                  S
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  W
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  I
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  F
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  T
                </div>
              </div>
              <p>
                <strong>S</strong> is in the word and in the correct spot.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex gap-1">
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  L
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-green-300 bg-green-300 text-xl font-bold text-white uppercase">
                  O
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  V
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  E
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  R
                </div>
              </div>
              <p>
                <strong>O</strong> is in the word but in the wrong spot.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex gap-1">
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  M
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  A
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  G
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-pink-400 text-xl font-bold text-pink-900 uppercase">
                  I
                </div>
                <div className="flex h-10 w-10 items-center justify-center border-2 border-slate-400 bg-slate-400 text-xl font-bold text-white uppercase">
                  C
                </div>
              </div>
              <p>
                <strong>C</strong> is not in the word in any spot.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-rose-500 font-bold tracking-widest text-white uppercase hover:bg-rose-600"
          >
            Play
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
