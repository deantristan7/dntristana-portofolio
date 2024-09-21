import GoDownButton from "./components/GoDownButton";
import PhotoCard from "./components/PhotoCard"; // Import the PhotoCard
import RotatingPentagram from "./components/RotatingPentagram";

export default function Home() {
  return (
    <div className="bg-black p-8 pb-20 sm:px-20 font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
      <RotatingPentagram />
      <main className="flex flex-col gap-12 md:gap-2 row-start-2 items-center text-center sm:items-start relative z-10">
        <section className="flex flex-col items-center justify-center text-white text-center h-[600px] md:h-screen w-full">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Welcome to My Domain</h1>
          <p className="text-md lg:text-2xl">Dive into the world of code and chaos, where creativity meets the dark allure of metal.</p>
          <GoDownButton />
        </section>
        <section className="flex flex-col gap-4 justify-center h-[600px] md:h-screen w-full">
          <PhotoCard
            className="place-self-center"
            images={[
              "/images/pc-1.jpeg",
              "/images/pc-2.jpeg",
              "/images/pc-3.jpeg"
            ]}
            title="Project 1"
            onClick={() => console.log('Project 1 clicked')}
          />
          <div className="place-self-center">
            <h2 className="text-3xl lg:text-5xl">Who I Am?</h2><br />
            <p className="text-sm lg:text-xl">I’m a web developer wielding Go and PHP, navigating the full-stack landscape. <br /> I thrive on challenges, crafting innovative solutions like a true artisan of the digital realm.</p>
          </div>
          <GoDownButton />
        </section>
        <section className="flex flex-col gap-4 justify-center h-[600px] md:h-screen w-full">
          <PhotoCard
            className="place-self-center"
            images={[
              "/images/pc-4.jpg",
              "/images/pc-5.png",
              "/images/pc-6.jpg"
            ]}
            title="Hobby 1"
            onClick={() => console.log('Hobby 1 clicked')}
          />
          <div className="place-self-center">
            <h2 className="text-3xl lg:text-5xl">Hobbies and Interests</h2><br />
            <p className="text-sm lg:text-xl">Beyond the screen, I’m fueled by the raw energy of metal music, battling foes in immersive games, and conquering mountains.</p>
          </div>          
          {/* <GoDownButton /> */}
        </section>
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer links tetap sama
      </footer> */}
    </div>
  );
}
