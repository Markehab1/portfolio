import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { TechStrip } from "@/components/sections/tech-strip";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStrip />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </>
  );
}
