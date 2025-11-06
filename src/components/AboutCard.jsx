import React from 'react'
import { motion } from 'framer-motion'

const AboutCard = ({ name, branch, rollNo, role, image }) => {
  return (
    <motion.div
      className="about-card-container bg-slate-700 p-4 rounded-2xl shadow-md hover:shadow-teal-500/30 transition"
      initial={{ opacity: 0, y: 50 }}          
      whileInView={{ opacity: 1, y: 0 }}   
      transition={{ duration: 0.1, ease:"easeInOut" }}
      whileHover={{ scale: 1, y: -5, rotate:1 }}  
      viewport={{ once: true }}             
    >
      <motion.div
        className="image-container"
        whileHover={{ rotate: -2, scale: 1.1 }} 
        transition={{ type: "spring", stiffness: 200 }}
      >
        <img
          className="w-40 h-40 mx-auto rounded-full object-cover border border-teal-500"
          src={image}
          alt={name}
        />
      </motion.div>

      <div className="info text-center mt-4">
        <motion.h3
          className="text-2xl font-semibold text-teal-300"
          whileHover={{ duration:0.1, y:-5   }}
        >
          {name}
        </motion.h3>
        <p className="text-teal-300">{branch}</p>
        <p className="text-teal-300">Roll No: {rollNo}</p>
        <p className="text-teal-300 mb-2">Role: {role}</p>
      </div>
    </motion.div>
  )
}

export default AboutCard
