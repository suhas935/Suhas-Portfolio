import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        // Smooth random increment
        const next = prev + Math.floor(Math.random() * 18) + 10;
        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070913]"
        >
          {/* Animated Background Mesh Glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Logo Hexagon / Shield with SG Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative w-28 h-28 mb-8 flex items-center justify-center"
            >
              {/* Outer rotating accent ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-2xl border-2 border-dashed border-indigo-500/40"
              />

              {/* Inner glowing container */}
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-indigo-900/80 border border-indigo-500/40 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.35)]">
                <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-br from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  SG
                </span>
                
                {/* Small indicator dot */}
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              </div>
            </motion.div>

            {/* Name and Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-6"
            >
              <h1 className="text-xl font-bold tracking-tight text-white mb-1">
                Suhas G
              </h1>
              <p className="text-xs font-mono-code text-indigo-300 tracking-wider">
                COMPUTER SCIENCE ENGINEER
              </p>
            </motion.div>

            {/* Progress bar */}
            <div className="w-56 h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              />
            </div>

            {/* Progress percentage */}
            <div className="mt-3 flex items-center gap-2 text-xs font-mono-code text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>INITIALIZING PORTFOLIO...</span>
              <span className="text-indigo-400 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
