import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/sections/Hero";
import PersonalDetails from "@/components/sections/PersonalDetails";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/shared/Footer";
import CommandPalette from "@/components/shared/CommandPalette";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <CommandPalette />
      <Hero />
      <PersonalDetails />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
