export default function Demo() {
  return (
    <section id="demo" className="py-20 bg-slate-800">
      <h2 className="text-center text-4xl font-bold text-teal-400 mb-12">Try it Yourself</h2>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 px-8">
        <div className="bg-slate-900 p-6 rounded-xl shadow-lg">
          <label className="block text-gray-300 mb-2">Upload Satellite Image</label>
          <input type="file" className="w-full border border-gray-700 p-2 rounded mb-4 bg-slate-800 text-gray-200" />
          <select className="w-full bg-slate-800 border border-gray-700 p-2 rounded mb-4 text-gray-200">
            <option>Choose sample image...</option>
            <option>Darjeeling 2022</option>
            <option>Nepal 2021</option>
          </select>
          <button className="bg-teal-500 w-full py-2 rounded hover:bg-teal-600">Download Result</button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-slate-900 p-4 rounded-lg text-center text-gray-400">Input Image Preview</div>
          <div className="bg-slate-900 p-4 rounded-lg text-center text-gray-400">Output Overlay Preview</div>
        </div>
      </div>
    </section>
  );
}
