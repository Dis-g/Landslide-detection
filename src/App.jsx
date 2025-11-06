import Header from "./components/Header";
import Hero from "./components/Hero";
import Demo from "./components/Demo";
import Methodology from "./components/Methodology";
import Results from "./components/Results";
import About from "./components/About";
import Footer from "./components/Footer";
import TechStack from "./components/TechStack"
function App() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-gray-800 text-white font-sans flex flex-col">
      <Header />
      <Hero />
      <Demo />
      <Methodology />
      <TechStack />
      <About />
      <Results />
      <Footer />
    </div>
  );
}

export default App;
