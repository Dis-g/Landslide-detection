import React from 'react'
import AboutCard from './AboutCard';

const About = () => {
    const members=[
        {
            name:"Aditi Singh",
            branch:"ECE",
            rollNo:"230102005",
            role:"Web Developer",
            image:"https://i.imgur.com/fXsQE1H.jpeg"
        },
        {
            name:"Disanti Ghosh",
            branch:"ECE",
            rollNo:"230102026",
            role:"ML Engineer",
            image:"https://i.imgur.com/fXsQE1H.jpeg"
        },
        {
            name:"Kanishk Pandey",
            branch:"ECE",
            rollNo:"230102035",
            role:"ML Engineer",
            image:"https://i.imgur.com/fXsQE1H.jpeg"
        },
        {
            name:"Shivendru Paul",
            branch:"ECE",
            rollNo:"230102062",
            role:"Web Developer",
            image:"https://i.imgur.com/fXsQE1H.jpeg"
        },
        {
            name:"Sudhanshu Katiyar",
            branch:"CSE",
            rollNo:"230101140",
            role:"Web Developer",
            image:"https://i.imgur.com/fXsQE1H.jpeg"
        }
    ]
  return (
    <section id="about" className="py-20 bg-slate-900">
      <h2 className="text-center text-4xl font-bold text-teal-400 mb-10">About Us</h2>
      <div className="card-group">
        {members.map((m,i)=>(
            <AboutCard 
                key={i}
                name={m.name}
                rollNo={m.rollNo}
                role={m.role}
                image={m.image}
                branch={m.branch}
            >

            </AboutCard>
        ))}

      </div>
    </section>
  );
}

export default About;