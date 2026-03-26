import BirthdayMessage from "~/components/birthday-message";
import CountdownTimer from "~/components/countdown-timer";
import BucketList from "~/components/bucket-list";
import GameLink from "~/components/game-link";
import VisitedMap from "~/components/visited-map";

export default function LandingPage() {
  return (
    <main className="h-dvh w-full bg-pink-50 p-4 md:p-8">
      <div className="grid w-full grid-cols-1 grid-rows-4 gap-4 md:h-full md:grid-cols-2 md:grid-rows-2 md:gap-8">
        <BirthdayMessage />
        <BucketList />
        <VisitedMap />
        <CountdownTimer />
      </div>
    </main>
  );
}
