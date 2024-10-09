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
      <div className="flex w-full flex-row items-center justify-start gap-2 rounded-md p-2 hover:bg-custom-gray">
        {typeof icon === 'string' ? (
          <Image src={icon} alt="icon" width={26} height={26} />
        ) : isValidElement(icon) ? (
          icon
        ) : (
          <></>
        )}
        <span className="text-lg">{text}</span>
      </div>
    </Link>
  );
};

export default SidebarButton;
