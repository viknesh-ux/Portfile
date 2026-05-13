import Navbar from "@/components/shared/Navbar";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/shared/Footer";
import CommandPalette from "@/components/shared/CommandPalette";

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <CommandPalette />
      <main className="flex-grow pt-24">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
