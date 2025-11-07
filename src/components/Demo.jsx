export default function Demo() {
  return (
    <section id="demo" className="py-20 bg-slate-800">
      <h2 className="text-center text-4xl font-bold text-teal-400 mb-12">Try it Yourself</h2>
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <input type="file" className="block mx-auto mb-4" />
        <select className="block mx-auto mb-4">
          <option>Sample Image 1</option>
          <option>Sample Image 2</option>
        </select>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-slate-900 h-48">Input Preview</div>
          <div className="bg-slate-900 h-48">Output Overlay Preview</div>
        </div>
        <button className="px-6 py-3 bg-teal-500 rounded hover:bg-teal-600">Download Result</button>
      </div>
    </section>
  );
}
