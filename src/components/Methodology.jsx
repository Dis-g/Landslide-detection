import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Layers, Image, Database } from "lucide-react";

export default function Methodology() {
  const [selectedStep, setSelectedStep] = useState(null);

  const steps = [
    {
      icon: <Activity size={32} />,
      title: "Pre-processing",
      text: "Noise reduction and contrast enhancement on raw satellite tiles.",
      details:
        "In this step, raw satellite images undergo noise reduction using Gaussian filters and contrast normalization. This enhances visibility and ensures that the data fed into the segmentation network maintains spatial consistency for accurate detection.",
    },
    {
      icon: <Layers size={32} />,
      title: "Segmentation",
      text: "CNN-based U-Net to extract potential landslide regions.",
      details:
        "A convolutional neural network (U-Net architecture) segments the terrain into regions of interest. This helps isolate areas showing landslide characteristics such as soil displacement, vegetation loss, or slope instability.",
    },
    {
      icon: <Image size={32} />,
      title: "Feature Extraction",
      text: "Extracting spectral and texture-based features.",
      details:
        "Various texture, color, and spectral features are extracted from the segmented regions. Parameters like NDVI, slope angle, and texture gradients are key inputs for the classification model.",
    },
    {
      icon: <Database size={32} />,
      title: "Classification",
      text: "Identifying landslide-prone areas using ML models.",
      details:
        "Finally, extracted features are fed into a trained classifier such as Random Forest or SVM. The model predicts whether the region is landslide-prone or stable, forming the basis of the final detection output.",
    },
  ];

  return (
    <section
      id="methodology"
      className="mt-2 bg-gray-50 p-12 shadow-lg border border-emerald-100"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
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
            viewport={{ once: false, amount: 0.3 }}
          >
            <Card
              icon={step.icon}
              title={step.title}
              text={step.text}
              onReadMore={() => setSelectedStep(step)}
            />
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedStep && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
            />

            {/* Centered Dialog Box */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 bg-white rounded-2xl p-8 shadow-2xl w-[80vw] md:w-[40vw] h-[50vh] flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-emerald-700 mb-3">
                  {selectedStep.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedStep.details}
                </p>
              </div>

              <div className="text-right mt-4">
                <button
                  onClick={() => setSelectedStep(null)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function Card({ icon, title, text, onReadMore }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 150, damping: 10 }}
      className="p-8 bg-white rounded-2xl border border-emerald-100 shadow-md hover:shadow-lg transition-all duration-300 min-h-[260px] flex flex-col justify-between"
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

      {/* Read More Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="
          mt-6 text-sm font-semibold text-white
          bg-emerald-600 rounded-lg px-4 py-2
          hover:bg-emerald-700 transition-all duration-300
          self-start shadow-md hover:shadow-lg
        "
        onClick={onReadMore}
      >
        Read More →
      </motion.button>
    </motion.div>
  );
}
