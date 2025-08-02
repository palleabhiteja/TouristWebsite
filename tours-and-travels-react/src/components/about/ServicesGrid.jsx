// import './global.css'  // Add this line

const ServicesGrid = () => {
    const services = [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Customized Tour Packages',
        description: 'Tailored itineraries designed to match your specific interests, timeframe, and budget. Our expert planners work with you to create the perfect journey.'
      },
      {
        id: 2,
        image: '/assets/images/hotel.avif',
        title: 'Luxury Hotel Bookings',
        description: 'Partnerships with India\'s finest 5-star hotels and heritage properties ensure you experience world-class hospitality during your travels.'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Adventure Expeditions',
        description: 'Thrilling experiences for adventure enthusiasts, including trekking in the Himalayas, wildlife safaris, and water sports in Goa.'
      }
    ];
  
    const hotelPartners = [
      {
        id: 1,
        image: '/assets/images/india-taj.jpg',
        title: 'Taj Palace Hotels',
        description: 'Experience the legendary hospitality of the Taj Group, with their blend of modern luxury and traditional Indian opulence. From the iconic Taj Mahal Palace in Mumbai to the majestic Taj Lake Palace in Udaipur.'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'The Oberoi Group',
        description: 'Synonymous with unparalleled luxury and impeccable service, The Oberoi hotels offer extraordinary experiences in breathtaking locations across India, from bustling cities to serene natural settings.'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        title: 'Heritage Properties',
        description: 'Stay in converted palaces, forts, and havelis that offer a glimpse into India\'s royal past while providing modern amenities. These unique accommodations add an authentic dimension to your travel experience.'
      }
    ];
  
    return (
      <>
        <section className="about-section">
          <h2>Our Services</h2>
          <p>
            We offer a comprehensive range of travel services designed to cater to different preferences, 
            budgets, and interests. From luxury tours to adventure expeditions, our expert team ensures 
            that every aspect of your journey is meticulously planned and executed.
          </p>
          
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-img">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Luxury Hotel Partners</h2>
          <p>
            We collaborate with India's most prestigious hotel chains and independent luxury properties to 
            ensure our clients enjoy world-class accommodations during their travels. Our hotel partners 
            are carefully selected based on their service excellence, location advantages, and authentic 
            experiences they offer.
          </p>
          
          <div className="services-grid">
            {hotelPartners.map(partner => (
              <div key={partner.id} className="service-card">
                <div className="service-img">
                  <img src={partner.image} alt={partner.title} />
                </div>
                <div className="service-content">
                  <h3>{partner.title}</h3>
                  <p>{partner.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </>
    );
  };
  
  export default ServicesGrid;