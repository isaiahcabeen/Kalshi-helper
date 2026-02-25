"use client";

import { useState } from "react";
import { WORDS } from "@/lib/words";

export default function EditPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [words, setWords] = useState<any>({});

  const handleSubmit = async () => {
    const newVideo = {
      title,
      date,
      type,
      words,
      titleWords: {}
    };

    await fetch("/api/videos", {
      method: "POST",
      body: JSON.stringify(newVideo),
    });

    alert("Saved!");
  };

  return (
    <div className="p-10 text-white">
      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        className="block mb-4 p-2 bg-black border"
      />

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="block mb-4 p-2 bg-black border"
      />

      <input
        placeholder="Type (challenge, philanthropy...)"
        onChange={(e) => setType(e.target.value)}
        className="block mb-4 p-2 bg-black border"
      />

      {WORDS.map((word) => (
        <input
          key={word}
          type="number"
          placeholder={`${word} count`}
          onChange={(e) =>
            setWords({ ...words, [word]: parseInt(e.target.value || "0") })
          }
          className="block mb-2 p-2 bg-black border"
        />
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-green-700"
      >
        Save
      </button>
    </div>
  );
}