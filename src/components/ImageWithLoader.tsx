import React, { useState } from 'react';
import { motion, MotionProps } from 'motion/react';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  whileHover?: MotionProps['whileHover'];
  transition?: MotionProps['transition'];
}

export const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "w-full h-full", 
  whileHover,
  transition
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${containerClassName}`}>
      {/* Loading Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-200">
          <div className="w-full h-full bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-6 h-6 border-2 border-stone-300 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Actual Image */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        whileHover={whileHover}
        transition={transition}
      />
    </div>
  );
};
