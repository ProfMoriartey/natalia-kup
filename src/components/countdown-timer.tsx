"use client";

import { useState, useEffect } from "react";

type TimeLeft = {
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date("2028-12-23T00:00:00");
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        return {
          months: 0,
          weeks: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

      const months = Math.floor(totalDays / 30);
      const remainingDays = totalDays % 30;
      const weeks = Math.floor(remainingDays / 7);
      const days = remainingDays % 7;

      return { months, weeks, days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());
    setIsLoaded(true);

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-full w-full rounded-xl border border-pink-200 bg-pink-100 p-6" />
    );
  }

  return (
    <div className="flex h-full flex-col justify-center rounded-xl border border-pink-200 bg-pink-100 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold tracking-widest text-pink-900 uppercase md:text-2xl">
        Countdown to 30
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div
            key={unit}
            className="flex flex-col items-center justify-center rounded border border-pink-300 bg-pink-50 p-2"
          >
            <span className="text-xl font-bold text-rose-500 md:text-2xl">
              {value}
            </span>
            <span className="text-xs text-pink-800 uppercase">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
