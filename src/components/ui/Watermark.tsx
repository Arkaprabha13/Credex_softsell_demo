// Copyright © Arkaprabha Banerjee 2025. All rights reserved.
import React, { useEffect, useState } from 'react';

interface WatermarkProps {
  opacity?: number;
  pattern?: 'diagonal' | 'grid' | 'single';
  size?: 'small' | 'medium' | 'large';
}

const Watermark: React.FC<WatermarkProps> = ({ 
  opacity = 0.025, 
  pattern = 'diagonal',
  size = 'medium' 
}) => {
  const [year, setYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    // Update year if needed
    setYear(new Date().getFullYear());
  }, []);

  // Font size based on prop
  const getFontSize = () => {
    switch(size) {
      case 'small': return 'text-[4vh]';
      case 'large': return 'text-[12vh]';
      default: return 'text-[8vh]';
    }
  };

  // Generate watermark pattern
  const renderWatermarkPattern = () => {
    const text = `© Arkaprabha Banerjee ${year}`;
    
    switch(pattern) {
      case 'grid':
        return (
          <div className="grid grid-cols-3 gap-x-32 gap-y-48 absolute inset-0">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i} 
                className={`${getFontSize()} font-thin tracking-[0.5vw] whitespace-nowrap text-black dark:text-white`}
                style={{ fontFamily: "monospace" }}
              >
                {text}
              </div>
            ))}
          </div>
        );
      case 'single':
        return (
          <div 
            className={`${getFontSize()} font-thin tracking-[0.5vw] text-black dark:text-white`}
            style={{ fontFamily: "monospace" }}
          >
            <span className="whitespace-nowrap">{text}</span>
          </div>
        );
      default: // diagonal
        return (
          <div 
            className={`rotate-[-45deg] ${getFontSize()} font-thin tracking-[0.5vw] text-black dark:text-white`}
            style={{ fontFamily: "monospace" }}
          >
            <span className="whitespace-nowrap">{text}</span>
          </div>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-[999] w-full h-full overflow-hidden"
      aria-hidden="true"
      style={{ opacity }}
    >
      {renderWatermarkPattern()}
    </div>
  );
};

export default Watermark;
