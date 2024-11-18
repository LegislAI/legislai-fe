import Image from 'next/image';

import LoginForm from './LoginForm';

interface LoginComponentProps {
  handleFlipCard: () => void;
}

const LoginComponent = ({ handleFlipCard }: LoginComponentProps) => {
  return (
    <div className="flex max-h-[400px] min-h-[360px] w-full flex-col items-center justify-between rounded-xl bg-gradient-to-tr from-main-green-500 to-main-green-700 p-6 shadow-lg">
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-3">
        <button
          onClick={() => console.log('Google login')}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-light-green-50 p-3 shadow-md transition duration-200 hover:bg-light-green-100"
        >
          <Image
            src="/google-icon.svg"
            alt="google-icon"
            width={18}
            height={18}
          />
          <span className="text-sm font-semibold text-main-green-700">
            Continuar com o Google
          </span>
        </button>

        <div className="w-full text-center text-sm font-medium text-light-green-50">
          ou
        </div>

        <div className="flex w-full flex-col">
          <LoginForm />

          <a
            className="mt-1 px-1 py-0.5 text-center text-xxs font-medium text-light-green-50 hover:text-light-green-100"
            href="/recuperar-palavra-passe"
          >
            Esqueceu-se da palavra-passe?
          </a>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="my-5 w-full border-t border-light-green-50"></div>

        <div className="w-full text-center text-sm font-medium text-light-green-50">
          Ainda não tem uma conta?{` `}
          <button
            onClick={handleFlipCard}
            className="font-semibold text-green-house-800 transition duration-200 hover:text-green-house-900"
          >
            <span>Registe-se</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
