import Link from 'next/link';
import Image from 'next/image';

type CardProps = {
  title: string;
  description: string;
  image: string;
  url: string;
};

const Card = ({ title, description, image, url }: CardProps) => {
  return (
    <Link href={url}>
      <div className="lg:transition-duration-1000 flex w-80 cursor-pointer flex-col items-center rounded-xl bg-gradient-to-tr from-green-800/90 to-green-900/80 p-4 shadow-xl lg:transition-transform lg:hover:scale-105">
        <div className="text-center text-gray-100">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-2">{description}</p>
        </div>
        <Image src={image} alt={title} width={180} height={180} />
      </div>
    </Link>
  );
};

export default Card;
