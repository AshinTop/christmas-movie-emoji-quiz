import { MovieQuestion } from "../types";
import { QUESTION_BANK } from "./questionBank";

// Helper to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Renamed internally to reflect it's just fetching from local bank
export const fetchChristmasMovies = async (): Promise<MovieQuestion[]> => {
  // Minimal delay to allow UI to transition smoothly (better UX than instant flash)
  await new Promise(resolve => setTimeout(resolve, 600));

  try {
    // 1. Get all questions from the bank
    const allQuestions = QUESTION_BANK;

    // 2. Shuffle them
    const shuffled = shuffleArray(allQuestions);

    // 3. Return a large batch (all 100 or a subset)
    // We return all of them for the time attack mode so they don't run out.
    const selected = shuffled;
    
    // 4. Add dynamic IDs to ensure uniqueness in React keys if played multiple times
    return selected.map((item, index) => ({
      ...item,
      id: `q-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }));

  } catch (error) {
    console.error("Error loading movie bank:", error);
    return [];
  }
};
