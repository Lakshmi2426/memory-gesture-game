import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="space-y-2">
      {/* Track */}
      <div className="w-full h-3 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, #7C3AED, #00C853)',
            boxShadow: '0 0 10px rgba(0,200,83,0.5)',
          }}
        />
      </div>
      
      {/* Step dots */}
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: total }).map((_, index) => {
          const isCompleted = index < current;
          const isCurrent = index === current;

          return (
            <div
              key={index}
              className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300"
              style={{
                background: isCompleted
                  ? 'rgba(0,200,83,0.4)'
                  : isCurrent
                    ? 'rgba(124,58,237,0.5)'
                    : 'rgba(255,255,255,0.06)',
                border: isCompleted
                  ? '1.5px solid rgba(0,200,83,0.6)'
                  : isCurrent
                    ? '1.5px solid rgba(124,58,237,0.7)'
                    : '1.5px solid rgba(255,255,255,0.1)',
                color: isCompleted ? '#00C853' : isCurrent ? '#A78BFA' : '#64748B',
                transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              {isCompleted ? '✓' : index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};
