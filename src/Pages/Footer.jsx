import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <div >
            <footer className="bg-dark text-light">
                <Row className='container-fluid py-2 '>

                    <Col md={2} className="text-center ">
                        <p>&copy; {new Date().getFullYear()} KnowledgeBridge. All rights reserved.</p>
                    </Col>
                    <Col md={8} className="text-center text-md-left  mb-md-0">
                        <h5>KnowledgeBridge</h5>
                        <p>Your gateway to limitless learning.</p>
                    </Col>
                    <Col md={2} className="text-center text-md-right">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none"> <i className="bi bi-facebook"></i></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none"> <i className="bi bi-twitter"></i></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none"> <i className="bi bi-linkedin"></i></a>
                        </ul>
                    </Col>
                </Row>

            </footer>
        </div>
    );
};

export default Footer;
