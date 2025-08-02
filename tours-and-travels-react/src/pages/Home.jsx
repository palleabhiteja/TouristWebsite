import { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Carousel from '../components/common/Carousel';
import PackagesSection from '../components/home/PackagesSection';
import HotelsSection from '../components/home/HotelsSection';
// import './global.css'  // Add this line

const Home = () => {
  return (
    <>
      <Header />
      <main className="content">
        <Carousel />
        <PackagesSection />
        <HotelsSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;