'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5 } : {}}
      className={cn(
        'glass rounded-xl p-6 border border-white/10',
        hover && 'glass-hover cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;
