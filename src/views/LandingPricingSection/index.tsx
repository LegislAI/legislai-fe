import { FaAnglesDown } from 'react-icons/fa6';

import PricingCard from '@/components/PricingCard';

interface LandingPricingSectionProps {
  pricingSectionRef: React.RefObject<HTMLDivElement>;
  handleScrollToQuestions: () => void;
}

const LandingPricingSection = ({
  pricingSectionRef,
  handleScrollToQuestions,
}: LandingPricingSectionProps) => {
  return (
    <div
      ref={pricingSectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-center"
    >
      <h1 className="mb-16 text-4xl text-light-text">
        Explore os nossos planos
      </h1>
      <div className="mb-10 flex w-full flex-row items-center justify-around">
        <PricingCard
          id="free"
          title="BÁSICO"
          price="0,00"
          features={['15 perguntas por mês', 'Recomendaçaõ de advogados']}
        />
        <PricingCard
          id="premium"
          title="INTERMÉDIO"
          price="4,99"
          features={['Sem limite de perguntas', 'Recomendaçaõ de advogados']}
        />
        <PricingCard
          id="premium_plus"
          title="AVANÇADO"
          price="7,99"
          features={[
            'Sem limite de perguntas',
            'Recomendaçaõ de advogados',
            'Leitura de documentos',
          ]}
        />
      </div>

      <button
        onClick={handleScrollToQuestions}
        className="absolute bottom-8 p-2 hover:animate-bounce"
      >
        <FaAnglesDown className="text-3xl text-light-text" />
      </button>
    </div>
  );
};

export default LandingPricingSection;
