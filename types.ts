export type Language = 'zh' | 'en';

export interface MovieQuestion {
  id: string;
  emojis: string;
  titleZh: string; // Chinese title
  titleEn: string; // English title (for reference/hint)
  acceptableAnswers: string[]; // List of valid answers (fuzzy match)
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface GameState {
  status: 'menu' | 'loading' | 'playing' | 'gameover' | 'error';
  questions: MovieQuestion[];
  currentQuestionIndex: number;
  score: number;
  username: string;
  globalTimeLeft: number; // Changed from local timer to global
  userAnswers: Record<string, { answer: string; correct: boolean; points: number; skipped: boolean }>;
  errorMessage?: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export enum GameActionType {
  START_GAME = 'START_GAME',
  LOAD_QUESTIONS_SUCCESS = 'LOAD_QUESTIONS_SUCCESS',
  LOAD_QUESTIONS_FAIL = 'LOAD_QUESTIONS_FAIL',
  ANSWER_QUESTION = 'ANSWER_QUESTION',
  NEXT_QUESTION = 'NEXT_QUESTION',
  TIME_TICK = 'TIME_TICK',
  RESTART = 'RESTART',
}

export const TOTAL_GAME_TIME = 300; // 5 Minutes in seconds
export const POINTS_EASY = 500;
export const POINTS_MEDIUM = 1000;
export const POINTS_HARD = 1500;
