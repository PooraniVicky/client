import React, { useContext, useEffect, useState } from 'react';
import { AssignmentContext } from '../ContextAPI/AssignmentContext';
import { AuthContext } from '../ContextAPI/AuthContext';
import { SubmissionContext } from '../ContextAPI/SubmissionContext';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Box, Collapse, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { AiOutlineDown, AiOutlineUp, AiOutlineInfoCircle } from 'react-icons/ai';
import SubmissionForm from './SubmissionForm';

const AssignmentList = () => {
    const { fetchAssignmentsByCourseId, deleteAssignment, assignments, loading: assignmentLoading } = useContext(AssignmentContext);
    const { users } = useContext(AuthContext);
    const { submissions, fetchSubmissionsByAssignmentId } = useContext(SubmissionContext);
    const { courseId } = useParams();
    const [showSubmissionForm, setShowSubmissionForm] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (courseId) {
            fetchAssignmentsByCourseId(courseId);
        }
    }, [courseId]);

    useEffect(() => {
        console.log("Fetch Trigger:", assignments);
        // if (assignments && assignments.length > 0) {
            assignments.forEach(async (assignment) => {
                try {
                    await fetchSubmissionsByAssignmentId(assignment._id);
                } catch (error) {
                    console.error('Error fetching submissions for assignment:', assignment._id, error);
                    message.error(`Failed to fetch submissions for assignment: ${assignment.title}`);
                }
            });
       // }
    }, [submissions]);

    useEffect(() => {
        console.log('Assignments:', assignments);
        console.log('Submissions:', submissions);
    }, [assignments, submissions]);

    const toggleSubmissionForm = (assignmentId) => {
        setShowSubmissionForm(prevState => ({
            ...prevState,
            [assignmentId]: !prevState[assignmentId]
        }));
    };

    const handleDeleteAssignment = async (assignmentId) => {
        try {
            await deleteAssignment(assignmentId);
            message.success('Assignment deleted successfully!');
            fetchAssignmentsByCourseId(courseId);
        } catch (error) {
            console.error('Error deleting assignment:', error);
            message.error('Assignment failed to delete.');
        }
    };

    const handleAddAssignment = () => {
        navigate(`/create-assignment/${courseId}`);
    };

    const handleViewSubmissionsList = async (assignmentId) => {
        try {
            await fetchSubmissionsByAssignmentId(assignmentId);
            navigate(`/submissionList/${assignmentId}`);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            message.error('Failed to fetch submissions.');
        }
    };

    // const handleSubmitSubmissionForm = async (assignmentId, formData) => {
    //     try {
    //         message.success('Submission saved successfully!');
    //         await fetchSubmissionsByAssignmentId(assignmentId);
    //         toggleSubmissionForm(assignmentId);
    //     } catch (error) {
    //         console.error('Error saving submission:', error);
    //         message.error('Failed to save submission.');
    //     }
    // };

    const getSubmissionForAssignment = (assignmentId) => {
        if (!Array.isArray(submissions)) {
            console.log(Array.isArray(submissions)); // This should log true if submissions is an array
            console.log(submissions);
          console.error('Expected submissions to be an array');
          return null;
        }
        return submissions.find(submission => submission.assignmentId === assignmentId);
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
                            <button className="btn btn-success" onClick={handleAddAssignment}>Add Assignment</button>
                        )}
                    </Col>
                </Row>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Assignment Name</strong></TableCell>
                            <TableCell align="center"><strong>Description</strong></TableCell>
                            <TableCell align="center"><strong>Due Date</strong></TableCell>
                            {users && (users.role === 'student') && <TableCell align="center"><strong>Submitted Date</strong></TableCell>}
                            {users && (users.role === 'student') && <TableCell align="center"><strong>Grade</strong></TableCell>}
                            {users && (users.role === 'student') && <TableCell align="center"><strong>Comments</strong></TableCell>}
                            {users && (users.role === 'student') && <TableCell align="center"><strong>Task</strong></TableCell>}
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
                            assignments.map((assignment) => (
                                <React.Fragment key={assignment._id}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {assignment.title}
                                        </TableCell>
                                        <TableCell align="center">{assignment.description}</TableCell>
                                        <TableCell align="center">{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
                                        {users && (users.role === 'student') && (
                                            <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.createdAt ? new Date(getSubmissionForAssignment(assignment._id).createdAt).toLocaleDateString() : '-'}</TableCell>
                                        )}
                                        {users && (users.role === 'student') && (
                                            <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.grade ? getSubmissionForAssignment(assignment._id).grade : '-'}</TableCell>
                                        )}
                                        {users && (users.role === 'student') && (
                                            <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.comments ? getSubmissionForAssignment(assignment._id).comments : '-'}</TableCell>
                                        )}
                                        {users && (users.role === 'student') && (
                                            <TableCell align="center">
                                                {getSubmissionForAssignment(assignment._id) ? (
                                                    <>
                                                        <IconButton color="warning" size="small" onClick={() => toggleSubmissionForm(assignment._id)}>
                                                            <AiOutlineInfoCircle />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="expand submission form"
                                                            size="small"
                                                            onClick={() => toggleSubmissionForm(assignment._id)}
                                                        >
                                                            {showSubmissionForm[assignment._id] ? <AiOutlineUp /> : <AiOutlineDown />}
                                                        </IconButton>
                                                    </>
                                                ) : (
                                                    <button className="btn btn-primary" onClick={() => toggleSubmissionForm(assignment._id)}>Submit</button>
                                                )}
                                            </TableCell>
                                        )}
                                        {users && (users.role === 'admin' || users.role === 'instructor') && (
                                            <TableCell align="center">
                                                <button className="btn btn-danger ms-2 me-2 mt-2" onClick={() => handleDeleteAssignment(assignment._id)}>Delete</button>
                                                <button className="btn btn-dark ms-2 me-2 mt-2" onClick={() => handleViewSubmissionsList(assignment._id)}>View Submissions</button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                                            <Collapse in={showSubmissionForm[assignment._id]} timeout="auto" unmountOnExit>
                                                <Box margin={1}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        {getSubmissionForAssignment(assignment._id) ? 'Submission Details' : 'Submit Assignment'}
                                                    </Typography>
                                                    {getSubmissionForAssignment(assignment._id) ? (
                                                        <>
                                                            <p>URL: {getSubmissionForAssignment(assignment._id).submissionUrl}</p>
                                                        </>
                                                    ) : (
                                                        <SubmissionForm assignmentId={assignment._id} onSubmit={(formData) => handleSubmitSubmissionForm(assignment._id, formData)} />
                                                    )}
                                                </Box>
                                            </Collapse>
                                        </TableCell>
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

export default AssignmentList;

// import React, { useContext, useEffect, useState } from 'react';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { AuthContext } from '../ContextAPI/AuthContext';
// import { SubmissionContext } from '../ContextAPI/SubmissionContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { message } from 'antd';
// import { Container, Row, Col } from 'react-bootstrap';
// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Box, Collapse, Typography } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import { AiOutlineDown, AiOutlineUp, AiOutlineInfoCircle } from 'react-icons/ai';
// import SubmissionForm from './SubmissionForm';

// const AssignmentList = () => {
//     const { fetchAssignmentsByCourseId, fetchAssignmentByAssignmentId, deleteAssignment, assignments, loading: assignmentLoading, updateAssignmentGrade } = useContext(AssignmentContext);
//     const { users } = useContext(AuthContext);
//     const { submissions, fetchSubmissionsByAssignmentId, submitSubmission } = useContext(SubmissionContext);
//     const { courseId } = useParams();
//     const [showSubmissionForm, setShowSubmissionForm] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (courseId) {
//             fetchAssignmentsByCourseId(courseId);
//         }
//     }, [courseId]);

//     useEffect(() => {
//         if (assignments && assignments.length > 0) {
//             assignments.forEach(async (assignment) => {
//                 try {
//                     await fetchSubmissionsByAssignmentId(assignment._id);
//                 } catch (error) {
//                     console.error('Error fetching submissions for assignment:', assignment._id, error);
//                     message.error(`Failed to fetch submissions for assignment: ${assignment.title}`);
//                 }
//             });
//         }
//     }, [assignments]);

//     useEffect(() => {
//         console.log('Assignments:', assignments); // Log assignments to check if data is coming
//         console.log('Submissions:', submissions); // Log submissions to check if data is coming
//     }, [assignments, submissions]);

//     const toggleSubmissionForm = (assignmentId) => {
//         setShowSubmissionForm(prevState => ({
//             ...prevState,
//             [assignmentId]: !prevState[assignmentId]
//         }));
//     };

//     const handleDeleteAssignment = async (assignmentId) => {
//         try {
//             await deleteAssignment(assignmentId);
//             message.success('Assignment deleted successfully!');
//             fetchAssignmentsByCourseId(courseId);
//         } catch (error) {
//             console.error('Error deleting assignment:', error);
//             message.error('Assignment failed to delete.');
//         }
//     };

//     const handleAddAssignment = () => {
//         navigate(`/create-assignment/${courseId}`);
//     };

//     const handleGradeSubmit = async (assignmentId, grade) => {
//         try {
//             await updateAssignmentGrade(assignmentId, grade);
//             message.success('Assignment graded successfully!');
//             fetchAssignmentsByCourseId(courseId);
//         } catch (error) {
//             console.error('Error grading assignment:', error);
//             message.error('Failed to grade assignment.');
//         }
//     };

//     const handleViewSubmissionsList = async (assignmentId) => {
//         try {
//             await fetchSubmissionsByAssignmentId(assignmentId);
//             navigate(`/submissionList/${assignmentId}`);
//         } catch (error) {
//             console.error('Error fetching submissions:', error);
//             message.error('Failed to fetch submissions.');
//         }
//     };

//     const handleSubmitSubmissionForm = async (assignmentId, formData) => {
//         try {
//             // Save the submission and fetch the updated submissions list
//             await submitSubmission(assignmentID, formData);
//             await fetchSubmissionsByAssignmentId(assignmentId);
//             message.success('Submission saved successfully!');
//             toggleSubmissionForm(assignmentId);
//         } catch (error) {
//             console.error('Error saving submission:', error);
//             message.error('Failed to save submission.');
//         }
//     };

//     const getSubmissionForAssignment = (assignmentId) => {
//         // Handle case where submissions is null or not an array
//         return submissions?.find(submission => submission.assignment === assignmentId);
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
//                             assignments.map((assignment) => (
//                                 <React.Fragment key={assignment._id}>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                             {assignment.title}
//                                         </TableCell>
//                                         <TableCell align="center">{assignment.description}</TableCell>
//                                         <TableCell align="center">{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.createdAt ? new Date(getSubmissionForAssignment(assignment._id).createdAt).toLocaleDateString() : '-'}</TableCell>
//                                         )}
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.grade ? getSubmissionForAssignment(assignment._id).grade : '-'}</TableCell>
//                                         )}
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.comments ? getSubmissionForAssignment(assignment._id).comments : '-'}</TableCell>
//                                         )}
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">
//                                                 {getSubmissionForAssignment(assignment._id) ? (
//                                                     <>
//                                                         <IconButton color="warning" size="small" onClick={() => toggleSubmissionForm(assignment._id)}>
//                                                             <AiOutlineInfoCircle />
//                                                         </IconButton>
//                                                         <IconButton
//                                                             aria-label="expand submission form"
//                                                             size="small"
//                                                             onClick={() => toggleSubmissionForm(assignment._id)}
//                                                         >
//                                                             {showSubmissionForm[assignment._id] ? <AiOutlineUp /> : <AiOutlineDown />}
//                                                         </IconButton>
//                                                     </>
//                                                 ) : (
//                                                     <button className="btn btn-primary" onClick={() => toggleSubmissionForm(assignment._id)}>Submit</button>
//                                                 )}
//                                             </TableCell>
//                                         )}
//                                         {users && (users.role === 'admin' || users.role === 'instructor') && (
//                                             <TableCell align="center">
//                                                 <button className="btn btn-danger ms-2 me-2 mt-2" onClick={() => handleDeleteAssignment(assignment._id)}>Delete</button>
//                                                 <button className="btn btn-dark ms-2 me-2 mt-2" onClick={() => handleViewSubmissionsList(assignment._id)}>View Submissions</button>
//                                             </TableCell>
//                                         )}
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
//                                             <Collapse in={showSubmissionForm[assignment._id]} timeout="auto" unmountOnExit>
//                                                 <Box margin={1}>
//                                                     <Typography variant="h6" gutterBottom component="div">
//                                                         {getSubmissionForAssignment(assignment._id) ? 'Submission Details' : 'Submit Assignment'}
//                                                     </Typography>
//                                                     {getSubmissionForAssignment(assignment._id) ? (
//                                                         <>
//                                                             <p>URL: {getSubmissionForAssignment(assignment._id).url}</p>
//                                                         </>
//                                                     ) : (
//                                                         <SubmissionForm assignmentId={assignment._id} />
//                                                     )}
//                                                 </Box>
//                                             </Collapse>
//                                         </TableCell>
//                                     </TableRow>
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default AssignmentList;

// import React, { useContext, useEffect, useState } from 'react';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { AuthContext } from '../ContextAPI/AuthContext';
// import { SubmissionContext } from '../ContextAPI/SubmissionContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { message } from 'antd';
// import { Container, Row, Col } from 'react-bootstrap';
// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Box, Collapse, Typography } from '@mui/material';
// import Paper from '@mui/material/Paper';
// import { AiOutlineDown, AiOutlineUp, AiOutlineInfoCircle } from 'react-icons/ai';
// import SubmissionForm from './SubmissionForm';

// const AssignmentList = () => {
//     const { fetchAssignmentsByCourseId, deleteAssignment, assignments = [], loading: assignmentLoading, updateAssignmentGrade } = useContext(AssignmentContext);
//     const { users } = useContext(AuthContext);
//     const { submissions, fetchSubmissionsByAssignmentId } = useContext(SubmissionContext);
//     const { courseId } = useParams();
//     const [showSubmissionForm, setShowSubmissionForm] = useState({});
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (courseId) {
//             fetchAssignmentsByCourseId(courseId);
//         }
//     }, [courseId]);
//     useEffect(() => {
//               if (!assignments || assignments.length === 0) {
//                      assignments.forEach(async (assignment) => {
//                         try {
//                             await fetchSubmissionsByAssignmentId(assignment._id);
//                         } catch (error) {
//                              console.error('Error fetching submissions for assignment:', assignment._id, error);
//                             message.error(`Failed to fetch submissions for assignment: ${assignment.title}`);
//                         }
//                    });
//                 }
//          }, [assignments]);
        
//    useEffect(() => {
//         console.log('Assignments:', assignments); // Log assignments to check if data is coming
//          console.log('Submissions:', submissions); // Log submissions to check if data is coming
//      }, [assignments, submissions]);
//     useEffect(() => {
//         if (Array.isArray(assignments) && assignments.length > 0) {
//             assignments.forEach(async (assignment) => {
//                 try {
//                     await fetchSubmissionsByAssignmentId(assignment._id);
//                 } catch (error) {
//                     console.error('Error fetching submissions for assignment:', assignment._id, error);
//                     message.error(`Failed to fetch submissions for assignment: ${assignment.title}`);
//                 }
//             });
//         }
//     }, [assignments]);

//     const toggleSubmissionForm = (assignmentId) => {
//         setShowSubmissionForm(prevState => ({
//             ...prevState,
//             [assignmentId]: !prevState[assignmentId]
//         }));
//     };

//     const handleDeleteAssignment = async (assignmentId) => {
//         try {
//             await deleteAssignment(assignmentId);
//             message.success('Assignment deleted successfully!');
//             fetchAssignmentsByCourseId(courseId);
//         } catch (error) {
//             console.error('Error deleting assignment:', error);
//             message.error('Assignment failed to delete.');
//         }
//     };

//     const handleAddAssignment = () => {
//         navigate(`/create-assignment/${courseId}`);
//     };

//     const handleGradeSubmit = async (assignmentId, grade) => {
//         try {
//             await updateAssignmentGrade(assignmentId, grade);
//             message.success('Assignment graded successfully!');
//             fetchAssignmentsByCourseId(courseId);
//         } catch (error) {
//             console.error('Error grading assignment:', error);
//             message.error('Failed to grade assignment.');
//         }
//     };

//     const handleViewSubmissionsList = async (assignmentId) => {
//         try {
//             await fetchSubmissionsByAssignmentId(assignmentId);
//             navigate(`/submissionList/${assignmentId}`);
//         } catch (error) {
//             console.error('Error fetching submissions:', error);
//             message.error('Failed to fetch submissions.');
//         }
//     };

//     const handleSubmitSubmissionForm = async (assignmentId, formData) => {
//         try {
//             await submitSubmission(assignmentId, formData); // Ensure this function is defined in SubmissionContext
//             message.success('Submission saved successfully!');
//             await fetchSubmissionsByAssignmentId(assignmentId); // Refresh submissions
//             toggleSubmissionForm(assignmentId);
//         } catch (error) {
//             console.error('Error saving submission:', error);
//             message.error('Failed to save submission.');
//         }
//     };
    
//     const getSubmissionForAssignment = (assignmentId) => {
//         return submissions.find(submission => submission.assignment === assignmentId) || null;
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
//                         ) : !Array.isArray(assignments) || assignments.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={8} align="center">No assignments available.</TableCell>
//                             </TableRow>
//                         ) : (
//                             assignments.map((assignment) => (
//                                 <React.Fragment key={assignment._id}>
//                                     <TableRow>
//                                         <TableCell component="th" scope="row">
//                                             {assignment.title}
//                                         </TableCell>
//                                         <TableCell align="center">{assignment.description}</TableCell>
//                                         <TableCell align="center">{new Date(assignment.dueDate).toLocaleDateString()}</TableCell>
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.createdAt ? new Date(getSubmissionForAssignment(assignment._id).createdAt).toLocaleDateString() : '-'}</TableCell>
//                                         )}
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.grade ? getSubmissionForAssignment(assignment._id).grade : '-'}</TableCell>
//                                         )}
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">{getSubmissionForAssignment(assignment._id)?.comments ? getSubmissionForAssignment(assignment._id).comments : '-'}</TableCell>
//                                         )}
//                                         {users && (users.role === 'student') && (
//                                             <TableCell align="center">
//                                                 {getSubmissionForAssignment(assignment._id) ? (
//                                                     <>
//                                                         <IconButton color="warning" size="small" onClick={() => toggleSubmissionForm(assignment._id)}>
//                                                             <AiOutlineInfoCircle />
//                                                         </IconButton>
//                                                         <IconButton
//                                                             aria-label="expand submission form"
//                                                             size="small"
//                                                             onClick={() => toggleSubmissionForm(assignment._id)}
//                                                         >
//                                                             {showSubmissionForm[assignment._id] ? <AiOutlineUp /> : <AiOutlineDown />}
//                                                         </IconButton>
//                                                     </>
//                                                 ) : (
//                                                     <button className="btn btn-primary" onClick={() => toggleSubmissionForm(assignment._id)}>Submit</button>
//                                                 )}
//                                             </TableCell>
//                                         )}
//                                         {users && (users.role === 'admin' || users.role === 'instructor') && (
//                                             <TableCell align="center">
//                                                 <button className="btn btn-danger ms-2 me-2 mt-2" onClick={() => handleDeleteAssignment(assignment._id)}>Delete</button>
//                                                 <button className="btn btn-dark ms-2 me-2 mt-2" onClick={() => handleViewSubmissionsList(assignment._id)}>View Submissions</button>
//                                             </TableCell>
//                                         )}
//                                     </TableRow>
//                                     <TableRow>
//                                         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
//                                             <Collapse in={showSubmissionForm[assignment._id]} timeout="auto" unmountOnExit>
//                                                 <Box margin={1}>
//                                                     <Typography variant="h6" gutterBottom component="div">
//                                                         {getSubmissionForAssignment(assignment._id) ? 'Your Submission' : 'Submit Your Work'}
//                                                     </Typography>
//                                                     {getSubmissionForAssignment(assignment._id) ? (
//                                                         <div>
//                                                             <strong>Submitted URL:</strong> {getSubmissionForAssignment(assignment._id).submissionUrl}
//                                                         </div>
//                                                     ) : (
//                                                         <SubmissionForm
//                                                             assignmentId={assignment._id}
//                                                             onSubmit={(formData) => handleSubmitSubmissionForm(assignment._id, formData)}
//                                                             onCancel={() => toggleSubmissionForm(assignment._id)}
//                                                         />
//                                                     )}
//                                                 </Box>
//                                             </Collapse>
//                                         </TableCell>
//                                     </TableRow>
//                                 </React.Fragment>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default AssignmentList;

