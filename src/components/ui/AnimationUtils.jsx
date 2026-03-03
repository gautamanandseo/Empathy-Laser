import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingElements = ({ children, duration = 6, delay = 0 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        x: [0, 10, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

const ParticleEffect = ({ count = 50, color = '#FF6B35' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 1,
            y: '100vh',
            left: `${particle.left}%`,
          }}
          animate={{
            opacity: 0,
            y: '-100vh',
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
          }}
        />
      ))}
    </div>
  );
};

const GradientText = ({
  text,
  colors = ['from-orange-600', 'via-red-600', 'to-pink-600'],
  animate = false,
}) => {
  const colorClass = `bg-gradient-to-r ${colors.join(' ')}`;

  return (
    <motion.span
      className={`bg-clip-text text-transparent ${colorClass}`}
      animate={animate ? { backgroundPosition: ['0%', '100%', '0%'] } : {}}
      transition={animate ? { duration: 6, repeat: Infinity } : {}}
    >
      {text}
    </motion.span>
  );
};

const SectionDivider = ({ variant = 'wave' }) => {
  if (variant === 'wave') {
    return (
      <svg viewBox="0 0 1200 60" className="w-full h-12 text-white">
        <path
          d="M0,20 Q300,0 600,20 T1200,20 L1200,60 L0,60 Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (variant === 'slant') {
    return (
      <div
        className="h-24 w-full bg-gradient-to-r from-orange-50 to-red-50"
        style={{
          clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 80%)',
        }}
      />
    );
  }

  return null;
};

export { FloatingElements, ParticleEffect, GradientText, SectionDivider };
