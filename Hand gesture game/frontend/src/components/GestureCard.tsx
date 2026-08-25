import React from 'react';

interface GestureCardProps {
  emoji: string;
  name: string;
  description: string;
  isActive?: boolean;
}

export const GestureCard: React.FC<GestureCardProps> = ({
  emoji,
  name,
  description,
  isActive = false
}) => {
  return (
    <div
      className={`p-4 rounded-3xl flex items-center gap-4 transition-all duration-300 ${isActive ? 'scale-[1.02]' : 'hover:scale-[1.01]'}`}
      style={{
        background: isActive
          ? 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(237,233,254,0.92))'
          : 'rgba(255,255,255,0.80)',
        border: isActive ? '1.5px solid rgba(108,62,244,0.25)' : '1px solid rgba(226,232,240,0.9)',
        boxShadow: isActive
          ? '0 18px 40px rgba(108,62,244,0.10)'
          : '0 10px 26px rgba(15,23,42,0.06)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-300 ${isActive ? 'animate-celebrate' : ''}`}
        style={{
          background: isActive ? 'rgba(108,62,244,0.10)' : 'rgba(241,245,249,0.92)',
          boxShadow: isActive ? 'inset 0 0 0 1px rgba(108,62,244,0.18)' : 'none',
        }}
      >
        {emoji}
      </div>
      <div className="text-left">
        <h4 className="font-extrabold text-slate-800 text-base m-0 leading-tight">
          {name}
        </h4>
        <p className="text-xs font-medium mt-1" style={{ color: '#64748B' }}>
          {description}
        </p>
      </div>
    </div>
  );
};
