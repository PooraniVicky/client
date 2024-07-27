// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../ContextAPI/AuthContext';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { QuizContext } from '../ContextAPI/QuizContext';
// import { Container, Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';
// import { AssignmentSubmissionContext } from '../ContextAPI/AssignmentSubmissionContext';

// const ProgressReport = ({ studentId, courseId }) => {
//   const { assignments, fetchAssignmentsByCourseId } = useContext(AssignmentContext);
//   const { quizzes, fetchQuizzesByCourseId, fetchTotalQuizGrade, totalQuizGrade } = useContext(QuizContext);
//   const { submissions, submissionCount, fetchSubmissionsByCourse, loading, error } = useContext(AssignmentSubmissionContext);
//   const [completedAssignments, setCompletedAssignments] = useState(0);
//   const [completedQuizzes, setCompletedQuizzes] = useState(0);

//   useEffect(() => {
//     if (courseId) {
//       fetchSubmissionsByCourse(courseId);
//       fetchTotalQuizGrade(courseId); // Fetch total quiz grade when courseId changes
//     }
//   }, [courseId, fetchSubmissionsByCourse, fetchTotalQuizGrade]);

//   useEffect(() => {
//     // Calculate completed assignments and quizzes based on submissions
//     const completedAssignmentIds = new Set(submissions.map(sub => sub.assignmentId));
//     setCompletedAssignments(completedAssignmentIds.size);

//     // Assuming similar logic applies to quizzes if you have quiz submission data in the context
//     const completedQuizIds = new Set(submissions.filter(sub => sub.type === 'quiz').map(sub => sub.quizId));
//     setCompletedQuizzes(completedQuizIds.size);
//   }, [submissions]);

//   const totalAssignments = assignments.length;
//   const totalQuizzes = quizzes.length;

//   return (
//     <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, maxWidth: '1200px' }}>
//       <CardActionArea sx={{ width: '100%', mb: 3, display: 'grid', justifyContent: "center" }}>
//         <CardMedia
//           component="img"
//           height="180"
//           sx={{
//             maxWidth: '400px',
//             objectFit: 'cover',
//             padding: '30px'
//           }}
//           image="https://www.studentprogress.org/wp-content/uploads/2021/09/student-progress-5.png"
//           alt="Progress Report"
//         />
//       </CardActionArea>

//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={12} sm={8} md={6}>
//           <Card sx={{ width: '100%' }}>
//             <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image="https://img.freepik.com/free-vector/progress-concept-illustration_114360-1752.jpg"
//                 alt="Assignments"
//                 sx={{ width: { md: '50%' }, objectFit: 'cover' }}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5">
//                   Total Assignments: {totalAssignments}
//                 </Typography>
//                 <Typography variant="h6">
//                   Completed Assignments: {completedAssignments}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         </Grid>
//         <Grid item xs={12} sm={8} md={6}>
//           <Card sx={{ width: '100%' }}>
//             <CardActionArea sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
//               <CardMedia
//                 component="img"
//                 height="300"
//                 image="https://static.vecteezy.com/system/resources/previews/002/744/945/non_2x/progress-report-illustration-vector.jpg"
//                 alt="Quizzes"
//                 sx={{ width: { md: '50%' }, objectFit: 'cover' }}
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5">
//                   Total Quizzes: {totalQuizzes}
//                 </Typography>
//                 <Typography variant="h6">
//                   Completed Quizzes: {completedQuizzes}
//                 </Typography>
//                 <Typography variant="h6">
//                   Total Quiz Grade: {totalQuizGrade}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default ProgressReport;
import React, { useContext, useEffect, useState } from 'react';
import { AssignmentContext } from '../ContextAPI/AssignmentContext';
import { Container, Card, CardActionArea, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const ProgressReport = ({ courseId }) => {
    const { assignments, submissions, totalQuizGrade, fetchAssignmentsByCourseId } = useContext(AssignmentContext);
    const [completedAssignments, setCompletedAssignments] = useState(0);
    const [completedQuizzes, setCompletedQuizzes] = useState(0);

    useEffect(() => {
        if (courseId) {
            fetchAssignmentsByCourseId(courseId);
            // fetchTotalQuizGrade should be called separately if needed
        }
    }, [courseId, fetchAssignmentsByCourseId]);

    useEffect(() => {
        // Calculate completed assignments based on submissions
        const completedAssignmentIds = new Set(submissions.map(sub => sub.assignmentId));
        setCompletedAssignments(completedAssignmentIds.size);

        // Assuming similar logic applies to quizzes if you have quiz submission data
        // Example calculation assuming quizzes are available in submissions
        const completedQuizIds = new Set(submissions.filter(sub => sub.type === 'quiz').map(sub => sub.quizId));
        setCompletedQuizzes(completedQuizIds.size);
    }, [submissions]);

    const totalAssignments = assignments.length;
    // Assume you fetch quizzes in a similar way if needed

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
                <Grid item xs={12} sm={8} md={6}>
                    <Card sx={{ width: '100%' }}>
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
                <Grid item xs={12} sm={8} md={6}>
                    <Card sx={{ width: '100%' }}>
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
                                    Total Quizzes: {/* Add total quizzes if you have data */}
                                </Typography>
                                <Typography variant="h6">
                                    Completed Quizzes: {completedQuizzes}
                                </Typography>
                                <Typography variant="h6">
                                    Total Quiz Grade: {totalQuizGrade}
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
