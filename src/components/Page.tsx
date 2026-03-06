import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  pageIndex: number;
  isFlipped: boolean;
  zIndex: number;
  onFlip: () => void;
}

export const Page = ({ frontContent, backContent, pageIndex, isFlipped, zIndex, onFlip }: PageProps) => {
  const duration = 1.0; // Slightly faster for snappier feel like the reference
  
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full cursor-pointer"
      style={{ 
        transformStyle: 'preserve-3d',
        transformOrigin: 'left center',
        willChange: 'transform',
      }}
      animate={{ 
        rotateY: isFlipped ? -180 : 0,
        z: isFlipped ? [0, 100, 0] : [0, 100, 0], // Higher lift for more dramatic flip
        rotateZ: isFlipped ? [0, -3, 0] : [0, 3, 0], // More pronounced wobble
      }}
      transition={{ 
        duration: duration, 
        ease: [0.4, 0, 0.2, 1], // Standard material ease for more natural motion
        times: [0, 0.5, 1]
      }}
      onClick={onFlip}
    >
      {/* Front Face */}
      <div 
        className="absolute inset-0 w-full h-full bg-white overflow-hidden"
        style={{ 
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="w-full h-full relative">
           {/* Paper texture */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-amber-50 mix-blend-multiply z-10"></div>
           
           {/* Spine Shadow (Static) */}
           <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/10 via-black/5 to-transparent pointer-events-none z-20"></div>
           
           {/* Content */}
           <div className="relative z-0 h-full">
             {frontContent}
           </div>
           
           {/* Curvature Simulation: Diagonal Gradient for Corner Curl Effect */}
           <motion.div 
             className="absolute inset-0 pointer-events-none z-40"
             style={{
               background: 'linear-gradient(-45deg, transparent 45%, rgba(255,255,255,0.3) 50%, rgba(0,0,0,0.1) 55%, transparent 60%)'
             }}
             initial={{ opacity: 0, x: '-100%' }}
             animate={{ 
                opacity: isFlipped ? [0, 1, 0] : [0, 1, 0],
                x: isFlipped ? ['0%', '120%'] : ['120%', '0%']
             }}
             transition={{ duration: duration, ease: "easeInOut" }}
           />
           
           {/* Dynamic Shadow for turning away */}
           <motion.div 
             className="absolute inset-0 bg-black/40 pointer-events-none z-50"
             initial={{ opacity: 0 }}
             animate={{ opacity: isFlipped ? 0.4 : 0 }}
             transition={{ duration: duration, ease: "easeInOut" }}
           />

           {/* Page Number (Odd) */}
           <div className="absolute bottom-4 right-6 text-xs font-serif text-gray-400 z-30">
             {pageIndex * 2 + 1}
           </div>
        </div>
      </div>

      {/* Back Face */}
      <div 
        className="absolute inset-0 w-full h-full bg-white overflow-hidden"
        style={{ 
          backfaceVisibility: 'hidden', 
          transform: 'rotateY(180deg)' 
        }}
      >
        <div className="w-full h-full relative">
           {/* Paper texture */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-amber-50 mix-blend-multiply z-10"></div>
           
           {/* Spine Shadow (Static - Right side) */}
           <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/10 via-black/5 to-transparent pointer-events-none z-20"></div>
           
           {/* Content */}
           <div className="relative z-0 h-full">
             {backContent}
           </div>

           {/* Curvature Simulation: Diagonal Gradient for Corner Curl Effect */}
           <motion.div 
             className="absolute inset-0 pointer-events-none z-40"
             style={{
               background: 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.3) 50%, rgba(0,0,0,0.1) 55%, transparent 60%)'
             }}
             initial={{ opacity: 0, x: '100%' }}
             animate={{ 
                opacity: isFlipped ? [0, 1, 0] : [0, 1, 0],
                x: isFlipped ? ['0%', '-120%'] : ['-120%', '0%']
             }}
             transition={{ duration: duration, ease: "easeInOut" }}
           />

           {/* Dynamic Shadow for landing */}
           <motion.div 
             className="absolute inset-0 bg-black/40 pointer-events-none z-50"
             initial={{ opacity: 0.4 }}
             animate={{ opacity: isFlipped ? 0 : 0.4 }}
             transition={{ duration: duration, ease: "easeInOut" }}
           />

           {/* Page Number (Even) */}
           <div className="absolute bottom-4 left-6 text-xs font-serif text-gray-400 z-30">
             {pageIndex * 2 + 2}
           </div>
        </div>
      </div>
    </motion.div>
  );
};
