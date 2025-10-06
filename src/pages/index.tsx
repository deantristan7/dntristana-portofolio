import GoDownButton from "./components/GoDownButton";
import PhotoCard from "./components/PhotoCard"; // Import the PhotoCard
import RotatingPentagram from "./components/RotatingPentagram";

export default function Home() {
  return (
    <div className="bg-black p-8 pb-20 sm:px-20 font-serif" style={{ fontFamily: "'Cinzel', serif" }}>
      <RotatingPentagram />
      <main className="flex flex-col md:gap-2 row-start-2 items-center text-center sm:items-start relative z-10">
        <section className="flex flex-col items-center justify-center text-white text-center h-screen w-full">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Welcome to My Domain</h1>
          <p className="text-md lg:text-2xl">In the dark, I build the code. In the light, I create the noise.</p>
          <GoDownButton />
        </section>
        <section className="flex flex-col gap-4 justify-center h-screen w-full">
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
            <p className="text-sm lg:text-xl">I’m a <b>Full-Stack Engineer</b> who <b>architects digital structures</b> using <b>Go and PHP</b>.</p>
            <p className="text-sm lg:text-xl">I thrive on complexity, building robust solutions from the core database to the client screen.</p>
          </div>
          <GoDownButton />
        </section>
        <section className="flex flex-col gap-4 justify-center h-screen w-full">
          <PhotoCard
            className="place-self-center"
            images={[
              "/images/pc-4.jpg",
              "/images/pc-6.jpeg",
              "/images/pc-5.jpeg",
            ]}
            title="Hobby 1"
            onClick={() => console.log('Hobby 1 clicked')}
          />
          <div className="place-self-center">
            <h2 className="text-3xl lg:text-5xl">Hobbies and Interests</h2><br />
            <p className="text-sm lg:text-xl">Off the grid, I seek out raw energy. I create <b>chaos with my guitar</b> in a <b>metal band</b>.</p>
            <p className="text-sm lg:text-xl">Or I find quiet solitude by <b>conquering dark trails and mountains.</b></p>
          </div>
          {/* <GoDownButton /> */}
        </section>
      </main>
    </div>
  );
}
