export default function Footer() {
  return (
    <footer className="py-6 text-center text-gray-100 bg-[#424874] shadow-inner">
      <p className="text-lg font-bold mb-2">
        {/* Gradient text for college name */}
        <span
          className="
            bg-gradient-to-r from-[#f4eeff] via-[#dcd6f7] to-[#a6b1e1]
            bg-clip-text text-transparent
            hover:from-[#a6b1e1] hover:via-[#dcd6f7] hover:to-[#f4eeff]
            transition-all duration-500 cursor-pointer
          "
        >
          Indian Institute Of Information Technology Bhagalpur
        </span>
      </p>

      <p className="text-sm text-gray-300 mt-2">
        © 2025 Landslide Detection Project | Developed by Students of IIIT Bhagalpur
      </p>
    </footer>
  );
}
