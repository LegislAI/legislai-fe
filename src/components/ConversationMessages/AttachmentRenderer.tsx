import Image from 'next/image';

import { DocumentInput } from '@/components/MessageInput/FileInput';
import { FileInfo } from '@/types/conversations';

const AttachmentRenderer = (attachment: FileInfo) => {
  if (attachment.type.includes('image')) {
    return (
      <div className="max-w-full overflow-hidden rounded-lg">
        <Image
          src={attachment.value}
          alt={attachment.name || 'Image'}
          width={256}
          height={200}
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    );
  }

  return <DocumentInput file={attachment} />;
};

export default AttachmentRenderer;
