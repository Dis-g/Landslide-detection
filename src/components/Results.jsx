export default function Results() {
  return (
    <section id="results" className="py-20 bg-slate-800">
      <h2 className="text-center text-4xl font-bold text-teal-400 mb-12">Results & Performance</h2>
      <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-3 gap-8">
        <div className="bg-slate-900 p-6 rounded-xl text-center">Gallery (Sample Detections)</div>
        <div className="bg-slate-900 p-6 rounded-xl text-center">Metrics: Accuracy 94%, Precision 92%</div>
        <div className="bg-slate-900 p-6 rounded-xl text-center">Interactive Map (Detected Regions)</div>
      </div>
    </section>
  );
}
