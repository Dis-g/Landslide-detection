import Header from "./components/Header";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import Methodology from "./components/Methodology";
import Results from "./components/Results";
import Download from "./components/Download";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-800 text-white font-sans flex flex-col">
      <Header />

      {/* Add matching IDs for smooth scrolling */}
      <Hero id="home" />
      <Demo id="demo" />
      <Methodology id="methodology" />
      <Results id="results" />
      <Download id="download" />

      <Footer />
    </div>
  );
}

export default App;
