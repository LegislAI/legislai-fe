'use client';

import { useSidebarContext } from '@/components/Sidebar/sidebarContext';
import Card from '@/components/Card';

export default function HomePage() {
  const { isOpen } = useSidebarContext();

  return (
    <div
      className={`transition-margin flex min-h-screen duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-center bg-gradient-to-t from-green-100 to-green-400`}
    >
      <div className="text-center text-dark-medium">
        <h1 className="mb-4 text-6xl font-bold text-dark">LegislAI</h1>
        <h3 className="mb-4 text-2xl font-bold">
          A CONSTITUIÇÃO TAMBÉM PODE SER SIMPLES
        </h3>
        <p className="mx-auto mb-12 w-[60%] text-lg">
          Navegar pela legislação portuguesa nunca foi tão fácil. O nosso
          chatbot está aqui para o ajudar a entender e a aplicar as leis
          portuguesas de forma rápida e eficiente.
        </p>
      </div>
      <Card
        title="Assistente Virtual"
        description="Tem dúvidas sobre legislação? Pergunte ao nosso chatbot!"
        image="/logo.png"
        url="/"
      />
    </div>
  );
}
