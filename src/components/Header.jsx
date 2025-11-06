export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex justify-between items-center px-8 py-4">
        <h1 className="text-2xl font-bold text-teal-400">Landslide Detector</h1>
        <nav className="space-x-8 text-gray-300">
          {["Home", "Demo", "Methodology", "Results", "Download", "Contribute"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-teal-400 transition duration-200"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
