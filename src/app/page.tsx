import { ScissorCursor } from "@/components/ScissorCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Stats } from "@/components/Stats";
import { Features } from "@/components/Features";
import { StyleMatch } from "@/components/StyleMatch";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScissorCursor />
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Stats />
        <Features />
        <StyleMatch />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
