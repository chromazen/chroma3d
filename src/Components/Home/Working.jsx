// src/Components/Home/Working.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const steps = [
  { title: "Concept", text: "Understand idea and define goals." },
  { title: "Design", text: "Create precise 3D CAD models." },
  { title: "Prototype", text: "Print, test, and refine design." },
  { title: "Print", text: "Produce final parts with precision." },
  { title: "Deliver", text: "Inspect, package, and dispatch safely." },
];

export default function Working() {
  const [active, setActive] = useState(0);
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 4500);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section
      ref={ref}
      className="
        relative flex flex-col md:flex-row min-h-[92vh]
        items-center justify-center overflow-hidden bg-black text-neutral-200
        px-8
      "
    >
      {/* Ambient glows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{ visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } } }}
        className="pointer-events-none absolute top-20 left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{ visible: { opacity: 1, scale: 1, transition: { duration: 1.8, delay: 0.2 } } }}
        className="pointer-events-none absolute bottom-32 right-32 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl"
      />

      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={controls}
        variants={{ visible: { opacity: 1, x: 0, transition: { duration: 1 } } }}
        className="relative w-full md:w-1/2 mb-10 md:mb-0 z-20"
      >
        <h2
          className="text-4xl md:text-5xl font-semibold text-white"
          style={{ fontFamily: "StardusterLasital, Poppins, sans-serif" }}
        >
          The <span className="text-orange-500">Working Ladder</span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-neutral-400 max-w-md">
          A precise workflow turning ideas into flawless 3D creations.
        </p>
      </motion.div>

      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={controls}
        variants={{ visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.3 } } }}
        className="relative w-full md:w-1/2 h-[500px] md:h-[600px]"
      >
        {/* ✅ FIXED PATH */}
        <img
          src={`${import.meta.env.BASE_URL}working_bg.svg`}
          alt="Working process background"
          className="absolute right-0 top-0 w-full h-full object-cover"
        />

        <div className="relative z-10 w-[75%] md:w-[65%] space-y-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className={`rounded-xl border px-6 py-4 backdrop-blur-md
                ${
                  active === i
                    ? "border-orange-500/60 bg-white/10"
                    : "border-neutral-800/40 bg-white/5"
                }`}
              initial={{ opacity: 0, y: 40 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.5 + i * 0.15 },
                },
              }}
            >
              <h3 className="font-semibold text-orange-400">{s.title}</h3>
              <p className="mt-2 text-xs md:text-sm text-neutral-300">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
