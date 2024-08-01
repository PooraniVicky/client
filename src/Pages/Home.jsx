import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import { Card } from 'antd';
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
    <Container style={{ padding: '2rem' }}>
      <div className="text-center mb-5">
        <Typography variant="h1" style={{ ...styles.title, marginBottom: '20px' }}>
          <img src="http://clipart-library.com/image_gallery2/Education.png" style={{ width: '40%', maxWidth: '100px' }} className="card-img-top" alt="..." />
          Welcome to KnowledgeBridge
        </Typography>
        <Typography variant="h6" style={{ ...styles.text, marginBottom: '30px' }}>
          Enhance your learning experience with our advanced e-learning platform.
        </Typography>
        <Link to="/register">
          <Button
            variant="contained"
            color="warning"
            style={{ borderRadius: '20px' }}
          >
            Get Started
          </Button>
        </Link>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', textAlign: 'center' }}>
          Why Choose KnowledgeBridge?
        </Typography>

        <Typography variant="body1" paragraph>
          At KnowledgeBridge, our mission is to provide a comprehensive and engaging learning experience. Whether you're looking to improve your coding skills or advance in your career, we offer a variety of features to help you succeed:
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Card style={{ minHeight: '210px' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                <img src="https://static.vecteezy.com/system/resources/previews/000/663/196/original/vector-learning-people-set-isolated-on-white-background.jpg" style={{ width: '40%', maxWidth: '100px' }} className="card-img-top" alt="..." />
                Personalized Learning
              </Typography>
              <Typography variant="body2">
                Tailor your learning journey with customized course materials and assignments based on your individual needs and progress.
              </Typography>
            </Card>

          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={{ minHeight: '210px' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                <img src="https://wallpaperaccess.com/full/2384076.png" style={{ width: '40%', maxWidth: '100px' }} className="card-img-top" alt="..." />
                Interactive Quizzes
              </Typography>
              <Typography variant="body2">
                Challenge yourself with interactive quizzes that test your knowledge and track your performance over time.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card style={{ minHeight: '210px' }}>
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                <img src="https://media.istockphoto.com/vectors/progress-bar-chart-vector-id468140701?k=6&m=468140701&s=612x612&w=0&h=l5MuUQT2dmPgaQ9k3G0WNEKoKYya2vTVyd7Xm6cVDw4=" style={{ width: '40%', maxWidth: '100px' }} className="card-img-top" alt="..." />
                Progress Tracking
              </Typography>
              <Typography variant="body2">
                Monitor your progress with detailed reports and insights, helping you stay motivated and on track to achieve your learning goals.
              </Typography>
            </Card>

          </Grid>
        </Grid>
      </div>

    </Container>
  );
}

export default Home;
