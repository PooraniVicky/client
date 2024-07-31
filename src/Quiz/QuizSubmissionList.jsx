import React, { useContext, useEffect, useState } from 'react';
import { QuizContext } from '../ContextAPI/QuizContext';
import { Container, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography, CircularProgress, Button } from '@mui/material';
import { useParams } from 'react-router-dom';

const QuizSubmissionList = () => {
    const { fetchQuizById, quizSubmissions, deleteSubmission } = useContext(QuizContext);
    const { quizId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            setLoading(true);
            try {
                await fetchQuizById(quizId);
            } catch (error) {
                console.error('Error fetching submissions:', error);
                setError('Failed to load submissions.');
            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();
    }, [quizId]);

    const handleEdit = (submissionId) => {
        // Navigate to the edit page or open an edit modal
        console.log('Edit submission with ID:', submissionId);
    };

    const handleDelete = async (submissionId) => {
        try {
            await deleteSubmission(submissionId);
            // Refresh the submissions list
            await fetchQuizById(quizId);
        } catch (error) {
            console.error('Error deleting submission:', error);
            setError('Failed to delete submission.');
        }
    };

    const isQuizSubmissionsValid = Array.isArray(quizSubmissions) && quizSubmissions.length > 0;

    return (
        <Container style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom className='text-center pacifico-regular mt-3 mb-3' style={{ color: 'darkcyan' }}>
                Quiz Submissions
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table aria-label="submission table">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>User</strong></TableCell>
                                <TableCell align="center"><strong>Score</strong></TableCell>
                                <TableCell align="center"><strong>Submission Date</strong></TableCell>
                                <TableCell align="center"><strong>Actions</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isQuizSubmissionsValid ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">No submissions available.</TableCell>
                                </TableRow>
                            ) : (
                                quizSubmissions.map((submission) => (
                                    <TableRow key={submission._id}>
                                        <TableCell>
                                            {submission.student ? 
                                                `${submission.student.firstName || 'Unknown'} ${submission.student.lastName || ''}` : 
                                                'Unknown User'}
                                        </TableCell>
                                        <TableCell align="center">{submission.score || 'N/A'}</TableCell>
                                        <TableCell align="center">
                                            {new Date(submission.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="warning" className="me-3 mt-2" onClick={() => handleEdit(submission._id)} >
                                               Edit
                                            </Button>
                                            <Button variant="contained" color="error" className="me-3 mt-2" onClick={() => handleDelete(submission._id)} >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default QuizSubmissionList;
