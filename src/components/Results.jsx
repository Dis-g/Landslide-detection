import React from "react";
import { motion } from "framer-motion";

export default function Results() {
  const metrics = [
    { title: "Accuracy", value: "54%" },
    { title: "Precision", value: "56%" },
    { title: "Recall", value: "63%" },
    { title: "F1-Score", value: "70%" },
  ];

  return (
    <section
      id="results"
      className="py-20 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] text-white"
    >
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: false, amount: 0.4 }}
        className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 mb-12"
      >
        Results & Performance
      </motion.h2>

      {/* Animated Metrics */}
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-6 mb-16">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2, // ⏳ slower scale transition
              delay: 0.15 * i,
              ease: [0.22, 1, 0.36, 1], // smooth, natural cubic-bezier
            }}
            viewport={{ once: false, amount: 0.4 }}
            className="bg-slate-900/60 border border-slate-700 p-6 rounded-xl text-center shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-teal-300 mb-2">
              {metric.title}
            </h3>
            <p className="text-3xl font-extrabold text-white">
              {metric.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h3 className="text-2xl font-bold text-teal-400 mb-6 text-center">
          Sample Detections
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "https://assets-cdn.kathmandupost.com/uploads/source/news/2019/environment/Massive%20landslide%20blocked%20Sunkoshi%20River%2001.jpg?sJtY",
            "https://cdn.ca.emap.com/wp-content/uploads/sites/13/2023/02/Total-collapse-of-road-at-summit-of-State-Highway-25A-1024x683.jpg",
            "https://e3.365dm.com/21/10/1600x900/skynews-california-storm_5558606.jpg?20211025034102",
          ].map((src, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              <img
                src={src}
                alt={`Landslide Detection ${i + 1}`}
                className="w-full h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center text-sm text-gray-200 pb-2">
                <p>Detected Area {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-teal-400 mb-6 text-center">
          Detected Regions Map
        </h3>

        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <img
            src="detected.jpg"
            alt="Landslide Hazard Map"
            className="w-full rounded-xl transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_25px_#14b8a6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center text-gray-200 text-sm pb-3">
            <p>Interactive Global Landslide Hazard Map</p>
          </div>
        </div>
      </div>
    </section>
  );
}
