import React from "react";
import { motion } from "framer-motion";

const AboutCard = ({ name, branch, rollNo, image }) => {
  return (
    <motion.div
      className="
        bg-slate-800/80 p-6 rounded-2xl border border-slate-700 
        shadow-md hover:shadow-[0_0_25px_#14b8a6]/30 
        transition-all duration-500 
        hover:border-teal-400 hover:scale-[1.03]
        flex flex-col items-center
      "
      initial={{ opacity: 0, y: 5 }}               
      whileInView={{ opacity: 1, y: 0 }}             
      transition={{ duration: 1, ease: "easeOut" }}  
      viewport={{ once: false, amount: 0.3 }}        
      whileHover={{ y: -5 }}                         
    >
      {/* Profile Image */}
      <motion.div
        className="mb-5"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      >
        <img
          className="w-36 h-36 mx-auto rounded-full object-cover border-2 border-teal-400"
          src={image}
          alt={name}
        />
      </motion.div>

      {/* Info Section */}
      <div className="text-center">
        <motion.h3
          className="text-2xl font-bold text-teal-300 mb-2 tracking-wide"
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {name}
        </motion.h3>

        <p className="text-[#5EEAD4] italic font-semibold text-sm mb-1">
          {branch}
        </p>
        <p className="text-[#5EEAD4] italic font-semibold text-sm">
          Roll No: {rollNo}
        </p>
      </div>
    </motion.div>
  );
};

export default AboutCard;
