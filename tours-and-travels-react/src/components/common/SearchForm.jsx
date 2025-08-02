// import './global.css'  // Add this line

const SearchForm = ({ onClose }) => {
    return (
      <div className="search-form-container" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="close-form" onClick={onClose}>&times;</div>
        <div className="search-form">
          <h2>Find Your Perfect Trip</h2>
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input type="text" id="destination" placeholder="Where do you want to go?" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="departure-date">Departure Date</label>
              <input type="date" id="departure-date" />
            </div>
            <div className="form-group">
              <label htmlFor="return-date">Return Date</label>
              <input type="date" id="return-date" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="adults">Adults</label>
              <select id="adults">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="children">Children</label>
              <select id="children">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
          <div className="search-form-buttons">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="search-btn">Search</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchForm;