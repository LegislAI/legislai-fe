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
      className="flex w-full items-center gap-2 rounded-md p-2 hover:bg-green-house-900"
    >
      {isValidElement(icon) ? icon : <></>}
      <span className="text-sm text-light-green-50">{text}</span>
    </button>
  );
};

export default Button;
