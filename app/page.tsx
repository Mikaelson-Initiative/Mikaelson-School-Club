import Header from './components/Header';
import Hero from './components/Hero';
import StatBar from './components/StatBar';
import MissionSection from './components/MissionSection';
import CorePillars from './components/CorePillars';
import SystemSection from './components/SystemSection';
import ChampionSection from './components/ChampionSection';
import Testimonials from './components/Testimonials';
import GetInvolvedSection from './components/GetInvolvedSection';
import Footer from './components/Footer';

export const metadata = {
  title: 'Mikaelson School Club - Every Student can lead.',
  description:
    'Building the next generation of African leaders through habit building, leadership, and digital literacy.',
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <StatBar />
      <MissionSection />
      <CorePillars />
      <SystemSection />
      <ChampionSection />
      <Testimonials />
      <GetInvolvedSection />
      <Footer />
    </>
  );
}
