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
    <div className="min-h-screen text-white font-sans ">
      <Header />
      <Hero />
      <Methodology /> 
      <Demo />
      <Results />
      <TechStack />
      <About />
      <Footer />
    </div>
  );
}

export default App;
