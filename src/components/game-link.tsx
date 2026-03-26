import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function GameLink() {
  return (
    <div className="flex h-full flex-col justify-center rounded-xl border border-pink-200 bg-pink-100 p-6 shadow-sm">
      <div className="mb-6 text-center text-pink-800">
        <p>Ready to test your Swiftie knowledge?</p>
      </div>
      <Link href="/wordle" className="w-full">
        <Button className="w-full bg-rose-500 py-8 text-lg font-bold tracking-widest text-white uppercase hover:bg-rose-600 md:text-xl">
          Play Birthday Swiftle
        </Button>
      </Link>
    </div>
  );
}
