"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-4xl font-bold">Trading Assistants</h1>

      <button
        onClick={() => router.push("/mrbeast")}
        className="px-6 py-3 bg-black text-white rounded-xl"
      >
        MrBeast Trading Assistant
      </button>
    </div>
  );
}