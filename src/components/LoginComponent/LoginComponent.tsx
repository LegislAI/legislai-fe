import Image from 'next/image';

import LoginForm from './LoginForm';

interface LoginComponentProps {
  handleFlipCard: () => void;
}

const LoginComponent = ({ handleFlipCard }: LoginComponentProps) => {
  return (
    <div className="flex max-h-[400px] min-h-[360px] w-full flex-col items-center justify-between rounded-xl bg-deep-sea-700 p-6 shadow-lg">
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-3">
        <button
          onClick={() => console.log('Google login')}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-powder-ash-100 p-3 shadow-md transition duration-200 hover:bg-powder-ash-100/90"
        >
          <Image
            src="/google-icon.svg"
            alt="google-icon"
            width={18}
            height={18}
          />
          <span className="text-sm font-semibold text-dark-text">
            Continuar com o Google
          </span>
        </button>

        <div className="w-full text-center text-sm font-medium text-light-text">
          ou
        </div>

        <div className="flex w-full flex-col items-center">
          <LoginForm />

          <div>
            <a
              className="mt-1 px-1 py-0.5 text-center text-xxs font-medium text-light-text hover:text-light-text/80"
              href="/recuperar-palavra-passe"
            >
              Esqueceu-se da palavra-passe?
            </a>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col">
        <div className="border-text my-5 w-full border-t"></div>

        <div className="w-full text-center text-sm font-medium text-light-text">
          Ainda não tem uma conta?{` `}
          <button
            onClick={handleFlipCard}
            className="font-semibold text-dark-text transition duration-200"
          >
            <span>Registe-se</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
