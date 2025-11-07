import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { MdBugReport } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";

export default function Navbar() {
  const [openContrib, setOpenContrib] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  let closeTimeout;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setOpenContrib(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => setOpenContrib(false), 200);
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setVisible(false);
    else setVisible(true);
    setLastScrollY(window.scrollY);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenContrib(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        fixed top-0 w-full z-50 
        backdrop-blur-md bg-black/40 shadow-lg border-b border-white/10
        transition-transform transition-opacity
        ${
          visible
            ? "translate-y-0 opacity-100 duration-[800ms] ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            : "-translate-y-full opacity-0 duration-[400ms] ease-in"
        }
      `}
    >
      <div className="flex items-center justify-between h-16 px-4 sm:px-8 md:px-10">
        {/* Brand Name */}
        <h2
          onClick={() => scrollTo("home")}
          className="
            font-extrabold cursor-pointer select-none
            bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#38BDF8]
            bg-clip-text text-transparent tracking-wide
            [font-size:clamp(1.2rem,4vw,2.5rem)]
          "
        >
          Landslide Detector
        </h2>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[#F1F5F9] font-medium">
          {[
            { id: "home", label: "Home" },
            { id: "demo", label: "Demo" },
            { id: "results", label: "Results" },
            { id: "methodology", label: "Methodology" },
            { id: "about", label: "About" },
          ].map((item) => (
            <li
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="
                relative cursor-pointer transition-all duration-300
                hover:text-[#93C5FD]
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 
                after:bg-[#38BDF8]
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.label}
            </li>
          ))}

          {/* Contribute Dropdown */}
          <li
            className="relative list-none"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setOpenContrib((prev) => !prev)} // ✅ Toggle on click
              className="
                px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9]
                text-white rounded-md shadow-md
                hover:from-[#1E40AF] hover:to-[#0284C7]
                transition-all text-sm
              "
            >
              Contribute
            </button>

            <AnimatePresence>
              {openContrib && (
                <motion.div
                  key="dropdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="
                    absolute right-0 mt-2 w-64 bg-[#1E293B]/90 
                    backdrop-blur-md border border-white/10 
                    shadow-2xl rounded-xl py-3 text-sm z-50
                  "
                >
                  {[
                    {
                      label: "GitHub Repository",
                      link: "https://github.com/Dis-g/Landslide-detection",
                      icon: <FaGithub className="text-xl text-[#93C5FD]" />,
                    },
                    {
                      label: "Report Issue",
                      link: "https://github.com/Dis-g/Landslide-detection/issues",
                      icon: <MdBugReport className="text-xl text-[#93C5FD]" />,
                    },
                    {
                      label: "Upload Dataset",
                      link: "https://github.com/Dis-g/Landslide-detection/discussions",
                      icon: <FiUploadCloud className="text-xl text-[#93C5FD]" />,
                    },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 * index,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="
                        flex items-center gap-3 px-4 py-2 mx-2 mb-2 last:mb-0
                        text-[#E2E8F0] font-semibold 
                        bg-white/10 rounded-md hover:bg-white/20
                        transition-all duration-300
                      "
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#F1F5F9] hover:text-[#60A5FA] transition-colors"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:hidden bg-[#0F172A]/95 backdrop-blur-md py-5 border-t border-white/10 text-center"
          >
            <ul className="flex flex-col gap-5 text-[#F1F5F9] font-medium">
              {[
                { id: "home", label: "Home" },
                { id: "demo", label: "Demo" },
                { id: "results", label: "Results" },
                { id: "methodology", label: "Methodology" },
                { id: "about", label: "About" },
              ].map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * index,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  onClick={() => scrollTo(item.id)}
                  className="cursor-pointer hover:text-[#60A5FA] transition-all"
                >
                  {item.label}
                </motion.li>
              ))}

              {/* Contribute (Mobile) */}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="https://github.com/Dis-g/Landslide-detection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-gradient-to-r from-[#2563EB] to-[#0EA5E9] text-white rounded-md w-fit mx-auto hover:from-[#1E40AF] hover:to-[#0284C7] transition-all"
                >
                  Contribute
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
