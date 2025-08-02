import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import './global.css'  // Add this line

const Carousel = () => {
  const slides = [
    {
      type: 'video',
      src: '/assets/videos/taj-vid.mp4',
      title: 'Iconic Landmarks',
      description: 'Visit India\'s most famous monuments and historical sites'
    },
    {
      type: 'video',
      src: '/assets/videos/karala-vid.mp4',
      title: 'Kerala Backwaters',
      description: 'Experience the serene beauty of God\'s Own Country'
    },
    {
      type: 'video',
      src: '/assets/videos/forest-vid.mp4',
      title: 'Enchanting Forests',
      description: 'Explore the rich biodiversity of India\'s forests'
    },
    {
      type: 'image',
      src: '/assets/images/raja-img.jpg',
      title: 'Ancient Temples',
      description: 'Discover India\'s rich cultural heritage and spiritual sites'
    },
    {
      type: 'video',
      src: '/assets/videos/typ-vid.mp4',
      title: 'Colorful Culture',
      description: 'Immerse yourself in India\'s vibrant traditions and festivals'
    },
    {
      type: 'video',
      src: '/assets/videos/sea-vid.mp4',
      title: 'Coastal Beauty',
      description: 'Relax on India\'s stunning beaches and coastal areas'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="carousel-container">
      <div className="carousel" id="home-carousel">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
          >
            {slide.type === 'video' ? (
              <video autoPlay muted loop>
                <source src={slide.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={slide.src} alt={slide.title} />
            )}
            <div className="carousel-caption">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
        
        <button className="carousel-btn carousel-prev" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="carousel-btn carousel-next" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Carousel;