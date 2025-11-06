import Header from "./components/Header";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import Methodology from "./components/Methodology";
import Results from "./components/Results";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-gray-800 text-white font-sans flex flex-col">
      <Header />
      <Hero />
      <Demo />
      <Methodology />
      <Results />
      <About/>
      <Footer />
    </div>
  );
}

export default App;
