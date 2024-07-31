import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LessonContext } from '../ContextAPI/LessonContext';
import { AuthContext } from '../ContextAPI/AuthContext';
import { Container, Card, CardBody } from 'react-bootstrap';
import { Button, Typography } from '@mui/material';
import { message } from 'antd';
import YouTubePlayer from './YouTubePlayer'; // Import the YouTubePlayer component

const LessonDetailed = () => {
    const { lessonId } = useParams();
    const { fetchLessonById, markLessonAsCompleted } = useContext(LessonContext);
    const { users } = useContext(AuthContext);
    const [lesson, setLesson] = useState(null);
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedLesson = await fetchLessonById(lessonId);
                if (fetchedLesson) {
                    setLesson(fetchedLesson);
                    // Ensure completedBy is an array before calling .includes()
                    const completedBy = Array.isArray(fetchedLesson.completedBy) ? fetchedLesson.completedBy : [];
                    setCompleted(completedBy.includes(users?._id));
                } else {
                    message.error('Lesson not found.');
                }
            } catch (error) {
                console.error('Error fetching lesson details:', error);
                message.error('Failed to fetch lesson details.');
            }
        };
        fetchData();
    }, [lessonId, users?._id]);

    const handleMarkAsCompleted = async () => {
        try {
            await markLessonAsCompleted(lessonId, users._id, 'completed');
            setCompleted(true);
            navigate(-1);
            message.success('Lesson marked as completed!');
        } catch (error) {
            console.error('Error marking lesson as completed:', error);
            message.error('Failed to mark lesson as completed.');
        }
    };

    if (!lesson) return <div>Loading...</div>;

    return (
        <Container>
            <Card>
                <CardBody>
                    <Typography variant="h4">{lesson.session}</Typography>
                    <Typography variant="body1"><strong>Lesson Description: </strong>{lesson.description}</Typography>
                    <Typography variant="body1"><strong>Lesson Url: </strong><a href={lesson.url} target='_blank' rel="noopener noreferrer">Click Here</a></Typography>
                    <Typography variant="body1"><strong>Lesson Completion Status: </strong>{lesson.completionStatus}</Typography>
                    <YouTubePlayer url={lesson.url} /> {/* Add the YouTubePlayer component */}
                    
                    <Button
                        variant="outlined"
                        color={completed ? 'success' : 'primary'}
                        onClick={handleMarkAsCompleted}
                        disabled={completed}
                    >
                        {completed ? 'Completed' : 'Mark as Completed'}
                    </Button>
                </CardBody>
            </Card>
        </Container>
    );
};

export default LessonDetailed;
// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { LessonContext } from '../ContextAPI/LessonContext';
// import { AuthContext } from '../ContextAPI/AuthContext';
// import { Container, Card, CardBody } from 'react-bootstrap';
// import { Button, Typography } from '@mui/material';
// import { message } from 'antd';
// import YouTubePlayer from './YouTubePlayer'; // Import the YouTubePlayer component

// const LessonDetailed = () => {
//     const { lessonId } = useParams();
//     const { fetchLessonById, markLessonAsCompleted } = useContext(LessonContext);
//     const { users } = useContext(AuthContext);
//     const [lesson, setLesson] = useState(null);
//     const [completed, setCompleted] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 // Fetch the lesson details
//                 const fetchedLesson = await fetchLessonById(lessonId);
//                 if (fetchedLesson) {
//                     setLesson(fetchedLesson);
//                     // Check if the logged-in user has completed the lesson
//                     const isCompleted = fetchedLesson.completedBy && fetchedLesson.completedBy.includes(users?._id);
//                     setCompleted(isCompleted);
//                 } else {
//                     message.error('Lesson not found.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching lesson details:', error);
//                 message.error('Failed to fetch lesson details.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [lessonId, users?._id]);

//     const handleMarkAsCompleted = async () => {
//         setLoading(true);
//         try {
//             await markLessonAsCompleted(lessonId, users._id);
//             // Update the completion status based on the API response
//             setCompleted(true);
//             message.success('Lesson marked as completed!');
            
//             // Optionally, refetch the lesson data to ensure consistency
//             const updatedLesson = await fetchLessonById(lessonId);
//             setLesson(updatedLesson);
//         } catch (error) {
//             console.error('Error marking lesson as completed:', error);
//             message.error('Failed to mark lesson as completed.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <div>Loading...</div>;
//     if (!lesson) return <div>Lesson not found.</div>;

//     return (
//         <Container>
//             <Card>
//                 <CardBody>
//                     <Typography variant="h4">{lesson.session}</Typography>
//                     <Typography variant="body1"><strong>Lesson Description: </strong>{lesson.description}</Typography>
//                     <Typography variant="body1"><strong>Lesson Url: </strong><a href={lesson.url} target='_blank' rel="noopener noreferrer">Click Here</a></Typography>
//                     <Typography variant="body1">
//                         <strong>Lesson Completion Status: </strong>
//                         {completed ? 'Completed' : 'Pending'}
//                     </Typography>
//                     <YouTubePlayer url={lesson.url} /> {/* Add the YouTubePlayer component */}
                    
//                     <Button
//                         variant="outlined"
//                         color={completed ? 'success' : 'primary'}
//                         onClick={handleMarkAsCompleted}
//                         disabled={completed}
//                     >
//                         {completed ? 'Completed' : 'Mark as Completed'}
//                     </Button>
//                 </CardBody>
//             </Card>
//         </Container>
//     );
// };

// export default LessonDetailed;




