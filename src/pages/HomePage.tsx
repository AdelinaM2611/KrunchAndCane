/**
 * Landing page: Hero, About, Gallery, Contact. Handles ?section=about or ?section=contact
 * by scrolling to the corresponding section (e.g. from nav links).
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Gallery } from "../components/Gallery";
import { Contact } from "../components/Contact";

const NAVBAR_OFFSET = 100;

export function HomePage() {
  const location = useLocation();

  /** When URL has ?section=about or ?section=contact, scroll to that section. */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section !== "about" && section !== "contact") return;

    const id = section;
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, [location.search]);

  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Contact />
    </>
  );
}
