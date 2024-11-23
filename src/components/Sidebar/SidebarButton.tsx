import { ReactNode, isValidElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';

type SidebarButtonProps = {
  icon: ReactNode | string;
  text: string;
  url: string;
};

const SidebarButton = ({ icon, text, url }: SidebarButtonProps) => {
  return (
    <Link href={url}>
      <div className="flex w-full flex-row items-center justify-start gap-2 rounded-md p-2 hover:bg-deep-sea-800">
        {typeof icon === 'string' ? (
          <Image src={icon} alt="icon" width={22} height={22} />
        ) : isValidElement(icon) ? (
          icon
        ) : (
          <></>
        )}
        <span className="text-sm text-gray-100">{text}</span>
      </div>
    </Link>
  );
};

export default SidebarButton;
