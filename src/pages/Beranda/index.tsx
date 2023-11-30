import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

export default function Beranda() {
  return (
    <main>
      <header className="bg-white">
        <Navbar />
      </header>
      <hr className="text-slate-500 h-[2px] hidden md:block" />
      <Hero />
    </main>
  );
}
