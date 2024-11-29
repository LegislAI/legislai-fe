import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

interface GreetingProps {
  username: string;
}

const Greeting = ({ username }: GreetingProps) => {
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 5 && hours < 12) {
      setGreeting(`Bom dia, ${username}`);
    } else if (hours >= 12 && hours < 17) {
      setGreeting(`Boa tarde, ${username}`);
    } else {
      setGreeting(`Boa noite, ${username}`);
    }
  }, [username]);

  return (
    <div className="flex h-screen min-h-8 items-center justify-center">
      <motion.h1
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        className="text-center text-2xl font-bold text-gray-100"
      >
        {greeting}
      </motion.h1>
    </div>
  );
};

export default Greeting;
