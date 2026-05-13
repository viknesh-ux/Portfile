import Navbar from "@/components/shared/Navbar";
import Writeups from "@/components/sections/Writeups";
import Footer from "@/components/shared/Footer";
import CommandPalette from "@/components/shared/CommandPalette";

export default function BlogPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <CommandPalette />
      <main className="flex-grow pt-24">
        <Writeups />
      </main>
      <Footer />
    </div>
  );
}
