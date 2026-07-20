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
      className={`p-5 rounded-2xl flex items-center justify-between transition-all duration-300 ${
        highlighted
          ? 'bg-brand-cream border-2 border-brand-green/30 shadow-md shadow-brand-green/5'
          : 'bg-white border border-gray-100 shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={`p-2.5 rounded-xl ${
              highlighted ? 'bg-brand-green text-white' : 'bg-gray-50 text-gray-500'
            }`}
          >
            {icon}
          </div>
        )}
        <span className="text-sm font-semibold text-gray-600">{label}</span>
      </div>
      <span
        className={`text-xl md:text-2xl font-bold ${
          highlighted ? 'text-brand-green' : 'text-brand-dark'
        }`}
      >
        {value}
      </span>
    </div>
  );
};
