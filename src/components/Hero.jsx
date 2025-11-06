export default function Hero() {
  return (
    <section id="home" className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-teal-700 to-indigo-900">
      <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/7c/Landslide_in_Nepal_2015.jpg')] bg-cover bg-center opacity-30"></div>
      <div className="relative text-center z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Automatically Detect Landslides from Satellite Imagery
        </h2>
        <p className="text-lg text-gray-200 mb-8">
          A machine learning–based early warning system for slope failure detection.
        </p>
        <div className="space-x-4">
          <a href="#demo" className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">Try the Demo</a>
          <a href="#methodology" className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-teal-700 transition">Read Methodology</a>
        </div>
      </div>
    </section>
  );
}
