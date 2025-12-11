import React, { useState, useEffect, useRef } from 'react';
import { MovieQuestion, TOTAL_GAME_TIME } from '../types';
import { Button } from './Button';
import confetti from 'canvas-confetti';
import { useLanguage } from '../contexts/LanguageContext';

interface GameScreenProps {
  question: MovieQuestion;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  globalTimeLeft: number;
  onAnswer: (correct: boolean, userAnswer: string) => void;
  onSkip: () => void;
  onEndGame: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  question,
  questionNumber,
  totalQuestions,
  score,
  globalTimeLeft,
  onAnswer,
  onSkip,
  onEndGame
}) => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'skipped' | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine title display based on language
  const mainTitle = language === 'zh' ? question.titleZh : question.titleEn;
  const subTitle = language === 'zh' ? question.titleEn : question.titleZh;

  // Reset state when question changes
  useEffect(() => {
    setInput('');
    setFeedback(null);
    if(inputRef.current && !showExitConfirm) inputRef.current.focus();
  }, [question.id, showExitConfirm]);

  const checkAnswer = () => {
    if (!input.trim()) return;

    // Normalize user input
    const normalize = (str: string) => str.toLowerCase().replace(/[\s\p{P}]/gu, '');
    const cleanInput = normalize(input);
    
    const isCorrect = question.acceptableAnswers.some(ans => normalize(ans) === cleanInput);

    if (isCorrect) {
      setFeedback('correct');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D42426', '#165B33', '#F8B229', '#ffffff']
      });
      // Delay slightly shorter for time attack flow
      setTimeout(() => {
        onAnswer(true, input);
      }, 1000);
    } else {
      setFeedback('wrong');
      // Show answer briefly then move on
      setTimeout(() => {
        onAnswer(false, input);
      }, 1500);
    }
  };

  const handleSkipAction = () => {
    setFeedback('skipped');
    setTimeout(() => {
      onSkip();
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkAnswer();
  };

  // Format Time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const timePercentage = (globalTimeLeft / TOTAL_GAME_TIME) * 100;
  let timerColor = 'bg-christmas-green';
  if (timePercentage < 30) timerColor = 'bg-christmas-gold';
  if (timePercentage < 10) timerColor = 'bg-christmas-red';

  return (
    <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center min-h-screen justify-start pt-16">
      
      {/* Unified Top Bar: Exit | Timer | Score */}
      <div className="w-full flex justify-between items-center mb-6 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
        

        {/* left: Timer */}
        <div className="flex flex-col items-left px-3">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">{t('timeLeft')}</span>
          <span className={`text-2xl md:text-3xl font-mono font-bold leading-none ${globalTimeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
             {formatTime(globalTimeLeft)}
          </span>
        </div>

        {/* Center: Score */}
        <div className="flex flex-col items-center px-3 flex-1">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">{t('score')}</span>
          <span className="text-2xl md:text-3xl font-black text-christmas-gold leading-none">{score}</span>
        </div>

        {/* Right: Exit Button */}
        <button 
          onClick={() => setShowExitConfirm(true)}
          className="text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1 text-xs md:text-sm font-bold px-3 py-2 rounded-xl transition-colors"
        >
          <span className="text-lg leading-none">✖</span> <span className="hidden sm:inline">{t('quitGame')}</span>
        </button>
      </div>

      {/* Main Game Card */}
      <div className="w-full bg-white text-gray-900 rounded-3xl shadow-2xl overflow-hidden relative">
        
        {/* Global Timer Bar (Optional visual) */}
        <div className="h-2 w-full bg-gray-200">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${timerColor}`} 
            style={{ width: `${timePercentage}%` }}
          />
        </div>

        <div className="p-6 md:p-10 text-center space-y-6">
          
          {/* Difficulty Badge */}
          <div className="absolute top-4 right-4">
             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
               ${question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                 question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                 'bg-red-100 text-red-800'}`}>
               {question.difficulty}
             </span>
             <div className="text-[10px] text-gray-400 mt-1 uppercase text-right">#{questionNumber}</div>
          </div>

          {/* Emojis */}
          <div className="space-y-2 py-4">
            <h2 className="text-gray-400 text-sm uppercase tracking-widest">{t('guessMovie')}</h2>
            <div className="text-6xl md:text-8xl py-4 animate-wiggle select-none" role="img" aria-label="Emoji clues">
              {question.emojis}
            </div>
          </div>

          {/* Feedback Overlay / Input */}
          <div className="relative h-32 flex items-center justify-center">
            {feedback ? (
              <div className="flex flex-col items-center justify-center animate-fade-in w-full">
                 <div className={`text-3xl font-black transform transition-all duration-300 mb-2
                  ${feedback === 'correct' ? 'text-green-600' : 
                    feedback === 'skipped' ? 'text-gray-500' : 'text-red-600'}`}>
                  {feedback === 'correct' && t('correct')}
                  {feedback === 'wrong' && t('wrong')}
                  {feedback === 'skipped' && t('skipped')}
                </div>
                {feedback !== 'correct' && feedback !== 'skipped' && (
                   <div className="text-base font-normal text-gray-500 w-full text-center">
                     {t('correctAnswer')} <span className="font-bold text-gray-800">{mainTitle}</span>
                   </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('inputPlaceholder')}
                  className="w-full p-4 text-center text-xl border-b-2 border-gray-300 focus:border-christmas-red focus:outline-none bg-transparent transition-colors placeholder-gray-400 text-gray-800"
                  autoComplete="off"
                  disabled={!!feedback || showExitConfirm}
                />
              </form>
            )}
          </div>
          
          <div className="pt-2 flex gap-3">
             <Button 
                type="button"
                variant="outline"
                onClick={handleSkipAction}
                disabled={!!feedback || showExitConfirm}
                className="w-1/3"
              >
                {t('skip')} ⏭️
             </Button>
             <Button 
                onClick={checkAnswer} 
                disabled={!!feedback || !input.trim() || showExitConfirm} 
                className="w-2/3"
              >
               {t('submit')}
             </Button>
          </div>

        </div>
      </div>

      {/* Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-gray-900 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl transform scale-100 transition-transform">
             <h3 className="text-xl font-black text-christmas-red mb-2">{t('quitConfirmTitle')}</h3>
             <p className="text-gray-600 mb-6">{t('quitConfirmMessage')}</p>
             <div className="flex gap-4">
                <button 
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button 
                   onClick={() => {
                     setShowExitConfirm(false);
                     onEndGame();
                   }}
                   className="flex-1 py-3 px-4 rounded-xl font-bold bg-christmas-red text-white hover:bg-red-700 transition-colors shadow-lg"
                >
                   {t('confirm')}
                </button>
             </div>
          </div>
        </div>
      )}
      
    </div>
  );
};
