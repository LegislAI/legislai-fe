import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, isValidElement } from 'react';

type SidebarButtonProps = {
  icon: ReactNode | string;
  text: string;
  url: string;
};

const SidebarButton = ({ icon, text, url }: SidebarButtonProps) => {
  return (
    <Link href={url}>
      <div className="flex w-full flex-row items-center justify-start gap-2 rounded-md p-2 hover:bg-mine-shaft-700">
        {typeof icon === 'string' ? (
          <Image src={icon} alt="icon" width={24} height={24} />
        ) : isValidElement(icon) ? (
          icon
        ) : (
          <></>
        )}
        <span>{text}</span>
      </div>
    </Link>
  );
};

export default SidebarButton;
