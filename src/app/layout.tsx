import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/shared/CustomCursor";
import ParticleBackground from "@/components/shared/ParticleBackground";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "0xacun3tix | Futuristic Cybersecurity Portfolio",
  description: "Elite cybersecurity researcher and penetration tester portfolio showcasing advanced security tools, projects, and insights.",
  keywords: ["cybersecurity", "penetration tester", "ethical hacker", "security researcher", "portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} dark antialiased scroll-smooth`}
    >
      <body className="font-outfit min-h-screen bg-cyber-black text-foreground selection:bg-cyber-cyan/30 selection:text-cyber-cyan overflow-x-hidden">
        <ParticleBackground />
        <CustomCursor />
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="scanline" />
          <main className="flex-grow">{children}</main>
          <Toaster position="bottom-right" theme="dark" />
        </div>
      </body>
    </html>
  );
}
