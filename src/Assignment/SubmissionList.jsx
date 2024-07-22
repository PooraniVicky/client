// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { SubmissionContext } from '../ContextAPI/SubmissionContext';
// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Button, Typography, Autocomplete } from '@mui/material';
// import { Container } from 'react-bootstrap';

// const predefinedScores = Array.from({ length: 11 }, (_, i) => i.toString()); // Predefined scores from 0 to 10

// const SubmissionList = () => {
//     const { assignmentId } = useParams();
//     const { submissions, loading, error, fetchSubmissionsByAssignmentId, deleteSubmission, gradeSubmission } = useContext(SubmissionContext);

//     // State for marks and comments input per submission
//     const [marks, setMarks] = useState({});
//     const [comments, setComments] = useState({});
//     // useEffect(() => {
//     //     if (assignmentId) {
//     //         console.log(`Fetching submissions for assignmentId: ${assignmentId}`);
//     //         fetchSubmissionsByAssignmentId(assignmentId);
//     //     }
//     // }, [assignmentId]);

//     // useEffect(() => {
//     //     if (submissions && submissions.length > 0) {
//     //         const marksState = {};
//     //         const commentsState = {};
//     //         submissions.forEach(submission => {
//     //             marksState[submission._id] = submission.grade || '';
//     //             commentsState[submission._id] = submission.comments || '';
//     //         });
//     //         setMarks(marksState);
//     //         setComments(commentsState);
//     //     }
//     // }, [submissions]);

//     useEffect(() => {
//         if (assignmentId) {
//             console.log(`Fetching submissions for assignmentId: ${assignmentId}`);
//             fetchSubmissionsByAssignmentId(assignmentId);
//         }
//     }, [assignmentId]);

//     useEffect(() => {
//         if (submissions && submissions.length > 0) {
//             const marksState = {};
//             const commentsState = {};
//             submissions.forEach(submission => {
//                 marksState[submission._id] = submission.grade || '';
//                 commentsState[submission._id] = submission.comments || '';
//             });
//             setMarks(marksState);
//             setComments(commentsState);
//         }
//     }, [submissions]);


//     // Handle input change for marks
//     const handleMarksChange = (submissionId, value) => {
//         setMarks(prev => ({ ...prev, [submissionId]: value }));
//     };

//     // Handle input change for comments
//     const handleCommentsChange = (submissionId, value) => {
//         setComments(prev => ({ ...prev, [submissionId]: value }));
//     };

//     // Handle grading submission
//     const handleGradeSubmit = async (submissionId) => {
//         try {
//             const mark = marks[submissionId];
//             const comment = comments[submissionId];

//             // Ensure marks and comments are not empty
//             if (!mark || !comment) {
//                 // Handle message.error here if needed
//                 return;
//             }

//             const gradeData = { grade: parseInt(mark, 10), comments: comment };
//             await gradeSubmission(submissionId, gradeData);

//             // Refetch submissions to update the list
//             fetchSubmissionsByAssignmentId(assignmentId);
//         } catch (error) {
//             console.error('Error grading submission:', error);
//             // Handle error state if needed
//         }
//     };
//     const handleDelete = async (submissionId) => {
//         try {
//             await deleteSubmission(submissionId);
//             message.success('Submission deleted successfully!');
//         } catch (error) {
//             console.error('Error deleting submission:', error);
//             message.error('Failed to delete submission.');
//         }
//     };
//     return (
//         <Container>
//             {loading ? (
//                 <p>Loading submissions...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : submissions && submissions.length === 0 ? (
//                 <p>No submissions available.</p>
//             ) : (
//                 <TableContainer component={Paper}>
//                     <h2 className='text-center pacifico-regular mt-3 mb-3' style={{ color: 'darkcyan' }}>Assignment Submissions</h2>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell><strong>User</strong></TableCell>
//                                 <TableCell align="center"><strong>Submission URL</strong></TableCell>
//                                 <TableCell align="center"><strong>Submitted Date</strong></TableCell>
//                                 <TableCell align="center"><strong>Grade</strong></TableCell>
//                                 <TableCell align="center"><strong>Comments</strong></TableCell>
//                                 <TableCell align="center"><strong>Actions</strong></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {submissions.map((submission) => (
//                                 <TableRow key={submission._id}>
//                                     <TableCell>{submission.student ? `${submission.student.firstName} ${submission.student.lastName}` : '-'}</TableCell>
//                                     <TableCell align="center" style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
//                                         <Typography wrap='true'>
//                                             <a href={submission.submissionUrl} target="_blank" rel="noopener noreferrer">
//                                                 {submission.submissionUrl}
//                                             </a>
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         {new Date(submission.createdAt).toLocaleDateString()}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Autocomplete
//                                             freeSolo
//                                             options={predefinedScores}
//                                             value={marks[submission._id] || ''}
//                                             onChange={(event, newValue) => handleMarksChange(submission._id, newValue)}
//                                             renderInput={(params) => (
//                                                 <TextField {...params} variant="outlined" size="small" fullWidth />
//                                             )}
//                                         />
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <TextField
//                                             value={comments[submission._id] || ''}
//                                             onChange={(e) => handleCommentsChange(submission._id, e.target.value)}
//                                             fullWidth
//                                             multiline
//                                             variant="outlined"
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Button
//                                             variant="outlined"
//                                             color="success"
//                                             onClick={() => handleGradeSubmit(submission._id)}
//                                         >
//                                             Grade
//                                         </Button>
//                                         <Button
//                                             variant="outlined"
//                                             color="success"
//                                             onClick={() => handleDelete(submission._id)}
//                                         >
//                                             Delete
//                                         </Button>
//                                     </TableCell>

//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                         {/* <TableBody>
//     {submissions.map((submission) => (
//         <TableRow key={submission._id}>
//             <TableCell>{submission.student ? `${submission.student.firstName} ${submission.student.lastName}` : '-'}</TableCell>
//             <TableCell align="center" style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
//                 <Typography>
//                     <a href={submission.submissionUrl} target="_blank" rel="noopener noreferrer">
//                         {submission.submissionUrl}
//                     </a>
//                 </Typography>
//             </TableCell>
//             <TableCell align="center">
//                 {new Date(submission.createdAt).toLocaleDateString()}
//             </TableCell>
//             <TableCell align="center">
//                 <Autocomplete
//                     freeSolo
//                     options={predefinedScores}
//                     value={marks[submission._id] || ''}
//                     onChange={(event, newValue) => handleMarksChange(submission._id, newValue)}
//                     renderInput={(params) => (
//                         <TextField {...params} variant="outlined" size="small" fullWidth />
//                     )}
//                 />
//             </TableCell>
//             <TableCell align="center">
//                 <TextField
//                     value={comments[submission._id] || ''}
//                     onChange={(e) => handleCommentsChange(submission._id, e.target.value)}
//                     fullWidth
//                     multiline
//                     variant="outlined"
//                     size="small"
//                 />
//             </TableCell>
//             <TableCell align="center">
//                 <Button
//                     variant="outlined"
//                     color="success"
//                     onClick={() => handleGradeSubmit(submission._id)}
//                 >
//                     Grade
//                 </Button>
//                 <Button
//                     variant="outlined"
//                     color="success"
//                     onClick={() => handleDelete(submission._id)}
//                 >
//                     Delete
//                 </Button>
//             </TableCell>
//         </TableRow>
//     ))}
// </TableBody> */}

//                     </Table>
//                 </TableContainer>
//             )}
//         </Container>
//     );
// };

// export default SubmissionList;

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { SubmissionContext } from '../ContextAPI/SubmissionContext';
// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Button, Typography, Autocomplete } from '@mui/material';
// import { Container } from 'react-bootstrap';
// import { message } from 'antd';

// const predefinedScores = Array.from({ length: 11 }, (_, i) => i.toString());

// const SubmissionList = () => {
//     const { assignmentId } = useParams();
//     const { submissions, loading, error, fetchSubmissionsByAssignmentId, deleteSubmission, gradeSubmission } = useContext(SubmissionContext);
//     console.log("Submissions fetched:", submissions);

//     const [marks, setMarks] = useState({});
//     const [comments, setComments] = useState({});

//     useEffect(() => {
//         if (assignmentId) {
//             console.log("Fetching submissions for assignmentId:", assignmentId);
//             fetchSubmissionsByAssignmentId(assignmentId);
//         }
//     }, [assignmentId]);

//     useEffect(() => {
//         if (submissions && submissions.length > 0) {
//             const marksState = {};
//             const commentsState = {};
//             submissions.forEach(submission => {
//                 marksState[submission._id] = submission.grade || '';
//                 commentsState[submission._id] = submission.comments || '';
//             });
//             setMarks(marksState);
//             setComments(commentsState);
//         }
//     }, [submissions]);

//     const handleMarksChange = (submissionId, value) => {
//         setMarks(prev => ({ ...prev, [submissionId]: value }));
//     };

//     const handleCommentsChange = (submissionId, value) => {
//         setComments(prev => ({ ...prev, [submissionId]: value }));
//     };

//     const handleGradeSubmit = async (submissionId) => {
//         try {
//             const mark = marks[submissionId];
//             const comment = comments[submissionId];

//             if (!mark || !comment) {
//                 message.error('Marks and comments are required');
//                 return;
//             }

//             const gradeData = { grade: parseInt(mark, 10), comments: comment };
//             await gradeSubmission(submissionId, gradeData);
//             fetchSubmissionsByAssignmentId(assignmentId);
//         } catch (error) {
//             console.error('Error grading submission:', error);
//             message.error('Failed to grade submission.');
//         }
//     };

//     const handleDelete = async (submissionId) => {
//         try {
//             await deleteSubmission(submissionId);
//             message.success('Submission deleted successfully!');
//             fetchSubmissionsByAssignmentId(assignmentId);
//         } catch (error) {
//             console.error('Error deleting submission:', error);
//             message.error('Failed to delete submission.');
//         }
//     };

//     return (
//         <Container>
//             {loading ? (
//                 <p>Loading submissions...</p>
//             ) : error ? (
//                 <p>{error}</p>
//             ) : submissions && submissions.length === 0 ? (
//                 <p>No submissions available.</p>
//             ) : (
//                 <TableContainer component={Paper}>
//                     <h2 className='text-center pacifico-regular mt-3 mb-3' style={{ color: 'darkcyan' }}>Assignment Submissions</h2>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell><strong>User</strong></TableCell>
//                                 <TableCell align="center"><strong>Submission URL</strong></TableCell>
//                                 <TableCell align="center"><strong>Submitted Date</strong></TableCell>
//                                 <TableCell align="center"><strong>Grade</strong></TableCell>
//                                 <TableCell align="center"><strong>Comments</strong></TableCell>
//                                 <TableCell align="center"><strong>Actions</strong></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {submissions.map((submission) => (
//                                 <TableRow key={submission._id}>
//                                     <TableCell>{submission.student ? `${submission.student.firstName} ${submission.student.lastName}` : '-'}</TableCell>
//                                     <TableCell align="center" style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
//                                         <Typography>
//                                             <a href={submission.submissionUrl} target="_blank" rel="noopener noreferrer">
//                                                 {submission.submissionUrl}
//                                             </a>
//                                         </Typography>
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         {new Date(submission.createdAt).toLocaleDateString()}
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Autocomplete
//                                             freeSolo
//                                             options={predefinedScores}
//                                             value={marks[submission._id] || ''}
//                                             onChange={(event, newValue) => handleMarksChange(submission._id, newValue)}
//                                             renderInput={(params) => (
//                                                 <TextField {...params} variant="outlined" size="small" fullWidth />
//                                             )}
//                                         />
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <TextField
//                                             value={comments[submission._id] || ''}
//                                             onChange={(e) => handleCommentsChange(submission._id, e.target.value)}
//                                             fullWidth
//                                             multiline
//                                             variant="outlined"
//                                             size="small"
//                                         />
//                                     </TableCell>
//                                     <TableCell align="center">
//                                         <Button
//                                             variant="outlined"
//                                             color="success"
//                                             onClick={() => handleGradeSubmit(submission._id)}
//                                         >
//                                             Grade
//                                         </Button>
//                                         <Button
//                                             variant="outlined"
//                                             color="error"
//                                             onClick={() => handleDelete(submission._id)}
//                                         >
//                                             Delete
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Container>
//     );
// };

// export default SubmissionList;

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SubmissionContext } from '../ContextAPI/SubmissionContext';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, TextField, Button, Typography, Autocomplete } from '@mui/material';
import { Container } from 'react-bootstrap';
import { message } from 'antd';

const predefinedScores = Array.from({ length: 11 }, (_, i) => i.toString());

const SubmissionList = () => {
    const { assignmentId } = useParams();
    const { submissions = [], loading, error, fetchSubmissionsByAssignmentId, deleteSubmission, gradeSubmission } = useContext(SubmissionContext);

    const [marks, setMarks] = useState({});
    const [comments, setComments] = useState({});

    useEffect(() => {
        if (assignmentId) {
            console.log("Fetching submissions for assignmentId:", assignmentId);
            fetchSubmissionsByAssignmentId(assignmentId);
        }
    }, [assignmentId]);

    useEffect(() => {
        if (Array.isArray(submissions)) {
            const marksState = {};
            const commentsState = {};
            submissions.forEach(submission => {
                marksState[submission._id] = submission.grade || '';
                commentsState[submission._id] = submission.comments || '';
            });
            setMarks(marksState);
            setComments(commentsState);
        }
    }, [submissions]);

    const handleMarksChange = (submissionId, value) => {
        setMarks(prev => ({ ...prev, [submissionId]: value }));
    };

    const handleCommentsChange = (submissionId, value) => {
        setComments(prev => ({ ...prev, [submissionId]: value }));
    };

    const handleGradeSubmit = async (submissionId) => {
        try {
            const mark = marks[submissionId];
            const comment = comments[submissionId];

            if (!mark || !comment) {
                message.error('Marks and comments are required');
                return;
            }

            const gradeData = { grade: parseInt(mark, 10), comments: comment };
            await gradeSubmission(submissionId, gradeData);
            fetchSubmissionsByAssignmentId(assignmentId);
        } catch (error) {
            console.error('Error grading submission:', error);
            message.error('Failed to grade submission.');
        }
    };

    const handleDelete = async (submissionId) => {
        try {
            await deleteSubmission(submissionId);
            message.success('Submission deleted successfully!');
            fetchSubmissionsByAssignmentId(assignmentId);
        } catch (error) {
            console.error('Error deleting submission:', error);
            message.error('Failed to delete submission.');
        }
    };

    return (
        <Container>
            {loading ? (
                <p>Loading submissions...</p>
            ) : error ? (
                <p>{error}</p>
            ) : Array.isArray(submissions) && submissions.length === 0 ? (
                <p>No submissions available.</p>
            ) : (
                <TableContainer component={Paper}>
                    <h2 className='text-center pacifico-regular mt-3 mb-3' style={{ color: 'darkcyan' }}>Assignment Submissions</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>User</strong></TableCell>
                                <TableCell align="center"><strong>Submission URL</strong></TableCell>
                                <TableCell align="center"><strong>Submitted Date</strong></TableCell>
                                <TableCell align="center"><strong>Grade</strong></TableCell>
                                <TableCell align="center"><strong>Comments</strong></TableCell>
                                <TableCell align="center"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(submissions) && submissions.map((submission) => (
                                <TableRow key={submission._id}>
                                    <TableCell>{submission.student ? `${submission.student.firstName} ${submission.student.lastName}` : '-'}</TableCell>
                                    <TableCell align="center" style={{ maxWidth: '400px', wordWrap: 'break-word' }}>
                                        <Typography>
                                            <a href={submission.submissionUrl} target="_blank" rel="noopener noreferrer">
                                                {submission.submissionUrl}
                                            </a>
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        {new Date(submission.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Autocomplete
                                            freeSolo
                                            options={predefinedScores}
                                            value={marks[submission._id] || ''}
                                            onChange={(event, newValue) => handleMarksChange(submission._id, newValue)}
                                            renderInput={(params) => (
                                                <TextField {...params} variant="outlined" size="small" fullWidth />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            value={comments[submission._id] || ''}
                                            onChange={(e) => handleCommentsChange(submission._id, e.target.value)}
                                            fullWidth
                                            multiline
                                            variant="outlined"
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            onClick={() => handleGradeSubmit(submission._id)}
                                        >
                                            Grade
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDelete(submission._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default SubmissionList;
