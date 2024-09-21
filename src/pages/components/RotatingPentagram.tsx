import { useEffect, useState } from 'react';
import Image from 'next/image';

const RotatingPentagram = () => {
  const [rotate, setRotate] = useState(0);

  // Rotate the pentagram as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotate(scrollY * 0.1); // Adjust the rotation speed
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed z-0 opacity-50"
      style={{
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      }}
    >
      <Image
        className="bg-center bg-no-repeat"
        alt="Pentagram"
        src="/images/pentagram.png"
        width={500}
        height={500}
      />
    </div>
  );
};

export default RotatingPentagram;
