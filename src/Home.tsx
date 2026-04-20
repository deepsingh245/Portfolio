import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import PortfolioChatbot from "@/components/chat/PortfolioChatbot";
import { Meteors } from "./components/magicui/meteors";
import About from "./segments/About";
import Contact from "./segments/Contact";
import Header from "./segments/Header";
import Experience from "./segments/Experience";
import Achievements from "./segments/Achievements";
import Projects from "./segments/Projects";
import Skills from "./segments/Skills";
import DockLayout from "./shared/Dock";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Meteors className="-z-10" />
      <AnimatedThemeToggler className="fixed top-0 right-0 m-4 z-50" />
      <div className="border-x-2 md:w-[80rem] m-auto min-h-full  pb-20">
        <Header />
        <About />
        <Skills />
        <Experience />
        <Achievements />
        <Projects />
        <Contact />
      </div>
      <PortfolioChatbot />
      <DockLayout />
    </div>
  );
};

export default Home;
