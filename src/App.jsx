import "./App.css";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact"; 
import Footer from "./components/Footer/Footer";

import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 10);
  };

  return (
    <div>
      {isLoading && (
        <Loading
          duration={2500}
          primaryColor="#3b82f6"
          onComplete={handleLoadingComplete}
        />
      )}
      {!isLoading && (
        <>
          <Navbar show={showContent} />
          <main>
            <Hero show={showContent} />
            <About show={showContent} />
            <Skills show={showContent} />
            <Experience show={showContent} />
            <Contact show={showContent} />
            <Footer show={showContent} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
