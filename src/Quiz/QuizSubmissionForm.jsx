// import React, { useState, useContext, useEffect } from 'react';
// import { QuizContext } from '../ContextAPI/QuizContext';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const QuizSubmissionForm = ({quizId, onGradeSubmit}) => {
//   const { fetchQuizById } = useContext(QuizContext);
//   // const {quizId} = useParams;
//   const [quiz, setQuiz] = useState(null);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [score, setScore] = useState(null);
//   const [isSubmitted, setIsSubmitted] = useState(false);
// console.log("Quiz Id:", quizId);
//   // useEffect(() => {
//   //   const getQuiz = async () => {
//   //     try {
//   //       const quizData = await fetchQuizById(quizId);
//   //       setQuiz(quizData);
//   //       setAnswers(new Array(quizData.questions.length).fill(null));
//   //     } catch (error) {
//   //       console.error('Error fetching quizById:', error);
//   //     }
//   //   };

//   //   getQuiz();
//   // }, []);
//   useEffect(() => {
//     const getQuiz = async () => {
//         try {
//             if (!quizId) {
//                 throw new Error('Quiz ID is required');
//             }
//             const quizData = await fetchQuizById(quizId);
//             setQuiz(quizData);
//         } catch (err) {
//             console.error(err.message);
//         }
//     };

//     getQuiz();
// }, [quizId]);

//   if (!quiz) return <div>Loading...</div>;

//   const handleAnswerChange = (index, selectedOption) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = selectedOption;
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post(`http://localhost:4000/apiQuizzes/${quizId}/grade`, { answers }, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setScore(response.data.score);
//       setIsSubmitted(true);
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//     }
//   };

//   const currentQuestion = quiz.questions[currentQuestionIndex];

//   return (
//     <div>
//       <h2>{quiz.title}</h2>
//       <div>
//         <h3>{currentQuestion.questionText}</h3>
//         {currentQuestion.options.map((option, index) => (
//           <div key={index}>
//             <label>
//               <input
//                 type="radio"
//                 name={`question-${currentQuestionIndex}`}
//                 value={option}
//                 checked={answers[currentQuestionIndex] === option}
//                 onChange={() => handleAnswerChange(currentQuestionIndex, option)}
//               />
//               {option}
//             </label>
//           </div>
//         ))}
//       </div>
//       <div>
//         {currentQuestionIndex > 0 && (
//           <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Previous</button>
//         )}
//         {currentQuestionIndex < quiz.questions.length - 1 && (
//           <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Save & Next</button>
//         )}
//         {currentQuestionIndex === quiz.questions.length - 1 && (
//           <button onClick={handleSubmit}>Submit Quiz</button>
//         )}
//       </div>
//       {isSubmitted && (
//         <div>
//           <h3>Quiz Submitted</h3>
//           <p>Score: {score}</p>
//           <p>Correct Answers: {answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length} / {quiz.questions.length}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizSubmissionForm;
import React, { useState, useEffect, useContext } from 'react';
import { QuizContext } from '../ContextAPI/QuizContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const QuizSubmissionForm = ({ quizId }) => {
    const { fetchQuizById, submitQuiz } = useContext(QuizContext);
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const { courseId } = useParams();

    // useEffect(() => {
    //     const loadQuiz = async () => {
    //         try {
    //             const fetchedQuiz = await fetchQuizById(quizId);
    //             setQuiz(fetchedQuiz);
    //             setAnswers(Array(fetchedQuiz.questions.length).fill(''));
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching quiz:', error);
    //             setLoading(false);
    //         }
    //     };
    //     loadQuiz();
    // }, [quizId, fetchQuizById]);


    useEffect(() => {
      const loadQuiz = async () => {
          try {
            if (!quizId) {
                throw new Error("Quiz ID is required");
            }
              const fetchedQuiz = await fetchQuizById(quizId);
              if (fetchedQuiz && fetchedQuiz.questions) {
                  setQuiz(fetchedQuiz);
                  setAnswers(Array(fetchedQuiz.questions.length).fill(''));
              } else {
                  console.error('Fetched quiz does not have questions:', fetchedQuiz);
              }
              setLoading(false);
          } catch (error) {
              console.error('Error fetching quiz:', error);
              setLoading(false);
          }
      };
      loadQuiz();
  }, [quizId, fetchQuizById]);
    const handleAnswerChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        try {
            await submitQuiz(quizId, answers);
            navigate(`/quiz-result/${quizId}`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (!quiz) {
        return <Typography>Quiz not found.</Typography>;
    }

    return (
        <div>
            <Typography variant="h5">{quiz.title}</Typography>
            {quiz.questions && quiz.questions.length > 0 && (
                <div>
                    <Typography variant="h6">Question {currentQuestionIndex + 1}</Typography>
                    <Typography>{quiz.questions[currentQuestionIndex].questionText}</Typography>
                    <TextField
                        value={answers[currentQuestionIndex]}
                        onChange={handleAnswerChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                    />
                    <div>
                        {currentQuestionIndex > 0 && (
                            <Button onClick={handlePreviousQuestion}>Previous</Button>
                        )}
                        {currentQuestionIndex < quiz.questions.length - 1 ? (
                            <Button onClick={handleNextQuestion}>Next</Button>
                        ) : (
                            <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizSubmissionForm;
