import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FilmBackground from "@/components/film/FilmBackground";

export default function Home() {
  return (
    <>
      <FilmBackground />
      <Navbar />
      {/* overflow-x-clip: content that slides in from the side (Reveal
          left/right) starts off-screen; clip it so it can't widen the page
          and let phones pan sideways. Unlike overflow-hidden, clip doesn't
          create a scroll container. */}
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
