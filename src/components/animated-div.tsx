"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedDivProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedDiv({ children, className, delay = 0 }: AnimatedDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
