import Header from './components/Header';
import Hero from './components/Hero';
import MissionSection from './components/MissionSection';
import CorePillars from './components/CorePillars';
import ChampionSection from './components/ChampionSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata = {
  title: 'Mikaelson School Club | Every student can lead.',
  description: 'Building the next generation of African leaders through habit building, leadership, and digital literacy.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Header />
      <main className="pt-20">
        <Hero />
        <MissionSection />
        <CorePillars />
        <ChampionSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
