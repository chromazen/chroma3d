import { Helmet } from "react-helmet-async";

import Hero from "./Hero.jsx";
import WhyUs from "./WhyUs.jsx";
import Vision from "./Vision.jsx";
import Working from "./Working.jsx";
import Statement from "./Statement.jsx";

export default function Home() {
  return (
    <>
      {/* SEO for Home Page */}
      <Helmet>
        <title>Chroma3D | Professional 3D Printing Services</title>
        <meta
          name="description"
          content="Custom 3D printing, rapid prototyping, and precision manufacturing by Chroma3D. Built for designers, engineers, and creators."
        />
      </Helmet>

      <main className="min-h-screen bg-black">
        {/* Hero */}
        <section id="home" className="scroll-mt-20">
          <Hero />
        </section>

        {/* Vision */}
        <section id="vision" className="scroll-mt-20 -mt-[2px]">
          <Vision />
        </section>

        {/* Why Us */}
        <section id="why-us" className="scroll-mt-20 -mt-[2px]">
          <WhyUs />
        </section>

        {/* Working */}
        <section id="working" className="scroll-mt-20 -mt-[2px]">
          <Working />
        </section>

        {/* Statement */}
        <section id="statement" className="scroll-mt-20">
          <Statement />
        </section>
      </main>
    </>
  );
}
