// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const AssignmentSubmissionContext = createContext();

// export const AssignmentSubmissionProvider = ({ children }) => {
//     const [submissions, setSubmissions] = useState([]);
//     const [submissionCount, setSubmissionCount] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchSubmissionsByCourse = async (courseId) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`http://localhost:4000/apiSubmissions/course/${courseId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setSubmissions(response.data.submissions);
//             setSubmissionCount(response.data.count);
//         } catch (err) {
//             setError(err.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // const fetchSubmissionsByAssignment = async (assignmentId) => {
//     //     setLoading(true);
//     //     try {
//     //         const response = await axios.get(`http://localhost:4000/apiSubmissions/assignment/${assignmentId}`,{
//     //             headers: { Authorization: `Bearer ${token}` },
//     //         });
//     //         setSubmissions(response.data.submissions);
//     //     } catch (err) {
//     //         setError(err.response.data.message);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };
//     const fetchSubmissionsByAssignment = async (assignmentId) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`http://localhost:4000/apiSubmissions/assignment/${assignmentId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             console.log(response.data); // Log the raw response
//             const { submissions } = response.data;
//             console.log(Array.isArray(submissions)); // Check if submissions is an array
//             console.log(submissions); // Log the actual value of submissions
//             if (Array.isArray(submissions)) {
//                 setSubmissions(submissions);
//             } else {
//                 console.error("Expected submissions to be an array");
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchSubmissionById = async (submissionId) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`http://localhost:4000/apiSubmissions/submission/${submissionId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setSubmissions([response.data]);
//         } catch (err) {
//             setError(err.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const submitAssignment = async (assignmentId, submissionUrl) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.post(`http://localhost:4000/apiSubmissions/${assignmentId}`, { submissionUrl }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             // Ensure response.data and response.data.data exist before accessing
//             if (response && response.data) {
//                 const newSubmission = response.data.data; // Access 'data' property
//                 setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
//             } else {
//                 throw new Error('Invalid response structure');
//             }
//         } catch (err) {
//             // Use a more robust error handling
//             const errorMessage = err.response?.data?.message || err.message;
//             setError(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const gradeSubmission = async (submissionId, grade, comments) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.put(`http://localhost:4000/apiSubmissions/${submissionId}/grade`, { grade, comments }, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setSubmissions(submissions.map(submission =>
//                 submission._id === submissionId ? response.data : submission
//             ));
//         } catch (err) {
//             setError(err.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const deleteSubmission = async (submissionId) => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('token');
//             await axios.delete(`http://localhost:4000/apiSubmissions/${submissionId}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setSubmissions(submissions.filter(submission => submission._id !== submissionId));
//         } catch (err) {
//             setError(err.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <AssignmentSubmissionContext.Provider
//             value={{
//                 submissions,
//                 submissionCount,
//                 loading,
//                 error,
//                 fetchSubmissionsByCourse,
//                 fetchSubmissionsByAssignment,
//                 fetchSubmissionById,
//                 submitAssignment,
//                 gradeSubmission,
//                 deleteSubmission,
//             }}
//         >
//             {children}
//         </AssignmentSubmissionContext.Provider>
//     );
// };
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AssignmentSubmissionContext = createContext();

export const AssignmentSubmissionProvider = ({ children }) => {
    const [submissions, setSubmissions] = useState([]);
    const [submissionCount, setSubmissionCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSubmissionsByCourse = async (courseId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/apiSubmissions/course/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSubmissions(response.data.submissions);
            setSubmissionCount(response.data.count);
        } catch (err) {
            setError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubmissionsByAssignment = async (assignmentId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:4000/apiSubmissions/assignment/${assignmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(response.data); // Log the raw response
            const { submissions } = response.data;
            console.log(Array.isArray(submissions) ? submissions : 'No submissions available');
            setSubmissions(submissions);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching submissions.');
        } finally {
            setLoading(false);
        }
    };

    const deleteSubmission = async (submissionId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/apiSubmissions/${submissionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while deleting the submission.');
        }
    };

    const submitAssignment = async (assignmentId, submissionUrl) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:4000/apiSubmissions/${assignmentId}`, { assignmentId, submissionUrl }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while submitting the assignment.');
        }
    };

    const gradeSubmission = async (submissionId, gradeData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/apiSubmissions/${submissionId}`, gradeData, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while grading the submission.');
        }
    };

    return (
        <AssignmentSubmissionContext.Provider
            value={{
                submissions,
                submissionCount,
                loading,
                error,
                fetchSubmissionsByCourse,
                fetchSubmissionsByAssignment,
                deleteSubmission,
                submitAssignment,
                gradeSubmission,
            }}
        >
            {children}
        </AssignmentSubmissionContext.Provider>
    );
};
