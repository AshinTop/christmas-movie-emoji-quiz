import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute top-4 right-4 z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-full p-1 flex border border-white/20 shadow-lg">
        <button
          onClick={() => setLanguage('zh')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            language === 'zh' 
              ? 'bg-christmas-red text-white shadow-md' 
              : 'text-christmas-snow hover:text-white'
          }`}
        >
          中文
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            language === 'en' 
              ? 'bg-christmas-red text-white shadow-md' 
              : 'text-christmas-snow hover:text-white'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};
