import React from "react";
import {motion} from "framer-motion";
import {techStack} from "../data/TechStackData";

const TechStack = () => {
  return (
    <div className="relative w-full overflow-hidden bg-slate-800 py-10">
      <div className="tech-stack-heading p-3">
        <h2 className="text-center text-4xl font-bold text-teal-400 mb-10">What We Built With</h2>
      </div>
      {/* <div className="absolute top-0 left-0 h-full w-60 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-60 bg-gradient-to-l from-slate-900 to-transparent z-10"></div> */}

      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: ["0%","-50%"]
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity
        }}
        whileHover={{animationPlayState:"paused"}}
      >
        {[...techStack,...techStack].map((tech,i)=>(
          <motion.div
            key={i}
            className="
              flex flex-col items-center
              bg-slate-700/60 
              backdrop-blur-md
              border border-slate-600/40
              px-5 py-4 rounded-2xl shadow-md 
              min-h-[150px] min-w-[150px]
            "
            whileHover={{
              scale: 1.12,
              rotateX: 10,
              rotateY: 0,
              boxShadow: "0px 0px 18px rgba(56,189,248,0.4)"
            }}
            transition={{type:"spring", stiffness: 200, damping: 12}}
          >
          <motion.img
            src={tech.icon}
            alt={tech.name}
            className="h-20 w-20 my-2 pt-2 object-contain"
            initial={{ filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))", scale: 1 }}
            animate={{ filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))", scale: 1 }}
            whileHover={{
              filter: "drop-shadow(0px 0px 10px rgba(56,189,248,0.9))",
              scale: 1.12,
            }}
            transition={{
              type: "spring",
              stiffness: 160,
              damping: 16,
            }}
          />

            <p className="text-white pt-2 text-xl font-semibold">{tech.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
