import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const videoRef = useRef(null);

  // Custom scroll function (smooth and slower)
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1200; // 1.2s scroll
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

  // ✨ Slower and smoother animation
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.8, // slowed down from 0.8 → 1.8 seconds
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* Background video (full loop) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/vod.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Automatically Detect Landslides <br /> from Satellite Imagery
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200">
          A machine learning–based early warning system for slope failure detection.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => scrollToSection("demo")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Try the Demo
          </button>
          <button
            onClick={() => scrollToSection("methodology")}
            className="border border-gray-300 hover:border-white text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Read Methodology
          </button>
        </div>
      </motion.div>
    </section>
  );
}
