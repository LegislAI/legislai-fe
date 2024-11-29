import { FaCheck } from 'react-icons/fa';

interface PricingCardProps {
  id: string;
  title: string;
  price: string;
  features: string[];
  currentPlanId?: string;
  subscribePlanCallback?: (planId: string) => void;
}

const PricingCard = ({
  id,
  title,
  price,
  features,
  currentPlanId,
  subscribePlanCallback,
}: PricingCardProps) => {
  const isCurrentPlan = currentPlanId === id;
  const planOptions = ['free', 'premium', 'premium_plus'];

  const canSubscribe = currentPlanId
    ? planOptions.indexOf(id) > planOptions.indexOf(currentPlanId)
    : true;

  return (
    <div
      className={`flex h-[440px] w-64 flex-col items-center justify-between rounded-2xl ${isCurrentPlan ? 'bg-gradient-to-tr from-deep-sea-900/60 to-deep-sea-900/80' : 'bg-gradient-to-tr from-deep-sea-600 to-deep-sea-700'} text-light-text`}
    >
      <div className="flex flex-col items-center">
        <div className="mt-6 flex w-full -translate-x-4 justify-start">
          <div
            className={`w-[60%] rounded-r-xl ${isCurrentPlan ? 'bg-aquamarine-400' : 'bg-primary'} p-1 shadow-lg`}
          >
            <h2 className="pl-3 text-lg font-bold text-dark-text">{title}</h2>
          </div>
        </div>

        <div className="mt-7 flex items-end gap-1">
          <p
            className={`text-5xl font-black ${isCurrentPlan ? 'text-aquamarine-400' : 'text-primary'}`}
          >
            {price}
          </p>
          <p className="translate-y-2 text-lg">€ / mês</p>
        </div>

        <ul className="mt-12 flex w-[85%] flex-col gap-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center justify-between gap-2">
              <p className="text-sm">{feature}</p>
              <FaCheck className="flex-shrink-0 text-xl text-accent" />
            </li>
          ))}
        </ul>
      </div>

      {currentPlanId && (isCurrentPlan || canSubscribe) && (
        <div className="mb-6">
          <button
            className={`w-full rounded-b-2xl py-3 font-bold ${
              isCurrentPlan
                ? 'disabled cursor-default bg-aquamarine-500 px-8 text-dark-text'
                : 'bg-accent px-4 text-dark-text hover:bg-pumpkin-600/80'
            }`}
            onClick={() => subscribePlanCallback && subscribePlanCallback(id)}
          >
            {isCurrentPlan ? 'PLANO ATUAL' : 'SUBSCREVER PLANO'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PricingCard;
