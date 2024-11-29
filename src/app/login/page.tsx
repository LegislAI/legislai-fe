'use client';

import { useRef, useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaAnglesDown } from 'react-icons/fa6';

import LoginComponent from '@/components/LoginComponent';
import RegisterComponent from '@/components/RegisterComponent';
import TypewriterEffect from '@/components/TypewriterEffect';
import { CatchPhrases } from '@/data/phrases';
import FAQ from '@/views/FAQ';
import LandingPricingSection from '@/views/LandingPricingSection';

export default function LandingPage() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const FAQSectionRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIsFlipped(!isFlipped);
    }
  };

  const handleScrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToQuestions = () => {
    FAQSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src="/legislai-logo-fff.svg"
              alt="legislau-logo"
              width={250}
              height={50}
            />
            <TypewriterEffect
              phrases={CatchPhrases}
              typingSpeed={100}
              deleteSpeed={50}
              pauseTime={2000}
            />
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

        <button
          onClick={handleScrollToPricing}
          className="absolute bottom-8 p-2 hover:animate-bounce"
        >
          <FaAnglesDown className="text-3xl text-light-text" />
        </button>

        {/* <div className="flex h-screen w-[45%] p-3">
          <div className="h-full w-full rounded-lg bg-deep-sea-700 shadow-lg">
            <ChatSimulation />
          </div>
        </div> */}
      </div>

      <LandingPricingSection
        pricingSectionRef={pricingSectionRef}
        handleScrollToQuestions={handleScrollToQuestions}
      />

      <FAQ FAQSectionRef={FAQSectionRef} />
    </div>
  );
}
