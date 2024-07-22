// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const QuizContext = createContext();

// export const QuizProvider = ({ children }) => {
//     const [quizzes, setQuizzes] = useState([]);
//     const [loading, setLoading] = useState(false);
    
//     useEffect(() => {
//         // Fetch quiz data or initialize quizData state
//         fetchQuizzesByCourseId();
//       }, []);

//     const fetchQuizzesByCourseId = async (courseId) => {
//         setLoading(true);
//         try {
//             const response = await axios.get(`http://localhost:4000/apiQuizzes/${courseId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setQuizzes(response.data);
//             console.log("Quizzes:", response.data);
//         } catch (error) {
//             console.error('Error fetching quizzes:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchQuizById = async (quizId) => {
//         setLoading(true);
//         try {
//           const response = await axios.get(`http://localhost:4000/apiQuizzes/${quizId}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           });
//           return response.data; // Return quiz data
//         } catch (error) {
//           console.error('Error fetching quiz by Id:', error);
//           throw error; // Re-throw the error to handle it in the component
//         } finally {
//           setLoading(false);
//         }
//       };

//     const createQuiz = async (courseId, quizData) => {
//         try {
//           const response = await axios.post(`http://localhost:4000/apiQuizzes/${courseId}`, quizData, {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           });
//           setQuizzes(prevQuizzes => [...prevQuizzes, response.data]);
//           return response.data; // Optionally return the created quiz data
//         } catch (error) {
//           console.error('Error creating quiz:', error);
//           throw error; // Re-throw the error to handle it in the component
//         }
//       };
    

//     const validateQuizData = (quizData) => {
//         if (!quizData || !quizData.title || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
//             return false;
//         }
    
//         for (const question of quizData.questions) {
//             if (!question.questionText || !Array.isArray(question.options) || question.options.length < 4 || !Number.isInteger(question.correctAnswer)) {
//                 return false;
//             }
//         }
    
//         return true;
//     };
    

//     const deleteQuiz = async (quizId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiQuizzes/${quizId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
//         } catch (error) {
//             console.error('Error deleting quiz:', error);
//         }
//     };

//     const updateQuizGrade = async (quizId, grade) => {
//         try {
//             const response = await axios.patch(`http://localhost:4000/apiQuizzes/${quizId}/grade`, { grade }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setQuizzes(quizzes.map((quiz) => (quiz._id === quizId ? response.data : quiz)));
//         } catch (error) {
//             console.error('Error updating quiz grade:', error);
//         }
//     };

//     return (
//         <QuizContext.Provider value={{ 
//             quizzes, 
//             loading, 
//             fetchQuizzesByCourseId, 
//             fetchQuizById, 
//             createQuiz, 
//             deleteQuiz, 
//             updateQuizGrade 
//             }}>
//             {children}
//         </QuizContext.Provider>
//     );
// };
// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// export const QuizContext = createContext();

// export const QuizProvider = ({ children }) => {
//     const [quizzes, setQuizzes] = useState([]);
//     const [totalQuizCount, setTotalQuizCount] = useState(0); // Added state for total quiz count

//     const [loading, setLoading] = useState(false);
    
//     useEffect(() => {
//         // Fetch initial quiz data
//     }, []);

//     const fetchQuizzesByCourseId = async (courseId) => {
//         try {
//             const response = await axios.get(`http://localhost:4000/apiQuizzes/${courseId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             const { quizzes, count } = response.data;
//             console.log('Quizzes:', quizzes);
//             console.log('Total Quizzes Count:', count);
//             // Update your state or UI with quizzes and count
//         } catch (error) {
//             console.error('Error fetching quizzes:', error);
//         }
//     };

//     const fetchQuizById = async (quizId) => {
//         setLoading(true);
//         try {
//           const response = await axios.get(`http://localhost:4000/apiQuizzes/${quizId}`, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           });
//           return response.data; // Return quiz data
//         } catch (error) {
//           console.error('Error fetching quiz by Id:', error);
//           throw error; // Re-throw the error to handle it in the component
//         } finally {
//           setLoading(false);
//         }
//       };

//     const createQuiz = async (courseId, quizData) => {
//         try {
//           const response = await axios.post(`http://localhost:4000/apiQuizzes/${courseId}`, quizData, {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           });
//           setQuizzes(prevQuizzes => [...prevQuizzes, response.data]);
//           return response.data; // Optionally return the created quiz data
//         } catch (error) {
//           console.error('Error creating quiz:', error);
//           throw error; // Re-throw the error to handle it in the component
//         }
//       };
    

//     const validateQuizData = (quizData) => {
//         if (!quizData || !quizData.title || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
//             return false;
//         }
    
//         for (const question of quizData.questions) {
//             if (!question.questionText || !Array.isArray(question.options) || question.options.length < 4 || !Number.isInteger(question.correctAnswer)) {
//                 return false;
//             }
//         }
    
//         return true;
//     };
    

//     const deleteQuiz = async (quizId) => {
//         try {
//             await axios.delete(`http://localhost:4000/apiQuizzes/${quizId}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
//         } catch (error) {
//             console.error('Error deleting quiz:', error);
//         }
//     };

//     const updateQuizGrade = async (quizId, grade) => {
//         try {
//             const response = await axios.patch(`http://localhost:4000/apiQuizzes/${quizId}/grade`, { grade }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setQuizzes(quizzes.map((quiz) => (quiz._id === quizId ? response.data : quiz)));
//         } catch (error) {
//             console.error('Error updating quiz grade:', error);
//         }
//     };

//     return (
//         <QuizContext.Provider value={{ 
//             quizzes, 
//             loading, 
//             fetchQuizzesByCourseId, 
//             fetchQuizById, 
//             createQuiz, 
//             deleteQuiz, 
//             updateQuizGrade 
//             }}>
//             {children}
//         </QuizContext.Provider>
//     );
// };
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [totalQuizCount, setTotalQuizCount] = useState(0); // Added state for total quiz count
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        // Fetch quiz data or initialize quizData state
        // If you want to fetch quizzes when a specific course ID changes, 
        // you can include the courseId in the dependency array.
    }, []);

    const fetchQuizzesByCourseId = async (courseId) => {
        setLoading(true);
        try {
            if (!courseId) {
                throw new Error('Course ID is not provided');
            }
            
            const response = await axios.get(`http://localhost:4000/apiQuizzes/${courseId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            setQuizzes(response.data.quizzes);
            setTotalQuizCount(response.data.count);
    
            console.log("Quizzes:", response.data.quizzes);
            console.log("Total Quizzes Count:", response.data.count);
        } catch (error) {
            console.error('Error fetching quizzes:', error.message);
        } finally {
            setLoading(false);
        }
    };
    const fetchQuizById = async (quizId) => {
        if (!quizId) {
            throw new Error('Quiz ID is required');
        }
    
        try {
            const response = await axios.get(`http://localhost:4000/apiQuizzes/${quizId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching quiz by Id:', error.response ? error.response.data : error.message);
            throw error;
        }
 
    };

    const createQuiz = async (courseId, quizData) => {
        try {
            const response = await axios.post(`http://localhost:4000/apiQuizzes/${courseId}`, quizData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuizzes(prevQuizzes => [...prevQuizzes, response.data]);
            return response.data; // Optionally return the created quiz data
        } catch (error) {
            console.error('Error creating quiz:', error);
            throw error; // Re-throw the error to handle it in the component
        }
    };

    const deleteQuiz = async (quizId) => {
        try {
            await axios.delete(`http://localhost:4000/apiQuizzes/${quizId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    const updateQuizGrade = async (quizId, grade) => {
        try {
            const response = await axios.patch(`http://localhost:4000/apiQuizzes/${quizId}/grade`, { grade }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuizzes(quizzes.map((quiz) => (quiz._id === quizId ? response.data : quiz)));
        } catch (error) {
            console.error('Error updating quiz grade:', error);
        }
    };



    return (
        <QuizContext.Provider value={{ 
            quizzes, 
            totalQuizCount,  // Expose totalQuizCount
            loading, 
            fetchQuizzesByCourseId, 
            fetchQuizById, 
            createQuiz, 
            deleteQuiz, 
            updateQuizGrade 
        }}>
            {children}
        </QuizContext.Provider>
    );
};
