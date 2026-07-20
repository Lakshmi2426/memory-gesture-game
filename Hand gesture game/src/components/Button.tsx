import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyle = 'px-6 py-3.5 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 focus:outline-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #6C3EF4, #8B5CF6 55%, #A855F7)',
      color: '#FFFFFF',
      boxShadow: '0 12px 28px rgba(108,62,244,0.28)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.82)',
      color: '#6C3EF4',
      border: '1.5px solid rgba(108,62,244,0.20)',
      boxShadow: '0 10px 24px rgba(15,23,42,0.06)',
    },
    danger: {
      background: 'linear-gradient(135deg, #DC2626, #EF4444)',
      color: '#FFFFFF',
      boxShadow: '0 12px 28px rgba(220,38,38,0.26)',
    }
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyle} ${widthStyle} ${className}`}
      style={variants[variant]}
      {...props}
    >
      {children}
    </button>
  );
};
