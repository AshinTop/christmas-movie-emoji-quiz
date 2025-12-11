import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  // 设置按钮可见性的 state
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 监听滚动事件
    const handleScroll = () => {
      // 判断滚动距离
      if (window.scrollY > 100) {
        setIsVisible(true);  // 滚动超过100px时显示按钮
      } else {
        setIsVisible(false); // 滚动小于100px时隐藏按钮
      }
    };

    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);

    // 清理监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    isVisible && (  // 如果 isVisible 为 true，显示按钮
      <div
        className="fixed bottom-10 right-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          className="w-8 h-8 text-white rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    )
  );
};

export default ScrollToTopButton;
