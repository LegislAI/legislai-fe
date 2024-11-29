'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { useAuth } from '@/context/AuthContext';
import { useSidebarContext } from '@/context/SidebarContext';
import UpgradePricingSection from '@/views/UpgradePricingSection';

export default function UpdatePlanPage() {
  const { isOpen } = useSidebarContext();
  const { user, isLoading } = useAuth();

  if (isLoading || !user || !user.plan) {
    return <LoadingScreen />;
  }

  return (
    <div
      className={`flex min-h-screen duration-500 ease-in-out ${isOpen ? 'ml-[270px]' : 'ml-0'} flex-col items-center justify-center`}
    >
      <div className="flex w-full flex-col items-center justify-center gap-14 text-gray-100">
        <UpgradePricingSection currentPlanId={user.plan} />
      </div>
    </div>
  );
}
