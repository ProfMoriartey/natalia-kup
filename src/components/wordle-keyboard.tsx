import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

type WordleKeyboardProps = {
  onKeyPress: (key: string) => void;
  guesses: string[];
  solution: string;
};

export default function WordleKeyboard({
  onKeyPress,
  guesses,
  solution,
}: WordleKeyboardProps) {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"],
  ];

  const getStatus = (key: string) => {
    let status = "unused";
    for (const guess of guesses) {
      for (let i = 0; i < 5; i++) {
        if (guess[i] === key) {
          if (solution[i] === key) return "correct";
          if (solution.includes(key)) status = "present";
          if (status === "unused") status = "absent";
        }
      }
    }
    return status;
  };

  return (
    <div className="flex w-full flex-col gap-2 px-1 pb-4">
      {keys.map((row, i) => (
        <div key={i} className="flex w-full justify-center gap-1">
          {row.map((key) => {
            const status = getStatus(key);

            let keyClass = "bg-pink-100 text-pink-900 hover:bg-pink-200";
            if (status === "correct")
              keyClass = "bg-pink-500 text-white hover:bg-pink-600";
            if (status === "present")
              keyClass = "bg-green-300 text-white hover:bg-green-400";
            if (status === "absent")
              keyClass = "bg-slate-400 text-white hover:bg-slate-500";

            return (
              <Button
                key={key}
                variant="ghost"
                onClick={() => onKeyPress(key)}
                className={cn(
                  "h-14 min-w-0 flex-1 rounded px-0 text-sm font-bold transition-colors sm:h-16 sm:text-base",
                  key === "ENTER" || key === "DELETE"
                    ? "max-w-16 text-xs"
                    : "max-w-12",
                  keyClass,
                )}
              >
                {key === "DELETE" ? "DEL" : key}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
