import { useState } from 'react';

import data from '@/data/faq.json';

import ExpandableQuestion from '@/components/ExpandableQuestion';

interface FAQProps {
  FAQSectionRef: React.RefObject<HTMLDivElement>;
}

const FAQ = ({ FAQSectionRef }: FAQProps) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const handleExpand = (questionId: number) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(questionId);
    }
  };

  return (
    <div
      ref={FAQSectionRef}
      className="flex h-screen w-full flex-col items-center justify-center"
    >
      <div className="mb-16 flex w-full flex-col items-center gap-2">
        <h1 className="text-4xl text-light-text">Perguntas Frequentes</h1>
        {/* <h3 className="text-2xl text-light-text">
          Respostas a algumas perguntas que possa ter
        </h3> */}
      </div>

      <div className="mb-10 flex w-full flex-col items-center justify-center">
        {data.map(question => (
          <ExpandableQuestion
            key={question.id}
            questionId={question.id}
            question={question.question}
            answer={question.answer}
            isExpanded={expandedQuestion === question.id}
            setIsExpanded={questionId => handleExpand(questionId)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
