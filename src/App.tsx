import { TopBar } from "./components/TopBar";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-light to-cream">
      <TopBar />
      <Navbar />
      <div className="mx-auto flex max-w-7xl flex-col">
        <Hero />
        <About />
        <Gallery />
        <Contact />

        <footer className="mt-16 border-t border-green-200 px-4 py-8 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Krunch &amp; Cane. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}


