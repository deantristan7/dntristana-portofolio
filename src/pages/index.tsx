import { useEffect, useState } from "react";
import Image from "next/image";
import GoDownButton from "./components/GoDownButton";
import PhotoCard from "./components/PhotoCard"; // Import the PhotoCard

export default function Home() {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotate(scrollY / 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
      <div className="absolute z-0 opacity-50" style={{ top: "50%", left: "50%", transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}>
        <Image className="bg-center bg-no-repeat" alt="Pentagram" src="/images/pentagram.png" width={500} height={500} />
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center text-center sm:items-start relative z-10">
        <section className="flex flex-col items-center justify-center text-white text-center h-screen w-full">
          <h1 className="text-5xl font-bold mb-4">Welcome to My Domain</h1>
          <p className="text-xl">Dive into the world of code and chaos, where creativity meets the dark allure of metal.</p>
          <GoDownButton />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start justify-center text-white text-center h-screen w-full">
          <div className="place-self-center">
            <h2 className="text-3xl">Who I Am?</h2>
            <p className="text-xl">I’m a web developer wielding Go and PHP, navigating the full-stack landscape. I thrive on challenges, crafting innovative solutions like a true artisan of the digital realm.</p>
          </div>
          <PhotoCard
            className="place-self-center"
            images={[
              "/images/pc-1.jpeg", 
              "/images/pc-2.jpeg", 
              "/images/pc-3.jpeg"
            ]} 
            title="Project 1"
            description="Brief description of project 1."
            onClick={() => console.log('Project 1 clicked')}
          />
          <div className="col-span-2">
            <GoDownButton />
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start justify-center text-white text-center h-screen w-full">
          <PhotoCard
            className="place-self-center"
            images={[
              "/images/pc-1.jpeg", 
              "/images/pc-2.jpeg", 
              "/images/pc-3.jpeg"
            ]} 
            title="Hobby 1"
            description="Brief description of hobby 1."
            onClick={() => console.log('Hobby 1 clicked')}
          />
          <div className="place-self-center">
            <h2 className="text-3xl">Hobbies and Interests</h2>
            <p className="text-xl">Beyond the screen, I’m fueled by the raw energy of metal music, battling foes in immersive games, and conquering mountains.</p>
          </div>
          <div className="col-span-2">
            <GoDownButton />
          </div>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer links tetap sama */}
      </footer>
    </div>
  );
}
