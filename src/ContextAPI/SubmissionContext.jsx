import React, { createContext, useState } from 'react';
import axios from 'axios';

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
    const [submissions, setSubmissions] = useState([]);
    const [submissionCount, setSubmissionCount] = useState(0); // New state for count
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch submissions by assignmentId
    // const fetchSubmissionsByAssignmentId = async (assignmentId) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.get(`http://localhost:4000/apiSubmissions/${assignmentId}`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });
    //         console.log("API Response:", response.data)
    //         setSubmissions(response.data.submissions);
    //     } catch (err) {
    //         console.error('Error fetching submissions by assId:', err);
    //         setError('Failed to fetch submissions.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchSubmissionsByAssignmentId = async (assignmentId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/apiSubmissions/${assignmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Fetched Submissions:', response.data); // Debug log
            setSubmissions(response.data.submissions); // Ensure it's an array
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };
    // Fetch submissions for a specific assignment
    // const fetchSubmissionsByAssignmentId = async (assignmentId) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const token = localStorage.getItem('token');
    //         const response = await axios.get(`http://localhost:4000/apiSubmissions/${assignmentId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log("API Response:", response.data); // Log the entire response

    //         setSubmissions(response.data.submissions);
    //     } catch (err) {
    //         console.error('Error fetching submissions:', err);
    //         setError('Failed to fetch submissions.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Fetch submissions by courseId
    const fetchSubmissionsByCourseId = async (courseId) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/apiSubmissions/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Submission by CourseId:", response.data.submissions);
            console.log("SubmissionCount by CourseId:", response.data.count);
            setSubmissions(response.data.submissions);
            setSubmissionCount(response.data.count); // Set the count

        } catch (err) {
            console.error('Error fetching submissions by courseId:', err);
            setError('Failed to fetch submissions.');
        } finally {
            setLoading(false);
        }
    };

    // Submit a new submission
    const addSubmission = async (assignmentId, submissionUrl) => {
        setLoading(true);
        setError(null);
        console.log("Url:", submissionUrl)
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(`http://localhost:4000/apiSubmissions/${assignmentId}`, submissionUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Submission Post:", response.data);
            setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);
            
        } catch (err) {
            console.error('Error submitting assignment:', err);
            setError('Failed to submit assignment.');
        } finally {
            setLoading(false);
        }
    };

    // Grade a submission
    const gradeSubmission = async (submissionId, grade, comments) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:4000/apiSubmissions/${submissionId}/grade`, { grade, comments }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubmissions((prev) =>
                prev.map((sub) => (sub._id === submissionId ? response.data : sub))
            );
        } catch (err) {
            console.error('Error grading submission:', err);
            setError('Failed to grade submission.');
        } finally {
            setLoading(false);
        }
    };

    // Delete a submission
    const deleteSubmission = async (submissionId) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/apiSubmissions/${submissionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubmissions((prev) => prev.filter((sub) => sub._id !== submissionId));
        } catch (err) {
            console.error('Error deleting submission:', err);
            setError('Failed to delete submission.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SubmissionContext.Provider
            value={{
                submissions,
                submissionCount, // Provide the count
                loading,
                error,
                fetchSubmissionsByAssignmentId,
                fetchSubmissionsByCourseId, // Add this to the context
                addSubmission,
                gradeSubmission,
                deleteSubmission,
            }}
        >
            {children}
        </SubmissionContext.Provider>
    );
};

