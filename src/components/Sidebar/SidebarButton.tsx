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
      <div className="hover:bg-green-house-900 flex w-full flex-row items-center justify-start gap-2 rounded-md p-2">
        {typeof icon === 'string' ? (
          <Image src={icon} alt="icon" width={22} height={22} />
        ) : isValidElement(icon) ? (
          icon
        ) : (
          <></>
        )}
        <span className="text-sm">{text}</span>
      </div>
    </Link>
  );
};

export default SidebarButton;
