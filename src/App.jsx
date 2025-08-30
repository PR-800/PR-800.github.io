import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
      </main>
    </div>
  );
}

export default App;
