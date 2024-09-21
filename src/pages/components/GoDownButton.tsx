// components/GoDownButton.tsx
import React from "react";

const GoDownButton: React.FC = () => {
  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToNextSection}
      className="mt-8 p-2 cursor-pointer text-center text-white rounded transition-transform transform hover:scale-105"
    >
      Go Down
    </button>
  );
};

export default GoDownButton;
