import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import AboutHero from '../components/about/AboutHero';
import AboutSections from '../components/about/AboutSections';
import ServicesGrid from '../components/about/ServicesGrid';
// import './global.css'  // Add this line

const About = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <AboutHero />
        <AboutSections />
        <ServicesGrid />
      </main>
      <Footer />
    </>
  );
};

export default About;