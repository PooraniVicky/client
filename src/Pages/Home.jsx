import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const getResponsiveStyles = () => {
    const width = window.innerWidth;

    if (width <= 576) {
      return {
        title: { fontSize: '1.5rem' },
        text: { fontSize: '1rem' },
        button: { fontSize: '1rem', padding: '6px 12px' }
      };
    } else if (width <= 768) {
      return {
        title: { fontSize: '2rem' },
        text: { fontSize: '1.2rem' },
        button: { fontSize: '1.2rem', padding: '8px 16px' }
      };
    } else {
      return {
        title: { fontSize: '3rem' },
        text: { fontSize: '1.5rem' },
        button: { fontSize: '1.5rem', padding: '10px 20px' }
      };
    }
  };

  const styles = getResponsiveStyles();

  return (
    <div className="container" >
      <div className="card text border-0 rounded-0 w-100 p-0" style={{background: 'none'}}>
        {/* <img 
          src="https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-tech-artificial-intelligence-banner-background-image_210798.jpg" 
          className="card-img" 
          alt="Background"
          style={{ height: '100%', objectFit: 'cover' }}
        /> */}
       
          <h1 
            className="card-title pacifico-regular" 
            // style={{ color: '#ffffff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', ...styles.title }}
          >
            Welcome to KnowledgeBridge
          </h1>
          <p 
            className="card-text asap" 
            // style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', ...styles.text }}
          >
            Enhance your learning experience with our advanced e-learning platform.
          </p>
          <Link to="/register">
            <button 
              className="btn btn-dark mb-3" 
              style={{ borderRadius: '20px', ...styles.button }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>
  );
}

export default Home;
