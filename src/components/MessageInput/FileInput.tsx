import Image from 'next/image';
import { FaRegTimesCircle, FaRegFileAlt } from 'react-icons/fa';

import { FileInfo } from '@/types/conversations';

interface FileInputProps {
  file: FileInfo;
  removeFileHandler?: (file: FileInfo) => void;
}

export const ImageInput = ({ file, removeFileHandler }: FileInputProps) => {
  return (
    <button className="relative">
      <Image
        src={file.value}
        width={128}
        height={80}
        alt="uploaded file"
        className="mb-2 ml-2 cursor-default rounded-lg"
      />
      <FaRegTimesCircle
        className="absolute right-0.5 top-0.5 text-xl text-gray-200 hover:text-gray-300"
        onClick={() => removeFileHandler && removeFileHandler(file)}
      />
    </button>
  );
};

export const DocumentInput = ({ file, removeFileHandler }: FileInputProps) => {
  return (
    <div className="relative w-64">
      {removeFileHandler && (
        <button
          className="absolute right-0.5 top-0.5"
          onClick={() => removeFileHandler(file)}
        >
          <FaRegTimesCircle className="text-lg text-gray-300 hover:text-gray-400"></FaRegTimesCircle>
        </button>
      )}
      <div className="mb-2 ml-2 flex items-center gap-2 rounded-xl bg-background py-2 pl-2 pr-8">
        <div className="rounded-xl bg-accent p-2">
          <FaRegFileAlt className="text-xl text-gray-100 hover:text-gray-300" />
        </div>
        <div className="flex flex-col justify-center overflow-hidden">
          <span className="truncate pb-0.5 text-xs text-gray-200">
            {file.name}
          </span>
          <span className="text-xxs text-gray-300">Documento</span>
        </div>
      </div>
    </div>
  );
};
