import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef(null);

  // Smooth scroll
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    let start = null;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);
      const eased = easeOutCubic(percent);
      window.scrollTo(0, startPosition + distance * eased);
      if (progress < duration) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.8, ease: "easeOut", staggerChildren: 0.25 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center h-screen overflow-hidden"
    >
      {/* 🎥 Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/vod.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🌫 Subtle overlay for text readability (not blocking video) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60 pointer-events-none"
        style={{ zIndex: 1 }}
      ></div>

      {/* ✨ Text & buttons above everything */}
      <motion.div
        className="relative z-[5] text-center text-white px-4"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={childVariants}
          className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
        >
          Automatically Detect Landslides <br /> from Satellite Imagery
        </motion.h1>

        <motion.p
          variants={childVariants}
          className="text-lg md:text-xl mb-8 text-gray-200"
        >
          A machine learning–based early warning system for slope failure detection.
        </motion.p>

        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("demo")}
            className="bg-emerald-500/85 hover:bg-emerald-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Try the Demo
          </button>

          <button
            onClick={() => scrollToSection("methodology")}
            className="border border-white/70 hover:border-white text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Read Methodology
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
