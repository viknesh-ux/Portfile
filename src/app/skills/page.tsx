import Navbar from "@/components/shared/Navbar";
import Skills from "@/components/sections/Skills";
import CertificatesList from "@/components/sections/CertificatesList";
import Footer from "@/components/shared/Footer";
import CommandPalette from "@/components/shared/CommandPalette";

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-cyber-black">
      <Navbar />
      <CommandPalette />
      
      {/* Background Decorative Grid */}
      <div className="fixed inset-0 cyber-grid opacity-5 pointer-events-none" />
      
      <main className="flex-grow pt-32 relative z-10">
        <div className="container mx-auto px-6 mb-32">
          {/* Main Technical Stack */}
          <div className="mb-20">
            <Skills />
          </div>
          
          {/* Separator / Divider */}
          <div className="relative py-20">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-cyber-black px-4 text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em]">End_Transmission // Begin_Verification</span>
            </div>
          </div>
          
          {/* Certificates Section */}
          <CertificatesList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
