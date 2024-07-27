// // // import React, { createContext, useState } from 'react';
// // // import axios from 'axios';

// // // // Create Context
// // // export const AssignmentContext = createContext();


// // // // AssignmentProvider Component
// // // export const AssignmentProvider = ({ children }) => {
// // //     const [assignments, setAssignments] = useState([]);
// // //     const [assignmentCount, setAssignmentCount] = useState([]);
// // //     const [currentAssignment, setCurrentAssignment] = useState([]);
// // //     const [loading, setLoading] = useState(false);
// // //     const [error, setError] = useState(null);

// // //     // Function to fetch assignments by courseId
// // //     const fetchAssignmentsByCourseId = async (courseId) => {
// // //         setLoading(true);
// // //         console.log("courseId:", courseId);
// // //         try {
// // //             const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //                     'Content-Type': 'application/json',
// // //                 },
// // //             });
// // //             console.log("Assignments:", response.data)
// // //             console.log("Total Assignments Count:", response.data.count);

// // //             setAssignments(response.data);
// // //             setAssignmentCount(response.data.count);
// // //         } catch (error) {
// // //             console.error('Error fetching assignments:', error);
// // //             if (error.response && error.response.status === 404) {
// // //                 console.error('Assignments not found for the course:', courseId);
// // //             }
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     const addAssignment = async (courseId, assignmentData) => {
// // //         try {
// // //             const response = await axios.post(`http://localhost:4000/apiAssignments/${courseId}`, assignmentData, {
// // //                 headers: {
// // //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //                     'Content-Type': 'application/json',
// // //                 },
// // //             });
// // //             setAssignments(prevAssignments => Array.isArray(prevAssignments) ? [...prevAssignments, ...data] : [...data]);
// // //         } catch (error) {
// // //             console.error('Error adding assignment:', error);
// // //         }
// // //     };

// // //     const deleteAssignment = async (assignmentId) => {
// // //         try {
// // //             await axios.delete(`http://localhost:4000/apiAssignments/${assignmentId}`,{
// // //                 headers: {
// // //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //                     'Content-Type': 'application/json',
// // //                 },
// // //             });
// // //             setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment._id !== assignmentId));
// // //         } catch (error) {
// // //             console.error('Error deleting assignment:', error);
// // //         }
// // //     };
// // //     // Function to fetch a single assignment by assignmentId
// // //     const fetchAssignmentByAssignmentId = async (assignmentId) => {
// // //         try {
// // //             const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {

// // //                 headers: {
// // //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //                     'Content-Type': 'application/json',
// // //                 },
// // //             });
// // //             console.log("current.Assignment:", response.data);;
// // //             setCurrentAssignment(response.data);
// // //         } catch (error) {
// // //             setError(error.message);
// // //         }
// // //     };

   
// // //     // Function to update an assignment by assignmentId
// // //     const updateAssignment = async (assignmentId, updatedAssignment) => {
// // //         try {
// // //             const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}`, updatedAssignment, {

// // //                 headers: {
// // //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// // //                     'Content-Type': 'application/json',
// // //                 },
// // //             });
// // //             setAssignments(assignments.map(assignment =>
// // //                 assignment._id === assignmentId ? response.data : assignment
// // //             ));
// // //         } catch (error) {
// // //             setError(error.message);
// // //         }
// // //     };

   

// // //     return (
// // //         <AssignmentContext.Provider value={{
// // //             assignments,
// // //             currentAssignment,
// // //             loading,
// // //             error,
// // //             fetchAssignmentsByCourseId,
// // //             fetchAssignmentByAssignmentId,
// // //             addAssignment,
// // //             updateAssignment,
// // //             deleteAssignment
// // //         }}>
// // //             {children}
// // //         </AssignmentContext.Provider>
// // //     );
// // // }
// // import React, { createContext, useState } from 'react';
// // import axios from 'axios';

// // // Create Context
// // export const AssignmentContext = createContext();

// // // AssignmentProvider Component
// // export const AssignmentProvider = ({ children }) => {
// //     const [assignments, setAssignments] = useState([]);
// //     const [assignmentCount, setAssignmentCount] = useState(0);
// //     const [currentAssignment, setCurrentAssignment] = useState(null);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState(null);
// //     const [submissions, setSubmissions] = useState([]);
// //     const [currentSubmission, setCurrentSubmission] = useState(null);

// //     // Function to fetch assignments by courseId
// //     // const fetchAssignmentsByCourseId = async (courseId) => {
// //     //     setLoading(true);
// //     //     console.log("courseId:", courseId);
// //     //     try {
// //     //         const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
// //     //             headers: {
// //     //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //     //                 'Content-Type': 'application/json',
// //     //             },
// //     //         });
// //     //         console.log("Assignments:", response.data.assignments)
// //     //         console.log("Total Assignments Count:", response.data.count);

// //     //         setAssignments(response.data.assignments);
// //     //         setAssignmentCount(response.data.count);
// //     //     } catch (error) {
// //     //         console.error('Error fetching assignments:', error);
// //     //         setAssignments([]);
// //     //         setAssignmentCount(0);
// //     //         if (error.response && error.response.status === 404) {
// //     //             console.error('Assignments not found for the course:', courseId);
// //     //         }
// //     //     } finally {
// //     //         setLoading(false);
// //     //     }
// //     // };
// //     // Function to fetch assignments and submissions by courseId
// //     const fetchAssignmentsByCourseId = async (courseId) => {
// //         setLoading(true);
// //         console.log("courseId:", courseId);
// //         try {
// //             const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
// //                 headers: {
// //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                     'Content-Type': 'application/json',
// //                 },
// //             });
// //             console.log("Assignments:", response.data.assignments);
// //             console.log("Submissions:", response.data.submissions);

// //             setAssignments(response.data.assignments);
// //             setAssignmentCount(response.data.assignments.length);
// //             setSubmissions(response.data.submissions || []);
// //         } catch (error) {
// //             console.error('Error fetching assignments and submissions:', error);
// //             setAssignments([]);
// //             setAssignmentCount(0);
// //             setSubmissions([]);
// //             if (error.response && error.response.status === 404) {
// //                 console.error('Assignments or submissions not found for the course:', courseId);
// //             }
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const addAssignment = async (courseId, assignmentData) => {
// //         try {
// //             const response = await axios.post(`http://localhost:4000/apiAssignments/${courseId}`, assignmentData, {
// //                 headers: {
// //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                     'Content-Type': 'application/json',
// //                 },
// //             });
// //             setAssignments(prevAssignments => Array.isArray(prevAssignments) ? [...prevAssignments, response.data] : [response.data]);
// //         } catch (error) {
// //             console.error('Error adding assignment:', error);
// //         }
// //     };

// //     const deleteAssignment = async (assignmentId) => {
// //         try {
// //             await axios.delete(`http://localhost:4000/apiAssignments/${assignmentId}`, {
// //                 headers: {
// //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                     'Content-Type': 'application/json',
// //                 },
// //             });
// //             setAssignments(prevAssignments => Array.isArray(prevAssignments) ? prevAssignments.filter(assignment => assignment._id !== assignmentId) : []);
// //         } catch (error) {
// //             console.error('Error deleting assignment:', error);
// //         }
// //     };

// //     const fetchAssignmentByAssignmentId = async (assignmentId) => {
// //         try {
// //             const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {
// //                 headers: {
// //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                     'Content-Type': 'application/json',
// //                 },
// //             });
// //             console.log("current.Assignment:", response.data);
// //             setCurrentAssignment(response.data);
// //         } catch (error) {
// //             setError(error.message);
// //         }
// //     };

// //     const updateAssignment = async (assignmentId, updatedAssignment) => {
// //         try {
// //             const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}`, updatedAssignment, {
// //                 headers: {
// //                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                     'Content-Type': 'application/json',
// //                 },
// //             });
// //             setAssignments(prevAssignments => Array.isArray(prevAssignments) ? prevAssignments.map(assignment =>
// //                 assignment._id === assignmentId ? response.data : assignment
// //             ) : []);
// //         } catch (error) {
// //             setError(error.message);
// //         }
// //     };
// //         // Function to fetch submissions by assignmentId
// //         // const fetchSubmissionsByAssignmentId = async (assignmentId) => {
// //         //     setLoading(true);
// //         //     console.log("assignmentId:", assignmentId);
// //         //     try {
// //         //         const response = await axios.get(`http://localhost:4000/apiSubmissions/${assignmentId}`, {
// //         //             headers: {
// //         //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //         //                 'Content-Type': 'application/json',
// //         //             },
// //         //         });
// //         //         console.log("Submissions:", response.data.submissions);
// //         //         setSubmissions(response.data.submissions);
// //         //     } catch (error) {
// //         //         console.error('Error fetching submissions:', error);
// //         //         setSubmissions([]);
// //         //         if (error.response && error.response.status === 404) {
// //         //             console.error('Submissions not found for the assignment:', assignmentId);
// //         //         }
// //         //     } finally {
// //         //         setLoading(false);
// //         //     }
// //         // };
    
// //         const addSubmission = async (assignmentId, submissionData) => {
// //             try {
// //                 const response = await axios.post(`http://localhost:4000/apiAssignments/${assignmentId}`, submissionData, {
// //                     headers: {
// //                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                         'Content-Type': 'application/json',
// //                     },
// //                 });
// //                 setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);
// //             } catch (error) {
// //                 console.error('Error adding submission:', error);
// //             }
// //         };
    
// //         const deleteSubmission = async (submissionId) => {
// //             try {
// //                 await axios.delete(`http://localhost:4000/apiAssignments/${submissionId}`, {
// //                     headers: {
// //                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                         'Content-Type': 'application/json',
// //                     },
// //                 });
// //                 setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission._id !== submissionId));
// //             } catch (error) {
// //                 console.error('Error deleting submission:', error);
// //             }
// //         };
    
// //         // const fetchSubmissionBySubmissionId = async (submissionId) => {
// //         //     try {
// //         //         const response = await axios.get(`http://localhost:4000/apiSubmissions/${submissionId}`, {
// //         //             headers: {
// //         //                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //         //                 'Content-Type': 'application/json',
// //         //             },
// //         //         });
// //         //         console.log("current.Submission:", response.data);
// //         //         setCurrentSubmission(response.data);
// //         //     } catch (error) {
// //         //         setError(error.message);
// //         //     }
// //         // };
    
// //         const updateSubmission = async (submissionId, updatedSubmission) => {
// //             try {
// //                 const response = await axios.put(`http://localhost:4000/apiAssignments/${submissionId}`, updatedSubmission, {
// //                     headers: {
// //                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
// //                         'Content-Type': 'application/json',
// //                     },
// //                 });
// //                 setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
// //                     submission._id === submissionId ? response.data : submission
// //                 ));
// //             } catch (error) {
// //                 setError(error.message);
// //             }
// //         };
    
// //         return (
// //             <AssignmentContext.Provider value={{
// //                 assignments,
// //                 assignmentCount,
// //                 currentAssignment,
// //                 loading,
// //                 error,
// //                 submissions,
// //                 currentSubmission,
// //                 fetchAssignmentsByCourseId,
// //                 fetchAssignmentByAssignmentId,
// //                 addAssignment,
// //                 updateAssignment,
// //                 deleteAssignment,
// //                 fetchSubmissionsByAssignmentId,
// //                 fetchSubmissionBySubmissionId,
// //                 addSubmission,
// //                 updateSubmission,
// //                 deleteSubmission
// //             }}>
// //                 {children}
// //             </AssignmentContext.Provider>
// //         );
// //     };
// import React, { createContext, useState } from 'react';
// import axios from 'axios';

// // Create Context
// export const AssignmentContext = createContext();

// // AssignmentProvider Component
// export const AssignmentProvider = ({ children }) => {
//     const [assignments, setAssignments] = useState([]);
//     const [assignmentCount, setAssignmentCount] = useState(0);
//     const [currentAssignment, setCurrentAssignment] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [submissions, setSubmissions] = useState([]);
//     const [currentSubmission, setCurrentSubmission] = useState(null);

//     // Function to fetch assignments and submissions by courseId
//     const fetchAssignmentsByCourseId = async (courseId) => {
//         setLoading(true);
//         console.log("courseId:", courseId);
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log("Assignments:", response.data.assignments);
//             console.log("Submissions:", response.data.submissions);

//             setAssignments(response.data.assignments);
//             setAssignmentCount(response.data.assignments.length);
//             setSubmissions(response.data.submissions || []);
//         } catch (error) {
//             console.error('Error fetching assignments and submissions:', error);
//             setAssignments([]);
//             setAssignmentCount(0);
//             setSubmissions([]);
//             if (error.response && error.response.status === 404) {
//                 console.error('Assignments or submissions not found for the course:', courseId);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addAssignment = async (courseId, assignmentData) => {
//         try {
//             const response = await axios.post(`http://localhost:4000/apiAssignments/${courseId}`, assignmentData, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => Array.isArray(prevAssignments) ? [...prevAssignments, response.data] : [response.data]);
//         } catch (error) {
//             console.error('Error adding assignment:', error);
//         }
//     };

//     const deleteAssignment = async (assignmentId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiAssignments/${assignmentId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment._id !== assignmentId));
//         } catch (error) {
//             console.error('Error deleting assignment:', error);
//         }
//     };

//     const fetchAssignmentByAssignmentId = async (assignmentId) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log("current.Assignment:", response.data);
//             setCurrentAssignment(response.data);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const updateAssignment = async (assignmentId, updatedAssignment) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}`, updatedAssignment, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => prevAssignments.map(assignment =>
//                 assignment._id === assignmentId ? response.data : assignment
//             ));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     // Function to fetch submissions by assignmentId
//     const fetchSubmissionsByAssignmentId = async (assignmentId) => {
//         setLoading(true);
//         console.log("assignmentId:", assignmentId);
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log("Submissions:", response.data.submissions);
//             setSubmissions(response.data.submissions || []);
//         } catch (error) {
//             console.error('Error fetching submissions:', error);
//             setSubmissions([]);
//             if (error.response && error.response.status === 404) {
//                 console.error('Submissions not found for the assignment:', assignmentId);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addSubmission = async (assignmentId, submissionData) => {
//         try {
//             const response = await axios.post(`http://localhost:4000/apiAssignments/submit/${assignmentId}`, submissionData, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);
//         } catch (error) {
//             console.error('Error adding submission:', error);
//         }
//     };

//     const deleteSubmission = async (submissionId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiAssignments/${submissionId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission._id !== submissionId));
//         } catch (error) {
//             console.error('Error deleting submission:', error);
//         }
//     };

//     const fetchSubmissionBySubmissionId = async (submissionId) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${submissionId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log("current.Submission:", response.data);
//             setCurrentSubmission(response.data);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const updateSubmission = async (submissionId, updatedSubmission) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${submissionId}`, updatedSubmission, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
//                 submission._id === submissionId ? response.data : submission
//             ));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <AssignmentContext.Provider value={{
//             assignments,
//             assignmentCount,
//             currentAssignment,
//             loading,
//             error,
//             submissions,
//             currentSubmission,
//             fetchAssignmentsByCourseId,
//             fetchAssignmentByAssignmentId,
//             addAssignment,
//             updateAssignment,
//             deleteAssignment,
//             fetchSubmissionsByAssignmentId,
//             fetchSubmissionBySubmissionId,
//             addSubmission,
//             updateSubmission,
//             deleteSubmission
//         }}>
//             {children}
//         </AssignmentContext.Provider>
//     );
// };
// import React, { createContext, useState } from 'react';
// import axios from 'axios';

// // Create Context
// export const AssignmentContext = createContext();

// // AssignmentProvider Component
// export const AssignmentProvider = ({ children }) => {
//     const [assignments, setAssignments] = useState([]);
//     const [assignmentCount, setAssignmentCount] = useState(0);
//     const [currentAssignment, setCurrentAssignment] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [submissions, setSubmissions] = useState([]);
//     const [currentSubmission, setCurrentSubmission] = useState(null);

//     // Function to fetch assignments and submissions by courseId
//     const fetchAssignmentsByCourseId = async (courseId) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(response.data.assignments || []);
//             setAssignmentCount(response.data.assignments.length || 0);
//             setSubmissions(response.data.submissions || []);
//         } catch (error) {
//             console.error('Error fetching assignments and submissions:', error);
//             setAssignments([]);
//             setAssignmentCount(0);
//             setSubmissions([]);
//             if (error.response && error.response.status === 404) {
//                 console.error('Assignments or submissions not found for the course:', courseId);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addAssignment = async (courseId, assignmentData) => {
//         try {
//             const response = await axios.post(`http://localhost:4000/apiAssignments/${courseId}`, assignmentData, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => [...prevAssignments, response.data]);
//         } catch (error) {
//             console.error('Error adding assignment:', error);
//         }
//     };

//     const deleteAssignment = async (assignmentId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiAssignments/${assignmentId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment._id !== assignmentId));
//         } catch (error) {
//             console.error('Error deleting assignment:', error);
//         }
//     };

//     const fetchAssignmentByAssignmentId = async (assignmentId) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setCurrentAssignment(response.data);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const updateAssignment = async (assignmentId, updatedAssignment) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}`, updatedAssignment, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => prevAssignments.map(assignment =>
//                 assignment._id === assignmentId ? response.data : assignment
//             ));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     // Function to fetch submissions by assignmentId
//     const fetchSubmissionsByAssignmentId = async (assignmentId) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/assignment/${assignmentId}/submissions`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(response.data.submissions || []);
//         } catch (error) {
//             console.error('Error fetching submissions:', error);
//             setSubmissions([]);
//             if (error.response && error.response.status === 404) {
//                 console.error('Submissions not found for the assignment:', assignmentId);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addSubmission = async (assignmentId, submissionUrl) => {
//         try {
//             const response = await axios.post(`http://localhost:4000/apiAssignments/submit/${assignmentId}`, {submissionUrl}, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);
//         } catch (error) {
//             console.error('Error adding submission:', error);
//         }
//     };

//     const deleteSubmission = async (submissionId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiAssignments/${submissionId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission._id !== submissionId));
//         } catch (error) {
//             console.error('Error deleting submission:', error);
//         }
//     };

//     const updateSubmission = async (submissionId, updatedSubmission) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${submissionId}`, updatedSubmission, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
//                 submission._id === submissionId ? response.data : submission
//             ));
//         } catch (error) {
//             setError(error.message);
//         }
//     };
//     const gradeSubmission = async (assignmentId, submissionId, grade, comments) => {
//         try {
//           const response = await axios.put(`http://localhost:4000/apiAssignment/${assignmentId}/submission/${submissionId}/grade`, { grade, comments });
//           setAssignments(prevAssignments =>
//             prevAssignments.map(assignment =>
//               assignment._id === assignmentId
//                 ? { ...assignment, submissions: assignment.submissions.map(sub =>
//                     sub._id === submissionId
//                       ? { ...sub, grade, comments }
//                       : sub
//                   )}
//                 : assignment
//             )
//           );
//         } catch (err) {
//           console.error('Error grading submission:', err);
//         }
//       };

//     return (
//         <AssignmentContext.Provider value={{
//             assignments,
//             assignmentCount,
//             currentAssignment,
//             loading,
//             error,
//             submissions,
//             currentSubmission,
//             fetchAssignmentsByCourseId,
//             fetchAssignmentByAssignmentId,
//             addAssignment,
//             updateAssignment,
//             deleteAssignment,
//             fetchSubmissionsByAssignmentId,
//             addSubmission,
//             updateSubmission,
//             deleteSubmission,
//             gradeSubmission,
//         }}>
//             {children}
//         </AssignmentContext.Provider>
//     );
// };
// import React, { createContext, useState } from 'react';
// import axios from 'axios';

// // Create Context
// export const AssignmentContext = createContext();

// // AssignmentProvider Component
// export const AssignmentProvider = ({ children }) => {
//     const [assignments, setAssignments] = useState([]);
//     const [assignmentCount, setAssignmentCount] = useState(0);
//     const [currentAssignment, setCurrentAssignment] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [submissions, setSubmissions] = useState([]);
//     const [currentSubmission, setCurrentSubmission] = useState(null);

//     // Function to fetch assignments and submissions by courseId
//     const fetchAssignmentsByCourseId = async (courseId) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(response.data.assignments || []);
//             setAssignmentCount(response.data.assignments.length || 0);
//             setSubmissions(response.data.submissions || []);
//         } catch (error) {
//             console.error('Error fetching assignments and submissions:', error);
//             setAssignments([]);
//             setAssignmentCount(0);
//             setSubmissions([]);
//             if (error.response && error.response.status === 404) {
//                 console.error('Assignments or submissions not found for the course:', courseId);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const addAssignment = async (courseId, assignmentData) => {
//         try {
//             const response = await axios.post(`http://localhost:4000/apiAssignments/${courseId}`, assignmentData, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => [...prevAssignments, response.data]);
//         } catch (error) {
//             console.error('Error adding assignment:', error);
//         }
//     };

//     const deleteAssignment = async (assignmentId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiAssignments/${assignmentId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment._id !== assignmentId));
//         } catch (error) {
//             console.error('Error deleting assignment:', error);
//         }
//     };

//     const fetchAssignmentByAssignmentId = async (assignmentId) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setCurrentAssignment(response.data);
//             setSubmissions(response.data.submissions || []);
//         } catch (error) {
//             console.error('Error fetching assignment by ID:', error);
//             setCurrentAssignment(null);
//             setSubmissions([]);
//             if (error.response && error.response.status === 404) {
//                 console.error('Assignment not found:', assignmentId);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };

//     const updateAssignment = async (assignmentId, updatedAssignment) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}`, updatedAssignment, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments => prevAssignments.map(assignment =>
//                 assignment._id === assignmentId ? response.data : assignment
//             ));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const addSubmission = async (assignmentId, submissionUrl) => {
//         try {
//             const response = await axios.post(`http://localhost:4000/apiAssignments/submit/${assignmentId}`, {submissionUrl}, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);
//         } catch (error) {
//             console.error('Error adding submission:', error);
//         }
//     };

//     const deleteSubmission = async (submissionId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiAssignments/${submissionId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission._id !== submissionId));
//         } catch (error) {
//             console.error('Error deleting submission:', error);
//         }
//     };

//     const updateSubmission = async (submissionId, updatedSubmission) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${submissionId}`, updatedSubmission, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
//                 submission._id === submissionId ? response.data : submission
//             ));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     const gradeSubmission = async (assignmentId, submissionId, grade, comments) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}/submission/${submissionId}/grade`, { grade, comments }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(prevAssignments =>
//                 prevAssignments.map(assignment =>
//                     assignment._id === assignmentId
//                         ? { ...assignment, submissions: assignment.submissions.map(sub =>
//                             sub._id === submissionId
//                                 ? { ...sub, grade, comments }
//                                 : sub
//                         )}
//                         : assignment
//                 )
//             );
//         } catch (err) {
//             console.error('Error grading submission:', err);
//         }
//     };

//     return (
//         <AssignmentContext.Provider value={{
//             assignments,
//             assignmentCount,
//             currentAssignment,
//             loading,
//             error,
//             submissions,
//             currentSubmission,
//             fetchAssignmentsByCourseId,
//             fetchAssignmentByAssignmentId,
//             addAssignment,
//             updateAssignment,
//             deleteAssignment,
//             addSubmission,
//             updateSubmission,
//             deleteSubmission,
//             gradeSubmission,
//         }}>
//             {children}
//         </AssignmentContext.Provider>
//     );
// };
import React, { createContext, useState } from 'react';
import axios from 'axios';

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
            const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
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
            const response = await axios.post(`http://localhost:4000/apiAssignments/${courseId}`, assignmentData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setAssignments(prevAssignments => [...prevAssignments, response.data]);
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
    };

    const deleteAssignment = async (assignmentId) => {
        try {
            await axios.delete(`http://localhost:4000/apiAssignments/${assignmentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setAssignments(prevAssignments => prevAssignments.filter(assignment => assignment._id !== assignmentId));
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    const fetchAssignmentByAssignmentId = async (assignmentId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/apiAssignments/assignment/${assignmentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setCurrentAssignment(response.data);
            setSubmissions(response.data.submissions || []);
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
            const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}`, updatedAssignment, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setAssignments(prevAssignments => prevAssignments.map(assignment =>
                assignment._id === assignmentId ? response.data : assignment
            ));
        } catch (error) {
            setError(error.message);
        }
    };

    const addSubmission = async (assignmentId, submissionUrl) => {
        try {
            const response = await axios.post(`http://localhost:4000/apiAssignments/submit/${assignmentId}`, {submissionUrl}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);
        } catch (error) {
            console.error('Error adding submission:', error);
        }
    };

    const deleteSubmission = async (assignmentId, submissionId) => {
        // Frontend
console.log('Deleting submission with ID:', submissionId, 'for assignment:', assignmentId);

        try {
            await axios.delete(`http://localhost:4000/apiAssignments/submission/${assignmentId}/${submissionId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission._id !== submissionId));
        } catch (error) {
            console.error('Error deleting submission:', error);
        }
    };
    

    const updateSubmission = async (submissionId, updatedSubmission) => {
        try {
            const response = await axios.put(`http://localhost:4000/apiAssignments/submission/${submissionId}`, updatedSubmission, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
                submission._id === submissionId ? response.data : submission
            ));
        } catch (error) {
            setError(error.message);
        }
    };

    const gradeSubmission = async (assignmentId, submissionId, grade, comments) => {
        try {
            const response = await axios.put(`http://localhost:4000/apiAssignments/submission/${assignmentId}/${submissionId}/grade`, { grade, comments }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setAssignments(prevAssignments =>
                prevAssignments.map(assignment =>
                    assignment._id === assignmentId
                        ? { ...assignment, submissions: assignment.submissions.map(sub =>
                            sub._id === submissionId
                                ? { ...sub, grade, comments }
                                : sub
                        )}
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

  