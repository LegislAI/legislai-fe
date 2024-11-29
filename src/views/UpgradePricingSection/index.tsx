import { useEffect, useState } from 'react';

import PricingCard from '@/components/PricingCard';

interface UpgradePricingSectionProps {
  currentPlanId: string;
}

const UpgradePricingSection = ({
  currentPlanId,
}: UpgradePricingSectionProps) => {
  const [planToSubscribe, setPlanToSubscribe] = useState<string>('');

  const handleSubscribePlan = (planId: string) => {
    setPlanToSubscribe(planId);
  };

  useEffect(() => {
    if (planToSubscribe) {
      console.log(`Subscribing to plan: ${planToSubscribe}`);
    }
  }, [planToSubscribe]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-20 text-4xl text-light-text">Atualize o seu plano</h1>
      <div className="mb-6 flex w-full flex-row items-center justify-around px-14">
        <PricingCard
          id="free"
          title="BÁSICO"
          price="0,00"
          features={['15 perguntas por mês', 'Recomendaçaõ de advogados']}
          currentPlanId={currentPlanId}
          subscribePlanCallback={(planId: string) =>
            handleSubscribePlan(planId)
          }
        />
        <PricingCard
          id="premium"
          title="INTERMÉDIO"
          price="4,99"
          features={['Sem limite de perguntas', 'Recomendaçaõ de advogados']}
          currentPlanId={currentPlanId}
          subscribePlanCallback={(planId: string) =>
            handleSubscribePlan(planId)
          }
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
          currentPlanId={currentPlanId}
          subscribePlanCallback={(planId: string) =>
            handleSubscribePlan(planId)
          }
        />
      </div>
    </div>
  );
};

export default UpgradePricingSection;
