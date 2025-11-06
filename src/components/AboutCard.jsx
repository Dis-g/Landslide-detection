import React from 'react'

const AboutCard = ({name , branch, rollNo, role, image}) => {
  return (
    <div className="about-card-container">
            <div className="image-container ">
                <img className="w-40 h-40 mx-auto rounded-full object-cover border-2 border-teal-500" src={image} alt={name} />
            </div>

            <div className="info">
                <h3 className="mt-4 text-2xl font-semibold text-teal-400 flex justify-center">{name}</h3>
                <p className="text-gray-400 text-m flex justify-center">{branch}</p>
                <p className="text-gray-400 text-m flex justify-center">Roll No: {rollNo}</p>
                <p className="text-gray-400 mb-2 flex justify-center">
                  Role: {role}
                </p>
            </div>
    </div>
  )
}

export default AboutCard