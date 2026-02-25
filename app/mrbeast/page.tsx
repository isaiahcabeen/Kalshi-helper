"use client";

import { useEffect, useState } from "react";
import { WORDS } from "@/lib/words";
import { calculateProbabilities } from "@/lib/probability";
import { useRouter } from "next/navigation";

export default function MrBeastPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [prices, setPrices] = useState<any>({});
  const [probabilities, setProbabilities] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data || []);
        setProbabilities(calculateProbabilities(data || []));
      });
  }, []);

  const results = WORDS.map((word) => {
    const p = probabilities[word] || 0;
    const price = parseFloat(prices[word] || 0);
    const n = videos.length;
    const se = Math.sqrt((p * (1 - p)) / Math.max(n, 1));
    const margin = 2 * se; // confidence buffer

const ev = p - price;
const action = ev > margin ? "BUY" : "NO BUY";

    return {
      word,
      ev,
      action: ev > 0 ? "BUY" : "NO BUY",
    };
  });

  return (
    <div className="min-h-screen bg-black text-gray-200 p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold tracking-wide">
          MrBeast Trading Assistant
        </h1>

        <button
          onClick={() => router.push("/mrbeast/edit")}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 transition rounded-lg border border-zinc-700"
        >
          Edit Data
        </button>
      </div>

      <div className="space-y-6">
        {results.map((r) => (
          <div
            key={r.word}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">{r.word}</h2>

            <p className="text-sm text-zinc-400">
              Probability: {probabilities[r.word]?.toFixed(2) || "0.00"}
            </p>

            <input
              type="number"
              step="0.01"
              placeholder="Market Price"
              onChange={(e) =>
                setPrices({ ...prices, [r.word]: e.target.value })
              }
              className="mt-3 w-full bg-black border border-zinc-700 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />

            <p
              className={`mt-3 font-medium ${
                r.ev > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              EV: {r.ev.toFixed(2)} | Action: {r.action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}