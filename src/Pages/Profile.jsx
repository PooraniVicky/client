import React, { useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AuthContext } from '../ContextAPI/AuthContext';

const Profile = () => {
    const { users } = useContext(AuthContext);

    // Handle initial state or loading state
    if (!users) {
        return (
            <Container className="mt-4">
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Body>
                                <Card.Title className="text-center mb-4 pacifico-regular" style={{ fontSize: '2rem' }}>
                                    Loading...
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    // Display user profile once data is available
    return (
        <Container className="mt-4">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center mb-4 pacifico-regular" style={{ fontSize: '2rem' }}>
                                User Profile
                            </Card.Title>
                            <Row>
                                <Col md={6}>
                                    <p className="fw-bold">First Name:</p>
                                    <p>{users.firstName}</p>
                                </Col>
                                <Col md={6}>
                                    <p className="fw-bold">Last Name:</p>
                                    <p>{users.lastName}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p className="fw-bold">Email:</p>
                                    <p>{users.email}</p>
                                </Col>
                                <Col md={6}>
                                    <p className="fw-bold">Role:</p>
                                    <p>{users.role}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <StudentProgressReport />

        </Container>
    );
};

export default Profile;
