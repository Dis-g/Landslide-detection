const steps = [
  { title: "Pre-processing", desc: "Clean and align satellite images for model input." },
  { title: "Segmentation", desc: "Divide terrain images into meaningful regions." },
  { title: "Feature Extraction", desc: "Extract slope, vegetation, and texture data." },
  { title: "Classification", desc: "Identify landslide-prone areas with ML algorithms." },
];

export default function Methodology() {
  return (
    <section id="methodology" className="py-20 bg-slate-900">
      <h2 className="text-center text-4xl font-bold text-teal-400 mb-12">How It Works</h2>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto px-8">
        {steps.map((s, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-xl text-center hover:bg-teal-700/10 transition">
            <div className="text-3xl mb-3">🛰️</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-400 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <a href="#" className="text-teal-400 hover:underline">Read full paper →</a>
      </div>
    </section>
  );
}
