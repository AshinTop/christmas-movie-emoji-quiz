import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variants = {
    primary: "bg-gradient-to-r from-christmas-red to-red-700 text-white shadow-lg shadow-red-900/50 border border-red-600",
    secondary: "bg-christmas-green text-white shadow-lg shadow-green-900/50 border border-green-600 hover:bg-green-600",
    outline: "bg-transparent border-2 border-christmas-gold text-christmas-gold hover:bg-christmas-gold hover:text-christmas-dark"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};