import React from 'react';
import { motion } from 'motion/react';

export const BackgroundGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Primary Top Left Indigo Orb */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-600/15 via-blue-600/10 to-transparent blur-[120px]"
      />

      {/* Top Right Purple Orb */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-purple-600/15 via-pink-600/10 to-transparent blur-[130px]"
      />

      {/* Bottom Center Cyan Orb */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-transparent blur-[140px]"
      />

      {/* Subtle Noise / vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070913]/40 to-[#070913]" />
    </div>
  );
};
