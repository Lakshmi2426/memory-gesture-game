import React from 'react';

interface ScoreCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  highlighted?: boolean;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  label,
  value,
  icon,
  highlighted = false
}) => {
  return (
    <div
      className="p-5 rounded-2xl flex items-center justify-between transition-all duration-300"
      style={
        highlighted
          ? {
              background: 'rgba(22,163,74,0.08)',
              border: '2px solid rgba(22,163,74,0.30)',
              boxShadow: '0 6px 18px rgba(22,163,74,0.08)',
            }
          : {
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(226,232,240,0.92)',
              boxShadow: '0 4px 12px rgba(15,23,42,0.06)',
            }
      }
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="p-2.5 rounded-xl"
            style={
              highlighted
                ? { background: '#16A34A', color: '#ffffff' }
                : { background: 'rgba(241,245,249,0.92)', color: '#64748B' }
            }
          >
            {icon}
          </div>
        )}
        <span
          className="text-sm font-semibold"
          style={{ color: '#64748B' }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-xl md:text-2xl font-bold"
        style={{ color: highlighted ? '#16A34A' : '#0F172A' }}
      >
        {value}
      </span>
    </div>
  );
};
