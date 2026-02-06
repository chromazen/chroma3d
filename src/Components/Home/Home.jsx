// src/Components/Home/Home.jsx
import Hero from "./Hero.jsx";
import WhyUs from "./WhyUs.jsx";
import Vision from "./Vision.jsx";
import Working from "./Working.jsx";
import Statement from "./Statement.jsx";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>

      <section id="vision" className="scroll-mt-20 -mt-[2px]">
        <Vision />
      </section>

      <section id="why-us" className="scroll-mt-20 -mt-[2px]">
        <WhyUs />
      </section>

      <section id="working" className="scroll-mt-20 -mt-[2px]">
        <Working />
      </section>

      <section id="statement" className="scroll-mt-20">
        <Statement />
      </section>
    </main>
  );
}
