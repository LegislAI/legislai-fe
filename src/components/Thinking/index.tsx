import { motion } from 'framer-motion';

interface ThinkingProps {
  text?: string;
}

const Thinking = ({ text }: ThinkingProps) => {
  if (!text) {
    text = '...';
  }

  return (
    <span className="relative inline-block">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block text-sm text-gray-200"
          style={{ opacity: 1 }}
          initial={{ opacity: 1 }}
          animate={{
            opacity: [1, 0.2, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: 'loop',
            delay: index * 0.1,
            ease: 'linear',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

export default Thinking;
