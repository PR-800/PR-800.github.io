import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";

function App() {
  return (
    <div>
      <Navbar/>
      <main>
        <Hero/>
        <About/>
        <Experience/>
      </main>
    </div>
  );
}

export default App;
