// // import React, { useContext, useEffect, useState } from 'react';
// // import { LessonContext } from '../ContextAPI/LessonContext';
// // import { AuthContext } from '../ContextAPI/AuthContext';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { message } from 'antd';
// // import { Container, Row, Col } from 'react-bootstrap';
// // import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Collapse, Typography, Button } from '@mui/material';
// // import Paper from '@mui/material/Paper';
// // import CreateLesson from './CreateLesson';

// // const LessonList = () => {
// //     const { courseId } = useParams();
// //     const { fetchLessonsByCourseId, deleteLesson, lessons, loading: lessonLoading, updateLesson, fetchCompletedStudents } = useContext(LessonContext);
// //     const { users } = useContext(AuthContext);

// //     const [editLesson, setEditLesson] = useState(null);
// //     const [completedStudents, setCompletedStudents] = useState([]);
// //     const [showCompletedStudents, setShowCompletedStudents] = useState(null);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             console.log("courseId:", courseId);
// //             try {
// //                 console.log("Fetching lessons for course ID:", courseId);
// //                 await fetchLessonsByCourseId(courseId);
// //             } catch (error) {
// //                 console.error('Error fetching lessons:', error);
// //                 message.error('Failed to fetch lessons.');
// //             }
// //         };
// //         fetchData();
// //     }, [courseId]);

// //     const handleDeleteLesson = async (lessonId) => {
// //         try {
// //             await deleteLesson(lessonId);
// //             message.success('Lesson deleted successfully!');
// //             fetchLessonsByCourseId(courseId); // Refresh lessons
// //         } catch (error) {
// //             console.error('Error deleting lesson:', error);
// //             message.error('Failed to delete lesson.');
// //         }
// //     };

// //     const handleEditLesson = (lesson) => {
// //         setEditLesson(lesson);
// //     };

// //     const handleCreateLesson = () => {
// //         navigate(`/create-lesson/${courseId}`);
// //     };

// //     // const handleCompleteLesson = async (lessonId) => {
// //     //     try {
// //     //         await updateLesson(lessonId, { isCompleted: true });
// //     //         message.success('Lesson marked as completed!');
// //     //         fetchLessonsByCourseId(courseId); // Refresh lessons
// //     //     } catch (error) {
// //     //         console.error('Error completing lesson:', error);
// //     //         message.error('Failed to complete lesson.');
// //     //     }
// //     // };

// //     const handleStartLearning = (lessonId) => {
// //         navigate(`/lesson-detailed/${lessonId}`);
// //     };

// //     const handleViewCompletion = async (lessonId) => {
// //         try {
// //             const students = await fetchCompletedStudents(lessonId);
// //             setCompletedStudents(students);
// //             setShowCompletedStudents(prevState => (prevState === lessonId ? null : lessonId));
// //         } catch (error) {
// //             console.error('Error fetching completed students:', error);
// //             message.error('Failed to fetch completed students.');
// //         }
// //     };

// //     return (
// //         <Container>
// //             <TableContainer component={Paper}>
// //                 <Row className="mt-4">
// //                     <Col md={9} className="text-center">
// //                         <h2 className='pacifico-regular' style={{ color: 'darkcyan' }}>Lessons</h2>
// //                     </Col>
// //                     <Col md={3} className="text-end">
// //                         {users && (users.role === 'admin' || users.role === 'instructor') && (
// //                             <Button variant="contained" color="success" onClick={handleCreateLesson}>Create Lesson</Button>
// //                         )}
// //                     </Col>
// //                 </Row>
// //                 <Table aria-label="collapsible table">
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell><strong>Session</strong></TableCell>
// //                             <TableCell align="center"><strong>Actions</strong></TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {lessonLoading ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={2} align="center">Loading lessons...</TableCell>
// //                             </TableRow>
// //                         ) : lessons.length === 0 ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={2} align="center">No lessons available.</TableCell>
// //                             </TableRow>
// //                         ) : (
// //                             lessons.map((lesson) => (
// //                                 <React.Fragment key={lesson._id}>
// //                                     <TableRow>
// //                                         <TableCell component="th" scope="row">
// //                                             {lesson.session}
// //                                         </TableCell>
// //                                         <TableCell align="center">
// //                                             {users && users.role === 'student' ? (
// //                                                 <Button variant="outlined" className='me-2 mt-2' color="info" onClick={() => handleStartLearning(lesson._id)}>Start Learning</Button>
// //                                             ) : (
// //                                                 <>
// //                                                     <Button variant="outlined" className='me-2 mt-2' color="warning" onClick={() => handleEditLesson(lesson)}>
// //                                                         Edit
// //                                                     </Button>
// //                                                     <Button variant="outlined" className='me-2 mt-2' color="error" onClick={() => handleDeleteLesson(lesson._id)}>
// //                                                         Delete
// //                                                     </Button>
// //                                                     <Button variant="outlined" className='me-2 mt-2' color="secondary" onClick={() => handleViewCompletion(lesson._id)}>
// //                                                         View Completion
// //                                                     </Button>
// //                                                     <Button variant="outlined" className='me-2 mt-2' color="info" onClick={() => handleStartLearning(lesson._id)}>
// //                                                         View more
// //                                                     </Button>
// //                                                 </>
// //                                             )}
// //                                         </TableCell>
// //                                     </TableRow>
// //                                     <TableRow>
// //                                         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
// //                                             <Collapse in={showCompletedStudents === lesson._id} timeout="auto" unmountOnExit>
// //                                                 <Box margin={1}>
// //                                                     <Typography variant="h6" gutterBottom component="div">
// //                                                         Completed Students
// //                                                     </Typography>
// //                                                     {completedStudents.length > 0 ? (
// //                                                         <ul>
// //                                                             {completedStudents.map((student) => (
// //                                                                 <li key={student._id}>{student.firstName} {student.lastName}</li>
// //                                                             ))}
// //                                                         </ul>
// //                                                     ) : (
// //                                                         <Typography>No students have completed this lesson yet.</Typography>
// //                                                     )}
// //                                                 </Box>
// //                                             </Collapse>
// //                                         </TableCell>
// //                                     </TableRow>
// //                                 </React.Fragment>
// //                             ))
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {editLesson && (
// //                 <CreateLesson
// //                     lesson={editLesson}
// //                     onClose={() => setEditLesson(null)}
// //                 />
// //             )}
// //         </Container>
// //     );
// // };

// // export default LessonList;
// import React, { useContext, useEffect, useState } from 'react';
// import { LessonContext } from '../ContextAPI/LessonContext';
// import { AuthContext } from '../ContextAPI/AuthContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { message } from 'antd';
// import { Container, Row, Col } from 'react-bootstrap';
// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Collapse, Typography, Button } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import CreateLesson from './CreateLesson';

// const LessonList = () => {
//     const { courseId } = useParams();
//     const { fetchLessonsByCourseId, deleteLesson, lessons, loading: lessonLoading, fetchCompletedStudents } = useContext(LessonContext);
//     const { users } = useContext(AuthContext);

//     const [editLesson, setEditLesson] = useState(null);
//     const [completedStudents, setCompletedStudents] = useState([]);
//     const [showCompletedStudents, setShowCompletedStudents] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 await fetchLessonsByCourseId(courseId);
//             } catch (error) {
//                 console.error('Error fetching lessons:', error);
//                 message.error('Failed to fetch lessons.');
//             }
//         };
//         fetchData();
//     }, [courseId]);

//     const handleDeleteLesson = async (lessonId) => {
//         try {
//             await deleteLesson(lessonId);
//             message.success('Lesson deleted successfully!');
//             fetchLessonsByCourseId(courseId); // Refresh lessons
//         } catch (error) {
//             console.error('Error deleting lesson:', error);
//             message.error('Failed to delete lesson.');
//         }
//     };

//     const handleEditLesson = (lessonId) => {
//         setEditLesson(lessonId);
//     };

//     const handleCreateLesson = () => {
//         navigate(`/create-lesson/${courseId}`);
//     };

//     const handleStartLearning = (lessonId) => {
//         navigate(`/lesson-detailed/${lessonId}`);
//     };

//     const handleViewCompletion = async (lessonId) => {
//         try {
//             const students = await fetchCompletedStudents(lessonId);
//             setCompletedStudents(students);
//             setShowCompletedStudents(prevState => (prevState === lessonId ? null : lessonId));
//         } catch (error) {
//             console.error('Error fetching completed students:', error);
//             message.error('Failed to fetch completed students.');
//         }
//     };

//     return (
//         <Container>
//             <TableContainer component={Paper}>
//                 <Row className="mt-4">
//                     <Col md={9} className="text-center">
//                         <h2 className='pacifico-regular' style={{ color: 'darkcyan' }}>Lessons</h2>
//                     </Col>
//                     <Col md={3} className="text-end">
//                         {users && (users.role === 'admin' || users.role === 'instructor') && (
//                             <Button variant="contained" color="success" onClick={handleCreateLesson}>Create Lesson</Button>
//                         )}
//                     </Col>
//                 </Row>
//                 <Table aria-label="collapsible table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell><strong>Session</strong></TableCell>
//                             <TableCell align="center"><strong>Actions</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {lessonLoading ? (
//                             <TableRow>
//                                 <TableCell colSpan={3} align="center">Loading...</TableCell>
//                             </TableRow>
//                         ) : lessons.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={3} align="center">No Lessons Available</TableCell>
//                             </TableRow>
//                         ) : (
//                             lessons.map((lesson) => (
//                                 <TableRow key={lesson._id}>
//                                     <TableCell>{lesson.session}</TableCell>
//                                     <TableCell align="center">
//                                         <Button variant="contained" color="primary" onClick={() => handleStartLearning(lesson._id)}>Start Learning</Button>
//                                         {users && (users.role === 'admin' || users.role === 'instructor') && (
//                                             <>
//                                                 <Button variant="contained" color="info" onClick={() => handleEditLesson(lesson._id)}>Edit</Button>
//                                                 <Button variant="contained" color="error" onClick={() => handleDeleteLesson(lesson._id)}>Delete</Button>
//                                             </>
//                                         )}
//                                         <Button variant="contained" color="secondary" onClick={() => handleViewCompletion(lesson._id)}>
//                                             {showCompletedStudents === lesson._id ? 'Hide Completed Students' : 'View Completed Students'}
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             {showCompletedStudents && (
//                 <Collapse in={showCompletedStudents === lesson._id}>
//                     <Box margin={1}>
//                         <Typography variant="h6">Completed Students</Typography>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Student Name</TableCell>
//                                     <TableCell>Completion Date</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {completedStudents.length === 0 ? (
//                                     <TableRow>
//                                         <TableCell colSpan={2} align="center">No students have completed this lesson yet.</TableCell>
//                                     </TableRow>
//                                 ) : (
//                                     completedStudents.map(student => (
//                                         <TableRow key={student._id}>
//                                             <TableCell>{student.name}</TableCell>
//                                             <TableCell>{student.completedAt}</TableCell>
//                                         </TableRow>
//                                     ))
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </Box>
//                 </Collapse>
//             )}
//             {editLesson && (
//                 <CreateLesson lesson={editLesson} />
//             )}
//         </Container>
//     );
// };

// export default LessonList;
import React, { useContext, useEffect, useState } from 'react';
import { LessonContext } from '../ContextAPI/LessonContext';
import { AuthContext } from '../ContextAPI/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Collapse, Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import CreateLesson from './CreateLesson';

const LessonList = ({lessonId}) => {
    const { courseId } = useParams();
    const { fetchLessonsByCourseId, deleteLesson, lessons, loading: lessonLoading, fetchCompletedStudents } = useContext(LessonContext);
    const { users } = useContext(AuthContext);

    const [editLesson, setEditLesson] = useState(null);
    const [completedStudents, setCompletedStudents] = useState([]);
    const [showCompletedStudents, setShowCompletedStudents] = useState(null);
    const navigate = useNavigate();
console.log("editLesson:", editLesson)
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchLessonsByCourseId(courseId);
            } catch (error) {
                console.error('Error fetching lessons:', error);
                message.error('Failed to fetch lessons.');
            }
        };
        fetchData();
    }, [courseId]);

    const handleDeleteLesson = async (lessonId) => {
        try {
            await deleteLesson(lessonId);
            message.success('Lesson deleted successfully!');
            fetchLessonsByCourseId(courseId); // Refresh lessons
        } catch (error) {
            console.error('Error deleting lesson:', error);
            message.error('Failed to delete lesson.');
        }
    };

    const handleEditLesson = (lessonId) => {
        
        setEditLesson(lessonId);
        console.log("lesson:", lessonId);
    };

    const handleCreateLesson = () => {
        navigate(`/create-lesson/${courseId}`);
    };

    const handleStartLearning = (lessonId) => {
        navigate(`/lesson-detailed/${lessonId}`);
    };

    const handleViewCompletion = async (lessonId) => {
        try {
            const students = await fetchCompletedStudents(lessonId);
            setCompletedStudents(students);
            setShowCompletedStudents(prevState => (prevState === lessonId ? null : lessonId));
        } catch (error) {
            console.error('Error fetching completed students:', error);
            message.error('Failed to fetch completed students.');
        }
    };

    return (
        <Container>
            <TableContainer component={Paper}>
                <Row className="mt-4">
                    <Col md={9} className="text-center">
                        <h2 className='pacifico-regular' style={{ color: 'darkcyan' }}>Lessons</h2>
                    </Col>
                    <Col md={3} className="text-end">
                        {users && (users.role === 'admin' || users.role === 'instructor') && (
                            <Button variant="contained" color="success" onClick={handleCreateLesson}>Create Lesson</Button>
                        )}
                    </Col>
                </Row>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Session</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lessonLoading ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : lessons.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">No Lessons Available</TableCell>
                            </TableRow>
                        ) : (
                            lessons.map((lesson) => (
                                <TableRow key={lesson._id}>
                                    <TableCell>{lesson.session}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" className='me-2 mt-2' color="primary" onClick={() => handleStartLearning(lesson._id)}>Start Learning</Button>
                                        {users && (users.role === 'admin' || users.role === 'instructor') && (
                                            <>
                                                <Button variant="outlined" className='me-2 mt-2' color="warning" onClick={() => handleEditLesson(lesson._id)}>Edit</Button>
                                                <Button variant="outlined" className='me-2 mt-2' color="error" onClick={() => handleDeleteLesson(lesson._id)}>Delete</Button>
                                                <Button variant="outlined" className='me-2 mt-2' color="secondary" onClick={() => handleViewCompletion(lesson._id)}>
                                                 {showCompletedStudents === lesson._id ? 'Hide Completed Students' : 'View Completed Students'}
                                                </Button>
                                            </>
                                        )}
                                        
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {showCompletedStudents && (
                <Collapse in={showCompletedStudents === lessonId}>
                    <Box margin={1}>
                        <Typography variant="h6">Completed Students</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Student Name</TableCell>
                                    <TableCell>Completion Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completedStudents.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={2} align="center">No students have completed this lesson yet.</TableCell>
                                    </TableRow>
                                ) : (
                                    completedStudents.map(student => (
                                        <TableRow key={student._id}>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.completedAt}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            )}
            {editLesson && (
                <CreateLesson
                    lessonId={editLesson}
                    onClose={() => setEditLesson(null)}
                />
            )}
        </Container>
    );
};

export default LessonList;
