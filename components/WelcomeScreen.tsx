import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalLeaderboard, clearLeaderboard } from '../services/leaderboardService';
import { LeaderboardEntry } from '../types';
import html2canvas from 'html2canvas';
import { logEvent } from '../services/analytics';
import ScrollToTopButton from './ScrollToTopButton'

interface WelcomeScreenProps {
  onStart: (username: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const { t, language } = useLanguage();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Ref for capturing the leaderboard
  const leaderboardRef = useRef<HTMLDivElement>(null);

  // Initialize state from localStorage if available
  const [username, setUsername] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('christmas_quiz_username') || '';
    }
    return '';
  });

  useEffect(() => {
    if (showLeaderboard) {
      loadData();
    }
  }, [showLeaderboard]);

  const loadData = () => {
    setLeaderboardData(getLocalLeaderboard());
  };

  const handleStart = () => {
    if (!username.trim()) return;
    localStorage.setItem('christmas_quiz_username', username.trim());
    onStart(username.trim());
  };

  const handleClearHistory = () => {
    clearLeaderboard();
    loadData();
    setShowClearConfirm(false);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', {
        month: 'short', day: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = t('shareText');
  const leaderboardShareText = t('shareLeaderboardText');
  const trendingTags = t('trendsTags') as unknown as string[]; // Cast because t() return type is string

  const handleDownloadImage = async () => {
    if (!leaderboardRef.current || isGenerating) return;
    setIsGenerating(true);
    logEvent('file_download', { file_name: 'leaderboard.png', file_extension: 'png' });

    try {
      const canvas = await html2canvas(leaderboardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff', // Force white background for the capture
        useCORS: true,
        logging: false
      });

      const link = document.createElement('a');
      link.download = `Christmas-Quiz-Leaderboard.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate leaderboard image', error);
      alert('Failed to save image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareLeaderboard = async () => {
    logEvent('share', { method: 'native', content_type: 'leaderboard' });
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('localLeaderboard'),
          text: leaderboardShareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${leaderboardShareText} ${shareUrl}`);
        alert('Copied to clipboard!');
      } catch (err) {
        // Fallback
      }
    }
  };

  const handleSocialClick = (platform: string) => {
    logEvent('share', { method: platform, content_type: 'app_link' });
  };

  // Helper to render Markdown-like bold text
  const renderRichText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={index} className="text-christmas-gold font-bold">{part.slice(2, -2)}</span>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section - Full Height */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-8 animate-fade-in pt-20 w-full max-w-4xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green drop-shadow-sm filter whitespace-pre-line leading-tight">
            {t('title')}
          </h1>
          <p className="text-christmas-snow text-lg md:text-xl max-w-md mx-auto opacity-90 font-medium">
            {t('subtitle')}
          </p>
        </div>

        <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="text-6xl mb-4 animate-bounce-slow">🎅 🎬 🍿</div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-christmas-gold text-sm font-bold mb-2 uppercase tracking-wider">
                {t('playerName')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('enterName')}
                className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-christmas-gold text-center font-bold text-lg"
                maxLength={12}
              />
              <p className="text-xs text-gray-400 mt-2 min-h-[1.5em]">
                {username.trim() ? `${t('hello')}, ${username}!` : t('leaveBlank')}
              </p>
            </div>
            
            <Button 
              onClick={handleStart} 
              fullWidth 
              className="text-xl py-4 shadow-xl"
              disabled={!username.trim()}
            >
              {t('startGame')}
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button 
            onClick={() => setShowLeaderboard(true)}
            className="w-full py-2 text-christmas-gold font-bold hover:text-white transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-widest border-b border-transparent hover:border-christmas-gold"
          >
            🏆 {t('viewLeaderboard')}
          </button>
          
          {/* Social Share Icons */}
          <div className="flex justify-center gap-4 mt-2">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('twitter')}
              className="p-3 bg-black/40 rounded-full hover:bg-[#1DA1F2] transition-colors text-white"
              aria-label="Share on Twitter"
            >
              <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => handleSocialClick('facebook')}
              className="p-3 bg-black/40 rounded-full hover:bg-[#4267B2] transition-colors text-white"
              aria-label="Share on Facebook"
            >
              <svg fill="currentColor" width="20" height="20" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a 
              href={`mailto:?subject=${encodeURIComponent(t('title'))}&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
              onClick={() => handleSocialClick('email')}
              className="p-3 bg-black/40 rounded-full hover:bg-green-600 transition-colors text-white"
              aria-label="Share via Email"
            >
              <svg fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </a>
          </div>
        </div>

        // <div className="absolute bottom-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
        //    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
        // </div>
      </div>

      <ScrollToTopButton/>

      {/* Info Sections Container */}
      <div className="w-full bg-gradient-to-b from-transparent to-christmas-dark/90 pb-20">
        
        {/* About Section */}
        <section className="py-16 px-6 max-w-4xl mx-auto text-center border-t border-white/5">
          <div className="inline-block p-3 rounded-full bg-red-900/30 mb-4 text-3xl">🎁</div>
          <h2 className="text-3xl font-black text-christmas-gold mb-6">{t('aboutTitle')}</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {renderRichText(t('aboutText'))}
          </p>
        </section>

        {/* Features Grid */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12">{t('featuresTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎬', title: t('feature1Title'), desc: t('feature1Desc') },
              { icon: '⚡', title: t('feature2Title'), desc: t('feature2Desc') },
              { icon: '🧠', title: t('feature3Title'), desc: t('feature3Desc') },
            ].map((f, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-christmas-red mb-2">{f.title}</h3>
                <p className="text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Keywords Cloud */}
        {Array.isArray(trendingTags) && trendingTags.length > 0 && (
            <section className="py-12 px-6 max-w-5xl mx-auto">
                 <h2 className="text-2xl font-black text-christmas-green text-center mb-8 uppercase tracking-widest">{t('trendsTitle')}</h2>
                 <div className="flex flex-wrap justify-center gap-3">
                    {trendingTags.map((tag, idx) => (
                        <span 
                           key={idx} 
                           className={`px-4 py-2 rounded-full text-sm font-bold border border-white/10 transition-all hover:scale-110 cursor-default
                           ${idx % 3 === 0 ? 'bg-red-900/40 text-red-200' : idx % 3 === 1 ? 'bg-green-900/40 text-green-200' : 'bg-yellow-900/40 text-yellow-200'}`}
                        >
                            #{tag}
                        </span>
                    ))}
                 </div>
            </section>
        )}

        {/* How to Play */}
        <section className="py-16 px-6 bg-white/5 w-full">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-3xl font-black text-christmas-green text-center mb-12">{t('howToPlayTitle')}</h2>
             <div className="grid md:grid-cols-4 gap-6">
               {[t('step1'), t('step2'), t('step3'), t('step4')].map((step, i) => (
                 <div key={i} className="relative p-6 bg-black/20 rounded-2xl border border-white/5">
                   <div className="absolute -top-4 -left-4 w-10 h-10 bg-christmas-gold rounded-full flex items-center justify-center text-black font-black shadow-lg">
                     {i + 1}
                   </div>
                   <p className="text-gray-200 mt-2 font-medium">{step}</p>
                 </div>
               ))}
             </div>
           </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">{t('faqTitle')}</h2>
          <div className="space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-christmas-red mb-2">{t('faq1Q')}</h3>
              <p className="text-gray-400">{t('faq1A')}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h3 className="text-lg font-bold text-christmas-red mb-2">{t('faq2Q')}</h3>
              <p className="text-gray-400">{t('faq2A')}</p>
            </div>
          </div>
        </section>

      </div>


      {/* Leaderboard Modal */}
      {showLeaderboard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-gray-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Capture Area Ref */}
            <div ref={leaderboardRef} className="bg-white flex-1 flex flex-col overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-christmas-green to-green-800 text-white flex justify-between items-center shrink-0">
                  <h2 className="text-2xl font-black flex items-center gap-2">🏆 {t('leaderboard')}</h2>
                  
                  {/* Controls: Ignored during screenshot capture */}
                  <div className="flex items-center gap-2" data-html2canvas-ignore="true">
                     <button 
                       onClick={() => setShowClearConfirm(true)}
                       className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-red-600 transition-colors text-sm"
                       title={t('clearHistory')}
                     >
                       🗑️
                     </button>
                     <button 
                       onClick={() => setShowLeaderboard(false)}
                       className="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-white/30 transition-colors text-lg font-bold leading-none pb-1"
                       title={t('close')}
                     >
                       &times;
                     </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-0 bg-gray-50 min-h-[300px]">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 sticky top-0 shadow-sm">
                      <tr className="text-xs text-gray-500 uppercase">
                        <th className="py-2 pl-4">{t('rank')}</th>
                        <th className="py-2">{t('player')}</th>
                        <th className="py-2 text-right pr-4">{t('score')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-12 text-center text-gray-400">
                            {t('noData')}
                          </td>
                        </tr>
                      ) : (
                        leaderboardData.map((entry, index) => (
                          <tr key={index} className="border-b border-gray-200 last:border-0 hover:bg-white transition-colors">
                            <td className="py-3 pl-4 font-mono text-gray-500 w-12">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                            </td>
                            <td className="py-3 font-bold text-gray-800">
                              {entry.name}
                              <div className="text-[10px] text-gray-400 font-normal">{formatDate(entry.date)}</div>
                            </td>
                            <td className="py-3 text-right pr-4 font-black text-christmas-red">
                              {entry.score}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Watermark only for image */}
                <div className="py-2 text-center text-[10px] text-gray-400 border-t border-gray-100 bg-white">
                   Christmas Movie Emoji Quiz • Local Legends
                </div>
            </div>

            {/* Action Buttons (Footer) */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 shrink-0">
               <div className="flex gap-2">
                  <button 
                    onClick={handleDownloadImage}
                    disabled={isGenerating}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition-colors text-sm shadow-sm"
                  >
                      {isGenerating ? '⏳' : '📸'} {t('saveImage')}
                  </button>
                  <button 
                    onClick={handleShareLeaderboard}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-3 bg-[#1DA1F2] text-white rounded-xl font-bold hover:bg-blue-500 transition-colors text-sm shadow-sm"
                  >
                      📤 {t('shareResult')}
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white text-gray-900 rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl">
             <h3 className="text-xl font-black text-christmas-red mb-2">{t('clearConfirmTitle')}</h3>
             <p className="text-gray-600 mb-6 text-sm">{t('clearConfirmMessage')}</p>
             <div className="flex gap-3">
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {t('cancel')}
                </button>
                <button 
                   onClick={handleClearHistory}
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
