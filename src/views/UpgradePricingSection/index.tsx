'use client';

import { useRouter } from 'next/navigation';

import PricingCard from '@/components/PricingCard';
import { updateUserPlan } from '@/services/usersServices';

interface UpgradePricingSectionProps {
  currentPlanId: string;
}

const UpgradePricingSection = ({
  currentPlanId,
}: UpgradePricingSectionProps) => {
  const router = useRouter();

  const handleSubscribePlan = async (planId: string) => {
    try {
      const response = await updateUserPlan(planId, 'tok_visa', 'card');

      if (response.status === 200) {
        console.log('Plano atualizado com sucesso');
        router.push('/');
      }
    } catch (error) {
      console.error('Erro ao atualizar o plano:', error);
    }
  };

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
