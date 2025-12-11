import { LeaderboardEntry } from "../types";

const STORAGE_KEY_LOCAL = 'christmas_emoji_local_highscores_v2';

export const getLocalLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_LOCAL);
    if (stored) {
      const data: LeaderboardEntry[] = JSON.parse(stored);
      // Ensure sorted descending by score
      return data.sort((a, b) => b.score - a.score);
    }
    return [];
  } catch (e) {
    console.error("Local Leaderboard error", e);
    return [];
  }
}

export const saveScore = (name: string, score: number) => {
  try {
    const currentData = getLocalLeaderboard();
    const existingIndex = currentData.findIndex(entry => entry.name === name);

    if (existingIndex !== -1) {
      // User exists, update only if score is higher
      if (score > currentData[existingIndex].score) {
        currentData[existingIndex].score = score;
        currentData[existingIndex].date = new Date().toISOString();
      }
    } else {
      // New user
      currentData.push({ name, score, date: new Date().toISOString() });
    }

    // Sort and save
    const sorted = currentData.sort((a, b) => b.score - a.score);
    localStorage.setItem(STORAGE_KEY_LOCAL, JSON.stringify(sorted));
    
  } catch (e) {
    console.error("Failed to save score", e);
  }
};

export const clearLeaderboard = () => {
    localStorage.removeItem(STORAGE_KEY_LOCAL);
};

// Compatibility shim, redirect to local
export const getGlobalLeaderboard = getLocalLeaderboard;
