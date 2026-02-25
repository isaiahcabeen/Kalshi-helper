import { WORDS } from "./words";

type Video = {
  title: string;
  date: string;
  type: string;
  words: Record<string, number>;
  titleWords?: Record<string, number>;
};

export function calculateProbabilities(
  videos: Video[],
  targetType?: string
) {
  if (!videos.length) return {};

  // Sort newest first
  const sorted = [...videos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const now = Date.now();
  const lambda = 0.002; // recency decay strength

  const counts: Record<string, number> = {};
  const totals: Record<string, number> = {};
  const rollingCounts: Record<string, number> = {};
  const rollingWindow = 20;

  WORDS.forEach((word) => {
    counts[word] = 0;
    totals[word] = 0;
    rollingCounts[word] = 0;
  });

  let totalWeight = 0;

  sorted.forEach((video, index) => {
    if (targetType && video.type !== targetType) return;

    const ageDays =
      (now - new Date(video.date).getTime()) / (1000 * 60 * 60 * 24);

    const weight = Math.exp(-lambda * ageDays);
    totalWeight += weight;

    WORDS.forEach((word) => {
      const count = video.words[word] || 0;

      if (count > 0) {
        counts[word] += weight;
      }

      totals[word] += weight;

      // Rolling window (last N videos)
      if (index < rollingWindow && count > 0) {
        rollingCounts[word] += 1;
      }
    });
  });

  const probabilities: Record<string, number> = {};

  WORDS.forEach((word) => {
    // Laplace smoothing
    const smoothed =
      (counts[word] + 1) / (totals[word] + 2);

    // Blend rolling window + full history
    const rolling =
      rollingCounts[word] / Math.min(rollingWindow, sorted.length);

    probabilities[word] = 0.7 * smoothed + 0.3 * rolling;
  });

  return probabilities;
}