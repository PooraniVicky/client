import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../ContextAPI/AuthContext';
import { AssignmentContext } from '../ContextAPI/AssignmentContext';
import { QuizContext } from '../ContextAPI/QuizContext';
import axios from 'axios';
import { Container, Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { SubmissionContext } from '../ContextAPI/SubmissionContext';

const ProgressReport = ({ studentId }) => {
  const { usersDetails, users } = useContext(AuthContext);
  const { assignments } = useContext(AssignmentContext);
  const { quizzes } = useContext(QuizContext);
  const { submissionCount } = useContext(SubmissionContext);
  const [completedAssignments, setCompletedAssignments] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);

  // useEffect(() => {
  //   const fetchStudentProgress = async () => {
  //     try {
  //       const token = localStorage.getItem('token');
  //       // Fetch completed assignments count
  //       const assignmentsResponse = await axios.get(
  //         `http://localhost:4000/apiAssignments/completed/${studentId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setCompletedAssignments(assignmentsResponse.data.completedAssignments);

  //       // Fetch completed quizzes count
  //       const quizzesResponse = await axios.get(
  //         `http://localhost:4000/apiQuizzes/completed/${studentId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setCompletedQuizzes(quizzesResponse.data.completedQuizzes);
  //     } catch (error) {
  //       console.error('Error fetching student progress:', error);
  //     }
  //   };

  //   fetchStudentProgress();
  // }, [studentId]);

  const totalAssignments = assignments.length;
  const totalQuizzes = quizzes.length;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, maxWidth: '1200px' }}>
     <CardActionArea sx={{ width: '100%', mb: 3, display: 'grid', justifyContent: "center" }}>
  <CardMedia
    component="img"
    height="180" // Adjust height to make the image smaller
    sx={{
      maxWidth: '400px', // Adjust maxWidth to constrain the width of the image
      objectFit: 'cover', // Ensures the image scales properly within the set dimensions
      padding: '30px' // Adjust padding if needed
    }}
    image="https://www.studentprogress.org/wp-content/uploads/2021/09/student-progress-5.png"
    alt="Progress Report"
  />
</CardActionArea>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <CardMedia
                component="img"
                height="300"
                image="https://img.freepik.com/free-vector/progress-concept-illustration_114360-1752.jpg"
                alt="Assignments"
                sx={{ width: { md: '50%' }, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Total Assignments: {totalAssignments}
                </Typography>
                <Typography variant="h6">
                  Completed Assignments: {completedAssignments}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <CardMedia
                component="img"
                height="300"
                image="https://static.vecteezy.com/system/resources/previews/002/744/945/non_2x/progress-report-illustration-vector.jpg"
                alt="Quizzes"
                sx={{ width: { md: '50%' }, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  Total Quizzes: {totalQuizzes}
                </Typography>
                <Typography variant="h6">
                  Completed Quizzes: {completedQuizzes}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProgressReport;
