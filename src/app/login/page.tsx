'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import LoginComponent from '@/components/LoginComponent';
import RegisterComponent from '@/components/RegisterComponent';

import { FaAnglesDown } from 'react-icons/fa6';

export default function LoginPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="flex w-[55%] flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image src="/logo.svg" alt="legislau-logo" width={250} height={50} />
          <h3 className="mb-4 text-xl font-bold text-white">
            A CONSTITUIÇÃO TAMBÉM PODE SER SIMPLES
          </h3>
        </div>

        <div className="flip-card min-h-[360px] w-[400px]">
          <motion.div
            className="flip-card-inner h-full w-full"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <motion.div className="flip-card-front">
              <LoginComponent handleFlipCard={handleFlip} />
            </motion.div>

            <motion.div className="flip-card-back">
              <RegisterComponent handleFlipCard={handleFlip} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <button className="absolute bottom-8 p-2 hover:animate-bounce">
        <FaAnglesDown className="text-3xl text-white" />
      </button>

      <div className="flex h-screen w-[45%] p-2">
        <div className="h-full w-full rounded-lg bg-gradient-to-tr from-main-green-500 to-main-green-700 shadow-lg"></div>
      </div>
    </div>
  );
}
