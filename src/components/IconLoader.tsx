/**
 * SoftSell - Software License Management Platform
 * Copyright © Arkaprabha Banerjee 2025. All rights reserved.
 */
import { useState, useEffect, useMemo } from 'react';
import { 
  Computer,
  File,
  DollarSign,
  Cloud,
  Lock,
  RefreshCcw,
  Check,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SoftwareIcon = {
  icon: React.ReactNode;
  color: string;
  name: string;
}

interface IconLoaderProps {
  className?: string;
  size?: number;
  showText?: boolean;
  speed?: 'normal' | 'fast' | 'ultra-fast';
  iconStyle?: 'fade' | 'slide' | 'zoom' | 'rotate';
  background?: 'none' | 'circle' | 'square';
}

const IconLoader = ({ 
  className, 
  size = 44, 
  showText = true, 
  speed = 'ultra-fast',
  iconStyle = 'fade',
  background = 'none'
}: IconLoaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const softwareIcons: SoftwareIcon[] = useMemo(() => [
    {
      icon: <Computer size={size} strokeWidth={2} />,
      color: '#38bdf8', // Blue
      name: 'Software'
    },
    {
      icon: <File size={size} strokeWidth={2} />,
      color: '#22c55e', // Green
      name: 'License'
    },
    {
      icon: <DollarSign size={size} strokeWidth={2} />,
      color: '#eab308', // Yellow
      name: 'Payment'
    },
    {
      icon: <Cloud size={size} strokeWidth={2} />,
      color: '#8b5cf6', // Purple
      name: 'Cloud'
    },
    {
      icon: <Lock size={size} strokeWidth={2} />,
      color: '#ef4444', // Red
      name: 'Secure'
    },
    {
      icon: <RefreshCcw size={size} strokeWidth={2} />,
      color: '#ec4899', // Pink
      name: 'Sync'
    },
    {
      icon: <Download size={size} strokeWidth={2} />,
      color: '#0ea5e9', // Sky blue
      name: 'Download'
    },
    {
      icon: <Check size={size} strokeWidth={2} />,
      color: '#14b8a6', // Teal
      name: 'Complete'
    }
  ], [size]);

  useEffect(() => {
    // Animation speed in milliseconds
    const animationSpeed = {
      'normal': 750, // 0.75 seconds
      'fast': 500,   // 0.5 seconds
      'ultra-fast': 300 // 0.3 seconds
    };
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % softwareIcons.length);
    }, animationSpeed[speed]);

    return () => clearInterval(interval);
  }, [softwareIcons.length, speed]);

  const currentIcon = softwareIcons[currentIndex];
  
  // Animation variants based on style choice
  const getAnimationProps = () => {
    switch(iconStyle) {
      case 'slide':
        return {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.15 }
        };
      case 'zoom':
        return {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.5 },
          transition: { duration: 0.15 }
        };
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -45, scale: 0.7 },
          animate: { opacity: 1, rotate: 0, scale: 1 },
          exit: { opacity: 0, rotate: 45, scale: 0.7 },
          transition: { duration: 0.15 }
        };
      case 'fade':
      default:
        return {
          initial: { opacity: 0, y: 5 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -5 },
          transition: { duration: 0.15 }
        };
    }
  };
  
  const animationProps = getAnimationProps();

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div 
        className={`relative flex items-center justify-center ${
          background === 'circle' 
            ? 'rounded-full' 
            : background === 'square' 
              ? 'rounded-lg' 
              : ''
        }`}
        style={{ 
          height: `${size + 20}px`, 
          width: `${size + 20}px`,
          backgroundColor: background !== 'none' 
            ? 'rgba(14, 165, 233, 0.15)' // Light blue background for icons
            : 'transparent',
          boxShadow: background !== 'none' 
            ? '0 4px 12px -2px rgba(14, 165, 233, 0.3)' // Blue shadow glow
            : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            {...animationProps}
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: currentIcon.color }}
          >
            {currentIcon.icon}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {showText && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${currentIndex}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-medium mt-2"
            style={{ color: currentIcon.color }}
          >
            {currentIcon.name}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default IconLoader;
