import React, { useState } from "react";

export default function Navbar() {
  const [openContrib, setOpenContrib] = useState(false);
  let closeTimeout;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setOpenContrib(true);
  };

  const handleMouseLeave = () => {
    // ⏳ small delay so user can move the mouse into the dropdown
    closeTimeout = setTimeout(() => setOpenContrib(false), 200);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#ffffff] shadow-md border-b border-gray-300">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* BRAND TEXT */}
        <h1
          onClick={() => scrollTo("home")}
          className="
            text-3xl font-extrabold cursor-pointer select-none
            bg-gradient-to-r from-[#5d70c6] via-[#534788] to-[#6269ae]
            bg-clip-text text-transparent tracking-wide
          "
        >
          Landslide Detector
        </h1>

        {/* MENU ITEMS */}
        <ul className="flex items-center gap-8 text-gray-900 font-medium">
          {[
            { id: "home", label: "Home" },
            { id: "demo", label: "Demo" },
            { id: "results", label: "Results" },
            { id: "methodology", label: "Methodology" },
            { id: "download", label: "About" },
          ].map((item) => (
            <li
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="
                relative cursor-pointer transition-all duration-300
                hover:text-[#4682B4]
                after:absolute after:left-0 after:-bottom-1
                after:h-[3px] after:w-0 
                after:bg-[#9370DB]
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.label}
            </li>
          ))}

          {/* CONTRIBUTE DROPDOWN (Hover-enabled + Click-friendly) */}
          <li
            className="relative list-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="
                px-4 py-2 bg-[#272343] text-white rounded-md 
                hover:bg-[#e3f6f5] hover:text-[#272343] 
                transition-colors text-sm no-underline
              "
            >
              Contribute
            </button>

            {openContrib && (
              <div
                className="absolute right-0 mt-2 w-56 bg-[#bae8e8] border border-gray-300 shadow-lg rounded-md py-2 text-sm z-50 animate-fadeIn"
                onMouseEnter={() => clearTimeout(closeTimeout)} // keep open while hovering inside
                onMouseLeave={handleMouseLeave} // close when truly leaving
              >
                {/* GitHub Repository */}
                <a
                  href="https://github.com/Dis-g/Landslide-detection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-[#272343] font-semibold hover:bg-[#e3f6f5]"
                >
                  GitHub Repository
                </a>

                {/* Report Issue */}
                <a
                  href="https://github.com/Dis-g/Landslide-detection/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-[#272343] font-semibold hover:bg-[#e3f6f5]"
                >
                  Report Issue
                </a>

                {/* Upload Dataset */}
                <button
                  onClick={() =>
                    window.open(
                      "https://github.com/Dis-g/Landslide-detection/discussions",
                      "_blank"
                    )
                  }
                  className="w-full text-left px-4 py-2 text-[#272343] font-semibold hover:bg-[#e3f6f5]"
                >
                  Upload Dataset
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
