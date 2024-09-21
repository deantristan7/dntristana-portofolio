// components/PhotoCard.tsx
import Image from "next/image";

interface PhotoCardProps {
  images?: string[]; // Array of image URLs
  title: string;
  onClick: () => void;
  className?: string; // Add className prop
}

const PhotoCard: React.FC<PhotoCardProps> = ({ images = [], title, onClick, className }) => {
  return (
    <div
      className={`relative overflow-visible cursor-pointer rounded-lg lg:scale-150 ${className}`} // Apply className
      onClick={onClick}
      style={{ width: '300px', height: '300px' }} // Adjust dimensions to square for better fit
    >
      {images.map((imageSrc, index) => (
        <Image
          key={index}
          src={imageSrc}
          alt={`${title} image ${index + 1}`}
          width={300}
          height={300}
          className={`absolute border-2 border-white rounded-lg duration-300 object-cover w-40 h-40 transition-transform transform hover:scale-110 ${index === 0
              ? 'z-10 left-1/2 transform -translate-x-1/2' // Center image
              : index === 1
                ? 'z-5 left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12' // Left, rotated
                : 'z-0 -right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12' // Right, rotated
            }`}
        />
      ))}
    </div>
  );
};

export default PhotoCard;
