// import './global.css'  // Add this line

const AboutSections = () => {
    return (
      <>
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2010, our Tours and Travels company began with a simple mission: to showcase the incredible 
            beauty and cultural richness of India to travelers from around the world. What started as a small team 
            of passionate travel enthusiasts has grown into one of India's most trusted travel companies.
          </p>
          
          <div className="two-column">
            <div className="column">
              <img 
                src="/assets/images/all-in-one.jpg" 
                alt="India Tourism Highlights" 
                style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }} 
              />
            </div>
            <div className="column">
              <p>
                Our journey began when our founder, Raj Sharma, returned from his travels across Europe and realized 
                that India's tourism potential was vastly underrepresented on the global stage. With deep roots in 
                various regions of India and extensive knowledge of the country's hidden gems, Raj assembled a team 
                of like-minded professionals who shared his vision.
              </p>
              <p>
                Over the years, we've grown from offering simple guided tours to providing comprehensive travel 
                experiences that include luxury accommodations, personalized itineraries, and authentic cultural 
                immersions. Our commitment to excellence, sustainability, and authentic experiences has earned us 
                numerous industry awards and the trust of thousands of satisfied travelers.
              </p>
            </div>
          </div>
        </section>
        
        <section className="about-section">
          <h2>Our Mission & Values</h2>
          <p>
            At our core, we believe that travel should be transformative, educational, and respectful of local 
            communities and environments. Our mission is to create memorable journeys that showcase the true essence 
            of India while ensuring that tourism benefits local communities and preserves cultural heritage.
          </p>
          
          <div className="two-column">
            <div className="column">
              <h3 style={{ color: '#2f90ae', marginBottom: '15px' }}>Our Values</h3>
              <ul style={{ listStylePosition: 'inside', marginBottom: '20px', lineHeight: '1.6' }}>
                <li><strong>Authenticity:</strong> We provide genuine experiences that reflect India's true culture and traditions.</li>
                <li><strong>Excellence:</strong> We strive for the highest standards in service and customer satisfaction.</li>
                <li><strong>Sustainability:</strong> We promote responsible tourism that respects and preserves natural and cultural resources.</li>
                <li><strong>Innovation:</strong> We continuously evolve our offerings to meet the changing needs of modern travelers.</li>
                <li><strong>Community:</strong> We support local communities through employment and cultural exchange.</li>
              </ul>
            </div>
            <div className="column">
              <img 
                src="/assets/images/all-in-two.webp" 
                alt="India Cultural Experience" 
                style={{ width: '100%', height: 'auto', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }} 
              />
            </div>
          </div>
        </section>
        
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">12+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25,000+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">150+</div>
              <div className="stat-label">Tour Destinations</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>
        </section>
      </>
    );
  };
  
  export default AboutSections;