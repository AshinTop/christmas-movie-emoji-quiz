import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const LoadingScreen: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <div className="relative">
        <div className="w-24 h-24 border-8 border-christmas-snow/20 border-t-christmas-red rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
          🎄
        </div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">{t('loadingTitle')}</h2>
        <p className="text-christmas-snow/70">{t('loadingSub')}</p>
      </div>
    </div>
  );
};