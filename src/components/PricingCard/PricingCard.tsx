import { FaCheck } from 'react-icons/fa';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
}

const PricingCard = ({ title, price, features }: PricingCardProps) => {
  return (
    <div className="flex h-[440px] w-64 flex-col items-center rounded-2xl bg-gradient-to-tr from-deep-sea-600 to-deep-sea-700 text-light-text">
      <div className="mt-6 flex w-full -translate-x-2 justify-start">
        <div className="w-[60%] rounded-r-xl bg-primary p-1 shadow-lg">
          <h2 className="pl-3 text-lg font-bold text-dark-text">{title}</h2>
        </div>
      </div>

      <div className="mt-7 flex items-end gap-1">
        <p className="text-5xl font-black text-primary">{price}</p>
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
  );
};

export default PricingCard;
