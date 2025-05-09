/**
 * SoftSell - Software License Management Platform
 * Copyright © Arkaprabha Banerjee 2025. All rights reserved.
 */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IconLoader from './IconLoader';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minimumLoadingTime?: number;
}

const LoadingScreen = ({ 
  onLoadingComplete, 
  minimumLoadingTime = 3000 // 3 seconds minimum loading time
}: LoadingScreenProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time
    const timer = setTimeout(() => {
      setLoading(false);
      onLoadingComplete();
    }, minimumLoadingTime);

    return () => clearTimeout(timer);
  }, [minimumLoadingTime, onLoadingComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50"
          style={{
            background: 'linear-gradient(to bottom, #0c1829, #071228)'
          }}
        >
          {/* Dark blue overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c2548]/30 to-transparent" />
          
          {/* Grid effect */}
          <div 
            className="absolute inset-0 opacity-10 mix-blend-color-dodge"
            style={{
              backgroundImage: 'linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Animated gradient orb */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-radial from-blue-500/20 to-transparent blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
          
          <div className="relative z-10">
            <IconLoader 
              size={60} 
              showText={true} 
              speed="ultra-fast" 
              iconStyle="zoom" 
              background="circle"
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-lg font-medium text-blue-100 text-center"
            >
              Loading amazing experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
