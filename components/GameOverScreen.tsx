import React, { useEffect, useState, useRef } from 'react';
import { Button } from './Button';
import { MovieQuestion, LeaderboardEntry } from '../types';
import { getLocalLeaderboard } from '../services/leaderboardService';
import { useLanguage } from '../contexts/LanguageContext';
import html2canvas from 'html2canvas';

interface GameOverScreenProps {
  score: number;
  totalQuestions: number;
  questions: MovieQuestion[];
  userAnswers: Record<string, { answer: string; correct: boolean; skipped?: boolean }>;
  onRestart: () => void;
  username: string;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onRestart,
  username
}) => {
  const { t } = useLanguage();
  const [localRank, setLocalRank] = useState<number | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Ref for the card we want to screenshot
  const resultCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch fresh data
    const data = getLocalLeaderboard();
    setLeaderboard(data);

    // Find rank based on the high score list
    const userIndex = data.findIndex(e => e.name === username);
    
    if (userIndex !== -1) {
        setLocalRank(userIndex + 1);
        
        // Check if the current game score matches the stored high score
        if (data[userIndex].score === score && score > 0) {
            setIsNewRecord(true);
        }
    }
  }, [score, username]);

  let message = "";
  if (score >= 30) message = t('perfect');
  else if (score >= 20) message = t('superFan');
  else if (score >= 10) message = t('goodJob');
  else message = t('tryAgain');

  const shareText = t('shareResultText').replace('{score}', score.toString());
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Handle Download Image
  const handleDownloadImage = async () => {
    if (!resultCardRef.current || isGenerating) return;
    setIsGenerating(true);

    try {
      // Use html2canvas to capture the element
      const canvas = await html2canvas(resultCardRef.current, {
        scale: 2, // Retina quality
        backgroundColor: null, // Allow transparency (though we force a background in css)
        useCORS: true,
        logging: false
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `Christmas-Emoji-Quiz-${username}-${score}pts.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image', error);
      alert('Failed to save image. Please screenshot instead!');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Native Share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('title'),
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback: Copy to clipboard or just alert
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Copied to clipboard!');
      } catch (err) {
        // Fallback handled by individual buttons
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 py-8 animate-fade-in pt-16">
      <div className="bg-white/95 backdrop-blur-md text-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* === CAPTURE AREA START === */}
        {/* We use this ref to take the screenshot. It includes header and basic stats. */}
        <div ref={resultCardRef} className="bg-white relative">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-christmas-red to-red-900 p-8 text-white text-center relative overflow-hidden">
             {/* Watermark for screenshot only (visible in CSS if we added specific print styles, but here we just render it) */}
             <div className="absolute bottom-2 right-2 text-[10px] opacity-40 font-mono hidden">Christmas Emoji Quiz</div>

            {isNewRecord && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-red-900 text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg z-10">
                {t('newRecord')}
              </div>
            )}
            
            <h2 className="text-2xl font-bold opacity-90 mb-1 drop-shadow-sm">{t('gameOver')}</h2>
            <h3 className="text-3xl font-black mb-6 tracking-tight drop-shadow-md">{message}</h3>
            
            <div className="flex flex-col items-center justify-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10 mx-auto max-w-[200px]">
               <span className="text-xs uppercase tracking-wider opacity-90">{t('finalScore')}</span>
               <span className="text-7xl font-black text-christmas-gold drop-shadow-lg leading-none my-2">{score}</span>
               <span className="text-sm font-bold opacity-90">{username}</span>
            </div>
          </div>

          {/* Stats Card */}
          <div className="p-6 bg-white border-b border-gray-100">
              <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center flex items-center justify-between px-8 shadow-sm">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-blue-700 font-bold uppercase tracking-wide mb-1">{t('bestRank')}</span>
                    <span className="text-4xl font-black text-blue-800">
                        {localRank ? `#${localRank}` : '-'}
                    </span>
                  </div>
                  <div className="h-10 w-px bg-blue-200"></div>
                  <div className="flex flex-col items-center">
                     <span className="text-xs text-blue-700 font-bold uppercase tracking-wide mb-1">{t('localLeaderboard')}</span>
                     <span className="text-sm font-bold text-blue-800 mt-2">Top 5</span>
                  </div>
              </div>
          </div>

           {/* Mini Leaderboard Preview (Below fold of sharing) */}
        <div className="px-6 py-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">{t('localLeaderboard')}</h4>
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                {leaderboard.length === 0 ? (
                    <div className="p-4 text-center text-xs text-gray-400">{t('noData')}</div>
                ) : (
                    leaderboard.slice(0, 5).map((entry, idx) => (
                        <div 
                            key={idx} 
                            className={`flex justify-between items-center p-3 text-sm border-b border-gray-100 last:border-0 
                            ${(entry.name === username) ? 'bg-yellow-50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-5 font-mono text-gray-400 font-bold">{idx + 1}</span>
                                <span className={`font-bold ${(entry.name === username) ? 'text-christmas-red' : 'text-gray-700'}`}>
                                    {entry.name}
                                </span>
                            </div>
                            <span className="font-bold text-gray-900">{entry.score}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
        </div>
        {/* === CAPTURE AREA END === */}


        {/* Share & Action Buttons (Not Captured) */}
        <div className="px-6 py-4 grid grid-cols-2 gap-3 bg-gray-50 border-b border-gray-100">
             <button 
               onClick={handleDownloadImage}
               disabled={isGenerating}
               className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg active:scale-95 transform duration-200 text-sm"
             >
                {isGenerating ? (
                  <span className="animate-spin text-lg">⏳</span>
                ) : (
                  <span className="text-lg">📸</span>
                )}
                {isGenerating ? t('generating') : t('saveImage')}
             </button>

             <button 
               onClick={handleShare}
               className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1DA1F2] text-white rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg active:scale-95 transform duration-200 text-sm"
             >
                <span className="text-lg">📤</span> {t('shareResult')}
             </button>

             {/* Social Fallbacks (Mini) */}
             <div className="col-span-2 flex justify-center gap-4 mt-1">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                >
                  <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#4267B2] transition-colors"
                >
                  <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
             </div>
        </div>

       

        <div className="p-6 mt-0 space-y-3 pt-0">
          <Button onClick={onRestart} fullWidth className="text-lg py-4 shadow-xl">
            {t('playAgain')} 🔄
          </Button>
          
          <button 
            onClick={onRestart} 
            className="w-full py-3 text-gray-400 text-sm font-bold hover:text-gray-600 transition-colors"
          >
            {t('quitGame')}
          </button>
        </div>
      </div>
    </div>
  );
};
