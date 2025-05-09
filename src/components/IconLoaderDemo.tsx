"use client";

import React from 'react';
import IconLoader from './IconLoader';
import { motion } from 'framer-motion';

export default function IconLoaderDemo() {
  return (
    <div className="flex flex-col items-center justify-center py-20 h-auto dark:bg-black bg-white relative w-full">
      <div className="max-w-7xl mx-auto w-full relative overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Ultra-Fast Icon Loader
          </h2>
          <p className="text-center text-base md:text-lg font-normal text-neutral-700 dark:text-neutral-200 max-w-xl mx-auto">
            Experience our rapid icon transitions that showcase our software services.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {/* Regular fade animation */}
          <div className="flex flex-col items-center">
            <IconLoader 
              showText={true} 
              size={48} 
              speed="ultra-fast" 
              iconStyle="fade"
              background="none"
            />
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Fade Animation
            </p>
          </div>
          
          {/* Slide animation */}
          <div className="flex flex-col items-center">
            <IconLoader 
              showText={true} 
              size={48} 
              speed="ultra-fast" 
              iconStyle="slide"
              background="none"
            />
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Slide Animation
            </p>
          </div>
          
          {/* Zoom animation */}
          <div className="flex flex-col items-center">
            <IconLoader 
              showText={true} 
              size={48} 
              speed="ultra-fast" 
              iconStyle="zoom"
              background="circle"
            />
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Zoom Animation + Circle
            </p>
          </div>
          
          {/* Rotate animation */}
          <div className="flex flex-col items-center">
            <IconLoader 
              showText={true} 
              size={48} 
              speed="ultra-fast" 
              iconStyle="rotate"
              background="square"
            />
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              Rotate Animation + Square
            </p>
          </div>
        </div>
        
        <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
          <h3 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">
            Speed Comparison
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <IconLoader 
                showText={false} 
                size={40} 
                speed="normal" 
                iconStyle="fade"
              />
              <p className="mt-4 text-sm font-medium text-center text-gray-800 dark:text-gray-200">
                Normal Speed (0.75s)
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <IconLoader 
                showText={false} 
                size={40} 
                speed="fast" 
                iconStyle="fade"
              />
              <p className="mt-4 text-sm font-medium text-center text-gray-800 dark:text-gray-200">
                Fast Speed (0.5s)
              </p>
            </div>
            
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <IconLoader 
                showText={false} 
                size={40} 
                speed="ultra-fast" 
                iconStyle="fade"
              />
              <p className="mt-4 text-sm font-medium text-center text-gray-800 dark:text-gray-200">
                Ultra-Fast Speed (0.3s)
              </p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mt-2">
                Recommended
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
