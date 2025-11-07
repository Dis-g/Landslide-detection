export default function Results() {
  return (
    <section id="results" className="py-20 bg-gradient-to-b from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] text-white">
      <h2 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400 mb-12">
        Results & Performance
      </h2>

      {/* Metrics */}
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-4 gap-6 mb-16">
        {[
          { title: "Accuracy", value: "94%" },
          { title: "Precision", value: "92%" },
          { title: "Recall", value: "90%" },
          { title: "F1-Score", value: "91%" },
        ].map((metric, i) => (
          <div
            key={i}
            className="bg-slate-900/60 border border-slate-700 p-6 rounded-xl text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-teal-300 mb-2">{metric.title}</h3>
            <p className="text-3xl font-extrabold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <h3 className="text-2xl font-bold text-teal-400 mb-6 text-center">
          Sample Detections
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            "https://assets-cdn.kathmandupost.com/uploads/source/news/2019/environment/Massive%20landslide%20blocked%20Sunkoshi%20River%2001.jpg?sJtY",
            "https://cdn.ca.emap.com/wp-content/uploads/sites/13/2023/02/Total-collapse-of-road-at-summit-of-State-Highway-25A-1024x683.jpg",
            "https://e3.365dm.com/21/10/1600x900/skynews-california-storm_5558606.jpg?20211025034102",
          ].map((src, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
            >
              <img
                src={src}
                alt={`Landslide Detection ${i + 1}`}
                className="w-full h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center text-sm text-gray-200 pb-2">
                <p>Detected Area {i + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="max-w-3xl mx-auto px-6">
        <h3 className="text-2xl font-bold text-teal-400 mb-6 text-center">
          Detected Regions Map
        </h3>

        <div className="relative overflow-hidden rounded-xl shadow-lg transition-transform duration-">
          <img
            src="https://www.researchgate.net/publication/345718542/figure/fig2/AS:960835379802112@1606092414071/The-map-below-shows-2085-reported-landslides-with-fatalities-from-NASAs-Global-Landslide.png"
            alt="Landslide Hazard Map"
            className="w-full rounded-xl transition-transform duration-500 hover:scale-105 hover:shadow-[0_0_25px_#14b8a6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center text-gray-200 text-sm pb-3">
            <p>Interactive Global Landslide Hazard Map</p>
          </div>
        </div>
      </div>
    </section>
  );
}
