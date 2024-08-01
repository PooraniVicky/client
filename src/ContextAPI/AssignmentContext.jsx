import React, { createContext, useState } from 'react';
import axiosInstance from '../Services/axiosConfig';
// Create Context
export const AssignmentContext = createContext();

// AssignmentProvider Component
export const AssignmentProvider = ({ children }) => {
    const [assignments, setAssignments] = useState([]);
    const [assignmentCount, setAssignmentCount] = useState(0);
    const [currentAssignment, setCurrentAssignment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [currentSubmission, setCurrentSubmission] = useState(null);

    // Function to fetch assignments and submissions by courseId
    const fetchAssignmentsByCourseId = async (courseId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/apiAssignments/${courseId}`);
            setAssignments(response.data.assignments || []);
            setAssignmentCount(response.data.assignments.length || 0);
            setSubmissions(response.data.submissions || []);
        } catch (error) {
            console.error('Error fetching assignments and submissions:', error);
            setAssignments([]);
            setAssignmentCount(0);
            setSubmissions([]);
            if (error.response && error.response.status === 404) {
                console.error('Assignments or submissions not found for the course:', courseId);
            }
        } finally {
            setLoading(false);
        }
    };

    const addAssignment = async (courseId, assignmentData) => {
        try {
            const response = await axiosInstance.post(`/apiAssignments/${courseId}`, assignmentData);
            setAssignments(prevAssignments => [...prevAssignments, response.data]);
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
    };

    const deleteAssignment = async (assignmentId) => {
        try {
            await axiosInstance.delete(`/apiAssignments/${assignmentId}`);
            setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment._id !== assignmentId));
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    const fetchAssignmentByAssignmentId = async (assignmentId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/apiAssignments/assignment/${assignmentId}`);
            // console.log('Full response:', response);
            // console.log('Fetched assignment data:', response.data);

            setCurrentAssignment(response.data);
            setSubmissions(response.data.submissions || []);
            return response;
        } catch (error) {
            console.error('Error fetching assignment by ID:', error);
            setCurrentAssignment(null);
            setSubmissions([]);
            if (error.response && error.response.status === 404) {
                console.error('Assignment not found:', assignmentId);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateAssignment = async (assignmentId, updatedAssignment) => {
        try {
            const response = await axiosInstance.put(`/apiAssignments/${assignmentId}`, updatedAssignment);
            setAssignments(prevAssignments => prevAssignments.map(assignment =>
                assignment._id === assignmentId ? response.data : assignment
            ));
        } catch (error) {
            setError(error.message);
        }
    };

    const addSubmission = async (assignmentId, submissionUrl) => {
        try {
            const response = await axiosInstance.post(`/apiAssignments/submit/${assignmentId}`, { submissionUrl });
            setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);
        } catch (error) {
            console.error('Error adding submission:', error);
        }
    };

    const deleteSubmission = async (assignmentId, submissionId) => {
        // Frontend
        console.log('Deleting submission with ID:', submissionId, 'for assignment:', assignmentId);

        try {
            await axiosInstance.delete(`/apiAssignments/submission/${assignmentId}/${submissionId}`);
            setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission._id !== submissionId));
        } catch (error) {
            console.error('Error deleting submission:', error);
        }
    };


    const updateSubmission = async (submissionId, updatedSubmission) => {
        try {
            const response = await axiosInstance.put(`/apiAssignments/submission/${submissionId}`, updatedSubmission);
            setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
                submission._id === submissionId ? response.data : submission
            ));
        } catch (error) {
            setError(error.message);
        }
    };

    const gradeSubmission = async (assignmentId, submissionId, grade, comments) => {
        try {
            const response = await axiosInstance.put(`/apiAssignments/submission/${assignmentId}/${submissionId}/grade`, { grade, comments });
            setAssignments(prevAssignments =>
                prevAssignments.map(assignment =>
                    assignment._id === assignmentId
                        ? {
                            ...assignment, submissions: assignment.submissions.map(sub =>
                                sub._id === submissionId
                                    ? { ...sub, grade, comments }
                                    : sub
                            )
                        }
                        : assignment
                )
            );
        } catch (err) {
            console.error('Error grading submission:', err);
        }
    };

    return (
        <AssignmentContext.Provider value={{
            assignments,
            assignmentCount,
            currentAssignment,
            loading,
            error,
            submissions,
            currentSubmission,
            fetchAssignmentsByCourseId,
            fetchAssignmentByAssignmentId,
            addAssignment,
            updateAssignment,
            deleteAssignment,
            addSubmission,
            updateSubmission,
            deleteSubmission,
            gradeSubmission,
        }}>
            {children}
        </AssignmentContext.Provider>
    );
};

