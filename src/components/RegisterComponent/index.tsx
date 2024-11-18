import RegisterForm from './RegisterForm';

interface RegisterComponentProps {
  handleFlipCard: () => void;
}

const RegisterComponent = ({ handleFlipCard }: RegisterComponentProps) => {
  return (
    <div className="flex max-h-[400px] min-h-[360px] w-full flex-col items-center justify-between rounded-xl bg-gradient-to-tr from-main-green-500 to-main-green-700 p-6 shadow-lg">
      <span className="mb-4 text-2xl font-bold text-light-green-50">
        Registe-se
      </span>

      <RegisterForm handleFlipCard={handleFlipCard} />

      <div className="flex w-full flex-col">
        <div className="my-5 w-full border-t border-light-green-50"></div>

        <div className="w-full text-center text-sm font-medium text-light-green-50">
          Já tem uma conta?{` `}
          <button
            onClick={handleFlipCard}
            className="font-semibold text-green-house-800 transition duration-200 hover:text-green-house-900"
          >
            <span>Inicie sessão</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
