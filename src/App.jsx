import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Intro from './components/Intro';
import Services from './components/Services';
import Work from './components/Work';
import Clients from './components/Clients';
import Creators from './components/Creators';
import Process from './components/Process';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Intro />
        <Services />
        <Work />
        <Clients />
        <Creators />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
