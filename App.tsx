import React, { useState, useEffect } from 'react';
import { GameState, TOTAL_GAME_TIME } from './types';
import { fetchChristmasMovies } from './services/geminiService';
import { saveScore } from './services/leaderboardService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { GameScreen } from './components/GameScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { logEvent } from './services/analytics';

// Create a wrapper component for the main content to use the hook
const GameContent: React.FC = () => {
  const { t } = useLanguage();
  const [gameState, setGameState] = useState<GameState>({
    status: 'menu',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    username: '',
    globalTimeLeft: TOTAL_GAME_TIME,
    userAnswers: {},
  });

  // Helper to finalize game
  const finishGame = () => {
    setGameState(prev => {
      // Only save score if we aren't already gameover (prevents double save race conditions)
      if (prev.status !== 'gameover') {
        saveScore(prev.username, prev.score);
        logEvent('level_end', {
            level_name: 'Main Quiz',
            success: true,
            score: prev.score
        });
      }
      return { ...prev, status: 'gameover', globalTimeLeft: 0 };
    });
  };

  // Global Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState.status === 'playing' && gameState.globalTimeLeft > 0) {
      interval = setInterval(() => {
        setGameState(prev => {
          if (prev.globalTimeLeft <= 1) {
            // Time's up
            saveScore(prev.username, prev.score);
            logEvent('level_end', {
                level_name: 'Main Quiz',
                success: false, // Time ran out
                score: prev.score
            });
            return { ...prev, globalTimeLeft: 0, status: 'gameover' };
          }
          return { ...prev, globalTimeLeft: prev.globalTimeLeft - 1 };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameState.status, gameState.globalTimeLeft]);

  const startGame = async (username: string) => {
    setGameState(prev => ({ ...prev, status: 'loading', username }));
    logEvent('level_start', { level_name: 'Main Quiz' });
    
    try {
      const questions = await fetchChristmasMovies();
      setGameState(prev => ({
        ...prev,
        status: 'playing',
        questions,
        currentQuestionIndex: 0,
        score: 0,
        globalTimeLeft: TOTAL_GAME_TIME,
        userAnswers: {}
      }));
    } catch (error) {
      console.error("Failed to start game", error);
      alert("Failed to load questions.");
      setGameState(prev => ({ ...prev, status: 'menu' }));
    }
  };

  const handleAnswer = (correct: boolean, answer: string, skipped: boolean = false) => {
    setGameState(prev => {
      const currentQ = prev.questions[prev.currentQuestionIndex];
      
      // New Logic: 1 point per correct answer regardless of difficulty
      const points = correct ? 1 : 0;
      const newScore = prev.score + points;

      const newAnswers = {
        ...prev.userAnswers,
        [currentQ.id]: { answer, correct, points, skipped }
      };
      
      const isLastQuestion = prev.currentQuestionIndex >= prev.questions.length - 1;

      if (isLastQuestion) {
        // If run out of questions (unlikely with 100), end game
        saveScore(prev.username, newScore);
        logEvent('level_end', {
            level_name: 'Main Quiz',
            success: true,
            score: newScore
        });
        return {
          ...prev,
          score: newScore,
          userAnswers: newAnswers,
          status: 'gameover'
        };
      } else {
        return {
          ...prev,
          score: newScore,
          userAnswers: newAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        };
      }
    });
  };

  const handleSkip = () => {
    handleAnswer(false, "(Skipped)", true);
  };

  const handleRestart = () => {
    setGameState({
      status: 'menu',
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      username: '',
      globalTimeLeft: TOTAL_GAME_TIME,
      userAnswers: {},
    });
  };

  return (
    <>
      <LanguageSwitcher />
      <main className="relative z-10 w-full flex-auto flex flex-col">
        
        {gameState.status === 'menu' && (
          <WelcomeScreen onStart={startGame} />
        )}

        {gameState.status === 'loading' && (
          <LoadingScreen />
        )}

        {gameState.status === 'playing' && gameState.questions.length > 0 && (
          <GameScreen 
            question={gameState.questions[gameState.currentQuestionIndex]}
            questionNumber={gameState.currentQuestionIndex + 1}
            totalQuestions={gameState.questions.length} // Although technically redundant in endless, gives context
            score={gameState.score}
            globalTimeLeft={gameState.globalTimeLeft}
            onAnswer={(correct, ans) => handleAnswer(correct, ans, false)}
            onSkip={handleSkip}
            onEndGame={finishGame}
          />
        )}

        {gameState.status === 'gameover' && (
          <GameOverScreen 
            score={gameState.score}
            totalQuestions={Object.keys(gameState.userAnswers).length}
            questions={gameState.questions}
            userAnswers={gameState.userAnswers}
            onRestart={handleRestart}
            username={gameState.username}
          />
        )}
      </main>
      
      {/* Footer - Only show when NOT playing */}
      {gameState.status !== 'playing' && (
        <footer className="w-full text-center text-xs text-gray-600 z-10 py-4 relative bg-black/20 backdrop-blur-sm">
          &copy; {new Date().getFullYear()} Christmas Emoji Game | <span className="opacity-50">{t('footer')}</span>
        </footer>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-christmas-dark bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a2333] via-[#0B0F19] to-black text-white font-sans overflow-x-hidden selection:bg-christmas-red selection:text-white flex flex-col relative">
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0"></div>
        
        <GameContent />
      </div>
    </LanguageProvider>
  );
};

export default App;