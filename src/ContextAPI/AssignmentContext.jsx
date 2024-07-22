// import React, { createContext, useState } from 'react';
// import axios from 'axios';

// // Create Context
// export const AssignmentContext = createContext();


// // AssignmentProvider Component
// export const AssignmentProvider = ({ children }) => {
//     const [assignments, setAssignments] = useState([]);
//     const [assignmentCount, setAssignmentCount] = useState([]);
//     const [currentAssignment, setCurrentAssignment] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Function to fetch assignments by courseId
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
//             console.log("Assignments:", response.data)
//             console.log("Total Assignments Count:", response.data.count);

//             setAssignments(response.data);
//             setAssignmentCount(response.data.count);
//         } catch (error) {
//             console.error('Error fetching assignments:', error);
//             if (error.response && error.response.status === 404) {
//                 console.error('Assignments not found for the course:', courseId);
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
//             setAssignments(prevAssignments => Array.isArray(prevAssignments) ? [...prevAssignments, ...data] : [...data]);
//         } catch (error) {
//             console.error('Error adding assignment:', error);
//         }
//     };

//     const deleteAssignment = async (assignmentId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiAssignments/${assignmentId}`,{
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
//     // Function to fetch a single assignment by assignmentId
//     const fetchAssignmentByAssignmentId = async (assignmentId) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {

//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             console.log("current.Assignment:", response.data);;
//             setCurrentAssignment(response.data);
//         } catch (error) {
//             setError(error.message);
//         }
//     };

   
//     // Function to update an assignment by assignmentId
//     const updateAssignment = async (assignmentId, updatedAssignment) => {
//         try {
//             const response = await axios.put(`http://localhost:4000/apiAssignments/${assignmentId}`, updatedAssignment, {

//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });
//             setAssignments(assignments.map(assignment =>
//                 assignment._id === assignmentId ? response.data : assignment
//             ));
//         } catch (error) {
//             setError(error.message);
//         }
//     };

   

//     return (
//         <AssignmentContext.Provider value={{
//             assignments,
//             currentAssignment,
//             loading,
//             error,
//             fetchAssignmentsByCourseId,
//             fetchAssignmentByAssignmentId,
//             addAssignment,
//             updateAssignment,
//             deleteAssignment
//         }}>
//             {children}
//         </AssignmentContext.Provider>
//     );
// }
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

    // Function to fetch assignments by courseId
    const fetchAssignmentsByCourseId = async (courseId) => {
        setLoading(true);
        console.log("courseId:", courseId);
        try {
            const response = await axios.get(`http://localhost:4000/apiAssignments/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("Assignments:", response.data.assignments)
            console.log("Total Assignments Count:", response.data.count);

            setAssignments(response.data.assignments);
            setAssignmentCount(response.data.count);
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setAssignments([]);
            setAssignmentCount(0);
            if (error.response && error.response.status === 404) {
                console.error('Assignments not found for the course:', courseId);
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
            setAssignments(prevAssignments => Array.isArray(prevAssignments) ? [...prevAssignments, response.data] : [response.data]);
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
            setAssignments(prevAssignments => Array.isArray(prevAssignments) ? prevAssignments.filter(assignment => assignment._id !== assignmentId) : []);
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    const fetchAssignmentByAssignmentId = async (assignmentId) => {
        try {
            const response = await axios.get(`http://localhost:4000/apiAssignments/${assignmentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("current.Assignment:", response.data);
            setCurrentAssignment(response.data);
        } catch (error) {
            setError(error.message);
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
            setAssignments(prevAssignments => Array.isArray(prevAssignments) ? prevAssignments.map(assignment =>
                assignment._id === assignmentId ? response.data : assignment
            ) : []);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <AssignmentContext.Provider value={{
            assignments,
            assignmentCount,
            currentAssignment,
            loading,
            error,
            fetchAssignmentsByCourseId,
            fetchAssignmentByAssignmentId,
            addAssignment,
            updateAssignment,
            deleteAssignment
        }}>
            {children}
        </AssignmentContext.Provider>
    );
};
