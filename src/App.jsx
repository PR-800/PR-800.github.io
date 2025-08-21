import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";

function App() {
  return (
    <div>
      <Navbar/>
      <main>
        <Hero/>
        <About/>
      </main>
    </div>
  );
}

export default App;
