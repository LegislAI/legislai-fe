import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

interface SingleQuestionProps {
  questionId: number;
  question: string;
  answer: string;
  isExpanded: boolean;
  setIsExpanded: (questionId: number) => void;
}

const ExpandableQuestion = ({
  questionId,
  question,
  answer,
  isExpanded,
  setIsExpanded,
}: SingleQuestionProps) => {
  return (
    <div className="flex w-[60%] flex-col py-2">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => setIsExpanded(questionId)}
      >
        <h3 className="text-xl text-light-text">{question}</h3>
        {isExpanded ? (
          <FaAngleUp className="text-3xl text-accent" />
        ) : (
          <FaAngleDown className="text-3xl text-accent" />
        )}
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            className="mt-2 flex w-[80%] flex-col px-2 text-justify text-light-text/70"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableQuestion;
