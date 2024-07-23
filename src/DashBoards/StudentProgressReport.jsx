import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../ContextAPI/AuthContext';
import { AssignmentContext } from '../ContextAPI/AssignmentContext';
import { QuizContext } from '../ContextAPI/QuizContext';
import { Container, Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { AssignmentSubmissionContext } from '../ContextAPI/AssignmentSubmissionContext';

const ProgressReport = ({ studentId, courseId }) => {
  const { assignments } = useContext(AssignmentContext);
  const { quizzes } = useContext(QuizContext);
  const { submissions, submissionCount, fetchSubmissionsByCourse, loading, error } = useContext(AssignmentSubmissionContext);
  const [completedAssignments, setCompletedAssignments] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);

  useEffect(() => {
    if (courseId) {
      fetchSubmissionsByCourse(courseId);
    }
  }, [courseId, fetchSubmissionsByCourse]);

  useEffect(() => {
    // Calculate completed assignments and quizzes based on submissions
    const completedAssignmentIds = new Set(submissions.map(sub => sub.assignmentId));
    setCompletedAssignments(completedAssignmentIds.size);

    // Assuming similar logic applies to quizzes if you have quiz submission data in the context
    const completedQuizIds = new Set(submissions.filter(sub => sub.type === 'quiz').map(sub => sub.quizId));
    setCompletedQuizzes(completedQuizIds.size);
  }, [submissions]);

  const totalAssignments = assignments.length;
  const totalQuizzes = quizzes.length;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, maxWidth: '1200px' }}>
      <CardActionArea sx={{ width: '100%', mb: 3, display: 'grid', justifyContent: "center" }}>
        <CardMedia
          component="img"
          height="180"
          sx={{
            maxWidth: '400px',
            objectFit: 'cover',
            padding: '30px'
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
