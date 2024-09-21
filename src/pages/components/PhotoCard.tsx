// components/PhotoCard.tsx
import Image from "next/image";

interface PhotoCardProps {
  images: string[]; // Array of image URLs
  title: string;
  description: string;
  onClick: () => void;
  className?: string; // Add className prop
}

const PhotoCard: React.FC<PhotoCardProps> = ({ images, title, description, onClick, className }) => {
  return (
    <div
      className={`relative cursor-pointer border-2 border-white rounded-lg overflow-hidden transition-transform transform hover:scale-110 ${className}`} // Apply className
      onClick={onClick}
      style={{ width: '300px', height: '200px' }} // Set fixed dimensions
    >
      {images.map((imageSrc, index) => (
        <Image
          key={index}
          src={imageSrc}
          alt={`${title} image ${index + 1}`}
          width={300}
          height={200}
          className={`absolute transition-transform duration-300 object-cover w-full h-full ${
            index === 0 ? 'z-10' : index === 1 ? 'z-5 transform translate-x-4 translate-y-4' : 'z-0 transform translate-x-8 translate-y-8'
          }`}
        />
      ))}
      <div className="p-4 bg-black absolute bottom-0 w-full">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
