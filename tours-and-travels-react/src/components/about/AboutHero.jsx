// import './global.css'  // Add this line

const AboutHero = () => {
    return (
      <section className="about-hero">
        <img 
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
          alt="India Tourism" 
        />
        <div className="hero-overlay">
          <h1>About Our Travel Company</h1>
          <p>Discover the story behind our passion for creating unforgettable travel experiences across India</p>
        </div>
      </section>
    );
  };
  
  export default AboutHero;