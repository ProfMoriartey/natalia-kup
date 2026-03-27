"use client";

import { useState, useEffect } from "react";

type BucketListItem = {
  id: number;
  text: string;
  done: boolean;
};

const DEFAULT_LIST: BucketListItem[] = [
  { id: 1, text: "See Taylor Swift live", done: false },
  { id: 2, text: "Visit the new world", done: false },
  { id: 3, text: "Be friends with a genius", done: true },
  { id: 4, text: "Read Morning Glory Milking Farm", done: false },
  { id: 5, text: "Get married", done: false },
];

export default function BucketList() {
  const [list, setList] = useState<BucketListItem[]>(DEFAULT_LIST);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedList = localStorage.getItem("birthday-bucket-list");
    if (savedList) {
      try {
        setList(JSON.parse(savedList) as BucketListItem[]);
      } catch (error) {
        console.error("Failed to parse saved bucket list");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("birthday-bucket-list", JSON.stringify(list));
  }, [list, isLoaded]);

  const toggleItem = (id: number) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  if (!isLoaded) {
    return (
      <div className="h-full w-full rounded-xl border border-pink-200 bg-pink-100 p-6" />
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-pink-200 bg-pink-100 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-pink-900 uppercase md:text-2xl">
        To Do Before 30
      </h2>
      <ul className="flex flex-col gap-3 overflow-y-auto pr-2">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex cursor-pointer items-center gap-3"
            onClick={() => toggleItem(item.id)}
          >
            <div
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                item.done
                  ? "border-rose-500 bg-rose-500"
                  : "border-pink-300 bg-transparent"
              }`}
            >
              {item.done && (
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-base transition-all md:text-lg ${
                item.done ? "text-pink-400 line-through" : "text-pink-800"
              }`}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
