import React from "react";
import { motion } from "framer-motion";
import { Activity, Layers, Image, Database } from "lucide-react";

export default function Methodology() {
  const steps = [
    {
      icon: <Activity size={32} />,
      title: "Pre-processing",
      text: "Noise reduction and contrast enhancement on raw satellite tiles.",
    },
    {
      icon: <Layers size={32} />,
      title: "Segmentation",
      text: "CNN-based U-Net to extract potential landslide regions.",
    },
    {
      icon: <Image size={32} />,
      title: "Feature Extraction",
      text: "Extracting spectral and texture-based features.",
    },
    {
      icon: <Database size={32} />,
      title: "Classification",
      text: "Identifying landslide-prone areas using ML models.",
    },
  ];

  return (
    <section
      id="methodology"
      className="mt-2 bg-gray-50 p-12 shadow-lg border border-emerald-100 "
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }} // 👈 replay when visible
        className="text-3xl font-bold text-emerald-700"
      >
        How it Works
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
        className="text-slate-600 mt-3 text-lg"
      >
        The model follows a multi-step process from data preparation to final classification.
      </motion.p>

      {/* Steps Grid */}
      <div className="mt-10 grid md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15 * index,
              ease: "easeOut",
            }}
            viewport={{ once: false, amount: 0.3 }} // 👈 animate every scroll
          >
            <Card icon={step.icon} title={step.title} text={step.text} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Card({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 150, damping: 10 }}
      className="p-8 bg-white rounded-2xl border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-300 min-h-[220px]"
    >
      <div className="flex flex-col items-start gap-4">
        <div className="p-3 rounded-lg bg-emerald-50 text-emerald-700 text-xl">
          {icon}
        </div>
        <div>
          <div className="font-semibold text-lg mb-1 text-emerald-800">
            {title}
          </div>
          <div className="text-sm text-slate-600 leading-relaxed">{text}</div>
        </div>
      </div>
    </motion.div>
  );
}
