import { ReactNode, isValidElement } from 'react';

interface ButtonProps {
  icon: ReactNode | string;
  text: string;
  onClick: () => void;
}

const Button = ({ icon, text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-deep-sea-600"
    >
      {isValidElement(icon) ? icon : <></>}
      <span className="text-sm text-gray-100">{text}</span>
    </button>
  );
};

export default Button;
