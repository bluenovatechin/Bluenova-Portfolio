import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Clients from './components/Clients';
import LogoLab from './components/LogoLab';
import Instagram from './components/Instagram';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Ambient from './components/Ambient';
import useHashlessLinks from './useHashlessLinks';

export default function App() {
  useHashlessLinks();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Ambient />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Projects />
        <Clients />
        <LogoLab />
        <Instagram />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
