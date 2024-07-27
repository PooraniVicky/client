
// import React, { useContext, useEffect, useState } from 'react';
// import { QuizContext } from '../ContextAPI/QuizContext';
// import { AuthContext } from '../ContextAPI/AuthContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, IconButton, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Paper } from '@mui/material';
// import { AiOutlineInfoCircle } from 'react-icons/ai';
// import { message } from 'antd';
// import { Container, Row, Col } from 'react-bootstrap';
// import QuizSubmissionForm from './QuizSubmissionForm';

// const QuizList = () => {
//     const { fetchQuizzesByCourseId, fetchQuizById, deleteQuiz, quizzes, loading, updateQuizGrade } = useContext(QuizContext);
//     const { users } = useContext(AuthContext);
//     const { courseId } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (courseId) {
//             fetchQuizzesByCourseId(courseId);
//         }
//     }, [courseId]);

//     const handleTakeQuiz = async (quizId) => {
//         console.log("quizId-List", quizId);
//         await fetchQuizById(quizId);
//         navigate(`/quiz-submission/${quizId}`);
//     };

//     const handleDeleteQuiz = async (quizId) => {
//         try {
//             await deleteQuiz(quizId);
//             message.success('Quiz deleted successfully!');
//             fetchQuizzesByCourseId(courseId);
//         } catch (error) {
//             console.error('Error deleting quiz:', error);
//             message.error('Quiz failed to delete.');
//         }
//     };

//     const handleAddQuiz = () => {
//         navigate(`/create-quiz/${courseId}`);
//     };

//     const handleEditQuiz = (quizId) => {
//         navigate(`/quiz-edit/${quizId}`);
//     };

//     const handleGradeSubmit = (quizId, grade) => {
//         updateQuizGrade(quizId, grade);
//     };

//     return (
//         <Container>
//             <TableContainer component={Paper}>
//                 <Row className="mt-4">
//                     <Col md={9} className="text-center">
//                         <h2 className='pacifico-regular' style={{ color: 'darkcyan' }}>Quizzes</h2>
//                     </Col>
//                     <Col md={3} className="text-end">
//                         {users && users.role === 'admin' && (
//                             <Button variant="contained" color="success" onClick={handleAddQuiz}>Add Quiz</Button>
//                         )}
//                     </Col>
//                 </Row>
//                 <Table aria-label="collapsible table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell><strong>Quiz</strong></TableCell>
//                             <TableCell align="center"><strong>Questions</strong></TableCell>
//                             <TableCell align="center"><strong>Take Quiz</strong></TableCell>
//                             <TableCell align="center"><strong>Status</strong></TableCell>
//                             <TableCell align="center"><strong>Score</strong></TableCell>
//                             {users && users.role === 'admin' && <TableCell align="center"><strong>Actions</strong></TableCell>}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow>
//                                 <TableCell colSpan={6} align="center">Loading quizzes...</TableCell>
//                             </TableRow>
//                         ) : quizzes.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={6} align="center">No quizzes available.</TableCell>
//                             </TableRow>
//                         ) : (
//                             quizzes.map((quiz) => (
//                                 <React.Fragment key={quiz._id}>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                             {quiz.title}
//                                         </TableCell>
//                                         <TableCell align="center">{quiz.questions.length}</TableCell>
//                                         <TableCell align="center">
//                                             <Button variant="contained" color="primary" onClick={() => handleTakeQuiz(quiz._id)}>
//                                                 Attend
//                                             </Button>
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             {quiz.submittedDate ? 'Completed' : 'Pending'}
//                                         </TableCell>
//                                         <TableCell align="center">
//                                             {quiz.grade ? quiz.grade : (
//                                                 <IconButton color="warning" size="small">
//                                                     <AiOutlineInfoCircle />
//                                                     Yet to be submitted
//                                                 </IconButton>
//                                             )}
//                                         </TableCell>
//                                         {users && users.role === 'admin' && (
//                                             <TableCell align="center">
//                                                 <Box display="flex" justifyContent="center">
//                                                     <Button variant="outlined" color="warning" className="me-3" onClick={() => handleEditQuiz(quiz._id)}>Edit</Button>
//                                                     <Button variant="outlined" color="error" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</Button>
//                                                 </Box>
//                                             </TableCell>
//                                         )}
//                                     </TableRow>
//                                     {/* <QuizSubmissionForm quizId={quiz._id} onGradeSubmit={handleGradeSubmit} /> */}
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default QuizList;
import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../ContextAPI/QuizContext';
import { AuthContext } from '../ContextAPI/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Paper } from '@mui/material';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { message } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import QuizSubmissionList from './QuizSubmissionList'; // Import the new component

const QuizList = () => {
    const { fetchQuizzesByCourseId, fetchQuizById, deleteQuiz, quizzes, loading, updateQuizGrade } = useContext(QuizContext);
    const { users } = useContext(AuthContext);
    const { courseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (courseId) {
            fetchQuizzesByCourseId(courseId);
        }
    }, [courseId]);

    const handleTakeQuiz = async (quizId) => {
        await fetchQuizById(quizId);
        navigate(`/quiz-submission/${quizId}`);
    };

    const handleDeleteQuiz = async (quizId) => {
        try {
            await deleteQuiz(quizId);
            message.success('Quiz deleted successfully!');
            fetchQuizzesByCourseId(courseId);
        } catch (error) {
            console.error('Error deleting quiz:', error);
            message.error('Quiz failed to delete.');
        }
    };

    const handleAddQuiz = () => {
        navigate(`/create-quiz/${courseId}`);
    };

    const handleEditQuiz = (quizId) => {
        navigate(`/quiz-edit/${quizId}`);
    };

    const handleGradeSubmit = (quizId, grade) => {
        updateQuizGrade(quizId, grade);
    };

    const handleViewSubmissions = (quizId) => {
        navigate(`/quiz-submission-list/${quizId}`); // Navigate to the submissions list
    };

    return (
        <Container>
            <TableContainer component={Paper}>
                <Row className="mt-4">
                    <Col md={9} className="text-center">
                        <h2 className='pacifico-regular' style={{ color: 'darkcyan' }}>Quizzes</h2>
                    </Col>
                    <Col md={3} className="text-end">
                        {users && users.role === 'admin' && (
                            <Button variant="contained" color="success" onClick={handleAddQuiz}>Add Quiz</Button>
                        )}
                    </Col>
                </Row>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Quiz</strong></TableCell>
                            <TableCell align="center"><strong>Questions</strong></TableCell>
                            {users && users.role === 'student' && <TableCell align="center"><strong>Take Quiz</strong></TableCell>}
                            {users && users.role === 'student' && <TableCell align="center"><strong>Status</strong></TableCell>}
                            {users && users.role === 'student' && <TableCell align="center"><strong>Score</strong></TableCell>}
                            {users && users.role === 'admin' && <TableCell align="center"><strong>Actions</strong></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">Loading quizzes...</TableCell>
                            </TableRow>
                        ) : quizzes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No quizzes available.</TableCell>
                            </TableRow>
                        ) : (
                            quizzes.map((quiz) => (
                                <React.Fragment key={quiz._id}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {quiz.title}
                                        </TableCell>
                                        <TableCell align="center">{quiz.questions.length}</TableCell>
                                        {users && users.role === 'student' && (
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" onClick={() => handleTakeQuiz(quiz._id)}>
                                                Attend
                                            </Button>
                                        </TableCell>
                                        )}
                                        {users && users.role === 'student' && (
                                        <TableCell align="center">
                                            {quiz.submittedDate ? 'Completed' : 'Pending'}
                                        </TableCell>
                                        )}
                                        {users && users.role === 'student' && (
                                        <TableCell align="center">
                                            {quiz.grade ? quiz.grade : (
                                                <IconButton color="warning" size="small">
                                                    <AiOutlineInfoCircle />
                                                    Yet to be submitted
                                                </IconButton>
                                            )}
                                        </TableCell>
                                        )}
                                        {users && users.role === 'admin' && (
                                            <TableCell align="center">
                                                <Box display="flex" justifyContent="center">
                                                    {/* <Button variant="outlined" color="warning" className="me-3 mt-2" onClick={() => handleEditQuiz(quiz._id)}>Edit</Button> */}
                                                    <Button variant="outlined" color="error" className="me-3 mt-2"  onClick={() => handleDeleteQuiz(quiz._id)}>Delete</Button>
                                                    <Button variant="outlined" color="secondary" className="me-3 mt-2" onClick={() => handleViewSubmissions(quiz._id)}>View Submissions</Button>

                                                </Box>
                                            </TableCell>
                                        )}
                                        
                                    </TableRow>
                                </React.Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default QuizList;
