// import React, { useContext, useEffect, useState } from 'react';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { AuthContext } from '../ContextAPI/AuthContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { message } from 'antd';
// import { Container, Row, Col } from 'react-bootstrap';
// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Collapse, Typography } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import SubmissionForm from './SubmissionForm';

// const AssignmentList = () => {
//     const { fetchAssignmentsByCourseId, deleteAssignment, assignments, submissions, loading: assignmentLoading, fetchAssignmentByAssignmentId, addSubmission } = useContext(AssignmentContext);
//     const { users } = useContext(AuthContext);
//     const { courseId } = useParams();
//     const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);
//     const [showSubmissionUrl, setShowSubmissionUrl] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (courseId) {
//             const fetchData = async () => {
//                 try {
//                     await fetchAssignmentsByCourseId(courseId);
//                 } catch (error) {
//                     console.error('Error fetching assignments:', error);
//                 }
//             };

//             fetchData();
//         }
//     }, []);

//     const handleDeleteAssignment = async (assignmentId) => {
//         try {
//             await deleteAssignment(assignmentId);
//             message.success('Assignment deleted successfully!');
//             fetchAssignmentsByCourseId(courseId); // Refresh assignments
//         } catch (error) {
//             console.error('Error deleting assignment:', error);
//             message.error('Failed to delete assignment.');
//         }
//     };

//     const handleAddAssignment = () => {
//         navigate(`/create-assignment/${courseId}`);
//     };

//     const handleViewSubmissionsList = async (assignmentId) => {
//         try {
//             await fetchAssignmentByAssignmentId(assignmentId);
//             navigate(`/submissionList/${assignmentId}`);
//         } catch (error) {
//             console.error('Error fetching submissions:', error);
//             message.error('Failed to fetch submissions.');
//         }
//     };

//     const getSubmissionForAssignment = (assignmentId) => {
//         return submissions.find(submission => submission.assignmentId === assignmentId);
//     };

//     const handleSubmitSubmissionForm = async (assignmentId, formData) => {
//         try {
//             await addSubmission(assignmentId, formData);
//             message.success('Submission added successfully!');
//             fetchAssignmentsByCourseId(courseId); // Refresh assignments
//         } catch (error) {
//             console.error('Error submitting assignment:', error);
//             message.error('Failed to submit assignment.');
//         }
//     };

//     const handleViewClick = async (assignmentId) => {
//         try {
//             await fetchAssignmentByAssignmentId(assignmentId);
//             setShowSubmissionUrl(prevState => (prevState === assignmentId ? null : assignmentId));
//         } catch (error) {
//             console.error('Error fetching assignment:', error);
//             message.error('Failed to fetch assignment.');
//         }
//     };

//     return (
//         <Container>
//             <TableContainer component={Paper}>
//                 <Row className="mt-4">
//                     <Col md={9} className="text-center">
//                         <h2 className='pacifico-regular' style={{ color: 'darkcyan' }}>Assignments</h2>
//                     </Col>
//                     <Col md={3} className="text-end">
//                         {users && (users.role === 'admin' || users.role === 'instructor' || users.role === 'mentor') && (
//                             <button className="btn btn-success" onClick={handleAddAssignment}>Add Assignment</button>
//                         )}
//                     </Col>
//                 </Row>
//                 <Table aria-label="collapsible table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell><strong>Assignment Name</strong></TableCell>
//                             <TableCell align="center"><strong>Description</strong></TableCell>
//                             <TableCell align="center"><strong>Due Date</strong></TableCell>
//                             {users && (users.role === 'student') && <TableCell align="center"><strong>Submitted Date</strong></TableCell>}
//                             {users && (users.role === 'student') && <TableCell align="center"><strong>Grade</strong></TableCell>}
//                             {users && (users.role === 'student') && <TableCell align="center"><strong>Comments</strong></TableCell>}
//                             {users && (users.role === 'student') && <TableCell align="center"><strong>Task</strong></TableCell>}
//                             {users && (users.role === 'admin' || users.role === 'instructor') && <TableCell align="center"><strong>Actions</strong></TableCell>}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {assignmentLoading ? (
//                             <TableRow>
//                                 <TableCell colSpan={8} align="center">Loading assignments...</TableCell>
//                             </TableRow>
//                         ) : assignments.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={8} align="center">No assignments available.</TableCell>
//                             </TableRow>
//                         ) : (
//                             assignments.map((assignment) => {
//                                 const submission = getSubmissionForAssignment(assignment._id);

//                                 return (
//                                     <React.Fragment key={assignment._id}>
//                                         <TableRow>
//                                             <TableCell component="th" scope="row">
//                                                 {assignment.title}
//                                             </TableCell>
//                                             <TableCell align="center">{assignment.description}</TableCell>
//                                             <TableCell align="center">{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
//                                             {users && (users.role === 'student') && (
//                                                 <>
//                                                     <TableCell align="center">{submission?.createdAt ? new Date(submission.createdAt).toLocaleDateString() : '-'}</TableCell>
//                                                     <TableCell align="center">{submission?.grade ? submission.grade : '-'}</TableCell>
//                                                     <TableCell align="center">{submission?.comments ? submission.comments : '-'}</TableCell>
//                                                     <TableCell align="center">
//                                                         {submission ? (
//                                                             <button className="btn btn-secondary" onClick={() => handleViewClick(assignment._id)}>
//                                                                 {showSubmissionUrl === assignment._id ? 'Hide URL' : 'View'}
//                                                             </button>
//                                                         ) : (
//                                                             <button className="btn btn-primary" onClick={() => setExpandedAssignmentId(assignment._id)}>Submit</button>
//                                                         )}
//                                                     </TableCell>
//                                                 </>
//                                             )}
//                                             {users && (users.role === 'admin' || users.role === 'instructor') && (
//                                                 <TableCell align="center">
//                                                     <button className="btn btn-danger ms-2 me-2 mt-2" onClick={() => handleDeleteAssignment(assignment._id)}>Delete</button>
//                                                     <button className="btn btn-dark ms-2 me-2 mt-2" onClick={() => handleViewSubmissionsList(assignment._id)}>View Submissions</button>
//                                                 </TableCell>
//                                             )}
//                                         </TableRow>
//                                         <TableRow>
//                                             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
//                                                 <Collapse in={expandedAssignmentId === assignment._id} timeout="auto" unmountOnExit>
//                                                     <Box margin={1}>
//                                                         <Typography variant="h6" gutterBottom component="div">
//                                                             {submission ? 'Submission Details' : 'Submit Assignment'}
//                                                         </Typography>
//                                                         {submission ? (
//                                                             <p>URL: {submission.submissionUrl}</p>
//                                                         ) : (
//                                                             <SubmissionForm assignmentId={assignment._id} onSubmit={(formData) => handleSubmitSubmissionForm(assignment._id, formData)} />
//                                                         )}
//                                                     </Box>
//                                                 </Collapse>
//                                             </TableCell>
//                                         </TableRow>
//                                     </React.Fragment>
//                                 );
//                             })
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default AssignmentList;
import React, { useContext, useEffect, useState } from 'react';
import { AssignmentContext } from '../ContextAPI/AssignmentContext';
import { AuthContext } from '../ContextAPI/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Box, Paper, Button } from '@mui/material';
import SubmissionForm from './SubmissionForm';

const AssignmentList = () => {
    const { fetchAssignmentsByCourseId, fetchAssignmentByAssignmentId, deleteAssignment, assignments, loading: assignmentLoading, submissions, addSubmission } = useContext(AssignmentContext);
    const { users } = useContext(AuthContext);
    const { courseId } = useParams();
    const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (courseId) {
            fetchAssignmentsByCourseId(courseId);
        }
    }, [courseId]);

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            await deleteAssignment(assignmentId);
            message.success('Assignment deleted successfully!');
            fetchAssignmentsByCourseId(courseId); // Refresh assignments
        } catch (error) {
            console.error('Error deleting assignment:', error);
            message.error('Failed to delete assignment.');
        }
    };

    const handleAddAssignment = () => {
        navigate(`/create-assignment/${courseId}`);
    };

    const handleViewSubmissionsList = async (assignmentId) => {
        try {
            await fetchAssignmentByAssignmentId(assignmentId);
            navigate(`/submissionList/${assignmentId}`);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            message.error('Failed to fetch submissions.');
        }
    };

    const handleSubmitSubmissionForm = async (assignmentId, formData) => {
        try {
            await addSubmission(assignmentId, formData);
            message.success('Submission added successfully!');
            fetchAssignmentsByCourseId(courseId); // Refresh assignments
        } catch (error) {
            console.error('Error submitting assignment:', error);
            message.error('Failed to submit assignment.');
        }
    };

    return (
        <Container>
            <TableContainer component={Paper}>
                <Row className="mt-4">
                    <Col md={9} className="text-center">
                        <h2 className='pacifico-regular' style={{ color: 'darkcyan' }}>Assignments</h2>
                    </Col>
                    <Col md={3} className="text-end">
                        {users && (users.role === 'admin' || users.role === 'instructor' || users.role === 'mentor') && (
                            <Button variant="contained" color="success" onClick={handleAddAssignment}>Add Assignment</Button>
                        )}
                    </Col>
                </Row>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Assignment Name</strong></TableCell>
                            <TableCell align="center"><strong>Description</strong></TableCell>
                            <TableCell align="center"><strong>Due Date</strong></TableCell>
                            {users && users.role === 'student' && <TableCell align="center"><strong>Submitted Date</strong></TableCell>}
                            {users && users.role === 'student' && <TableCell align="center"><strong>Grade</strong></TableCell>}
                            {users && users.role === 'student' && <TableCell align="center"><strong>Comments</strong></TableCell>}
                            {users && users.role === 'student' && <TableCell align="center"><strong>Task</strong></TableCell>}
                            {users && (users.role === 'admin' || users.role === 'instructor') && <TableCell align="center"><strong>Actions</strong></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignmentLoading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">Loading assignments...</TableCell>
                            </TableRow>
                        ) : assignments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">No assignments available.</TableCell>
                            </TableRow>
                        ) : (
                            assignments.map((assignment) => {
                                const submission = submissions.find(sub => sub.assignmentId === assignment._id);

                                return (
                                    <React.Fragment key={assignment._id}>
                                        <TableRow>
                                            <TableCell component="th" scope="row">{assignment.title}</TableCell>
                                            <TableCell align="center">{assignment.description}</TableCell>
                                            <TableCell align="center">{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                                            {users && users.role === 'student' && (
                                                <>
                                                    <TableCell align="center">{submission?.createdAt ? new Date(submission.createdAt).toLocaleDateString() : '-'}</TableCell>
                                                    <TableCell align="center">{submission?.grade ? submission.grade : '-'}</TableCell>
                                                    <TableCell align="center">{submission?.comments ? submission.comments : '-'}</TableCell>
                                                    <TableCell align="center">
                                                        {submission ? (
                                                            <Button variant="outlined" color="secondary" onClick={() => setExpandedAssignmentId(expandedAssignmentId === assignment._id ? null : assignment._id)}>
                                                                {expandedAssignmentId === assignment._id ? 'Hide' : 'View'} Submission
                                                            </Button>
                                                        ) : (
                                                            <Button variant="contained" color="primary" onClick={() => setExpandedAssignmentId(assignment._id)}>Submit</Button>
                                                        )}
                                                    </TableCell>
                                                </>
                                            )}
                                            {users && (users.role === 'admin' || users.role === 'instructor') && (
                                                <TableCell align="center">
                                                    <Box display="flex" justifyContent="center">
                                                        <Button variant="outlined" color="error" className="me-3 mt-2" onClick={() => handleDeleteAssignment(assignment._id)}>Delete</Button>
                                                        <Button variant="outlined" color="secondary" className="me-3 mt-2" onClick={() => handleViewSubmissionsList(assignment._id)}>View Submissions</Button>
                                                    </Box>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                        {expandedAssignmentId === assignment._id && (
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <Box margin={1}>
                                                        {submission ? (
                                                            <>
                                                                <p>Submission URL: {submission.submissionUrl}</p>
                                                                <p>Comments: {submission.comments}</p>
                                                            </>
                                                        ) : (
                                                            <SubmissionForm assignmentId={assignment._id} onSubmit={(formData) => handleSubmitSubmissionForm(assignment._id, formData)} />
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AssignmentList;
