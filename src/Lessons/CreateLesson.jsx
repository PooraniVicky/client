// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { message } from 'antd';
// import { Container, Form, Button } from 'react-bootstrap';
// import { LessonContext } from '../ContextAPI/LessonContext';
// import YouTubePlayer from './YouTubePlayer'; // Import YouTubePlayer

// const CreateLesson = () => {
//     const { lessonId, courseId } = useParams(); // Get lessonId if editing an existing lesson
//     const { fetchLessonById, createLesson, updateLesson } = useContext(LessonContext);
//     const [lesson, setLesson] = useState({
//         session: '',
//         description: '',
//         url: '',
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (lessonId) {
//             const fetchData = async () => {
//                 try {
//                     const fetchedLesson = await fetchLessonById(lessonId);
//                     setLesson(fetchedLesson);
//                 } catch (error) {
//                     console.error('Error fetching lesson:', error);
//                     message.error('Failed to fetch lesson.');
//                 }
//             };

//             fetchData();
//         }
//     }, [lessonId, fetchLessonById]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setLesson(prevLesson => ({
//             ...prevLesson,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//             if (lessonId) {
//                 await updateLesson(lessonId, lesson);
//                 message.success('Lesson updated successfully!');
//             } else {
//                 // Pass courseId along with lesson data
//                 await createLesson({ ...lesson, courseId });
//                 message.success('Lesson created successfully!');
//             }
//             navigate(`/lessons/${courseId}`);
//         } catch (error) {
//             console.error('Error submitting lesson:', error);
//             message.error('Failed to submit lesson.');
//         }
//     };
    
//     return (
//         <Container>
//             <h2>{lessonId ? 'Edit Lesson' : 'Create Lesson'}</h2>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formSession">
//                     <Form.Label>Session</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="session"
//                         value={lesson.session}
//                         onChange={handleChange}
//                         placeholder="Enter session"
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formDescription">
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control
//                         as="textarea"
//                         name="description"
//                         value={lesson.description}
//                         onChange={handleChange}
//                         placeholder="Enter description"
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formUrl">
//                     <Form.Label>Video URL</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="url"
//                         value={lesson.url}
//                         onChange={handleChange}
//                         placeholder="Enter YouTube video URL"
//                     />
//                 </Form.Group>

//                 <Button variant="primary" type="submit">
//                     {lessonId ? 'Update Lesson' : 'Create Lesson'}
//                 </Button>
//             </Form>

//             {/* Display video preview */}
//             {lesson.url && (
//                 <div className="mt-4">
//                     <h3>Video Preview</h3>
//                     <YouTubePlayer url={lesson.url} />
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default CreateLesson;
// // import React, { useState, useEffect, useContext } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { message } from 'antd';
// // import { Container, Form, Button } from 'react-bootstrap';
// // import { LessonContext } from '../ContextAPI/LessonContext';
// // import YouTubePlayer from './YouTubePlayer'; // Import YouTubePlayer

// // const CreateLesson = () => {
// //     const { lessonId, courseId } = useParams(); // Get lessonId if editing an existing lesson
// //     const { fetchLessonById, createLesson, updateLesson } = useContext(LessonContext);
// //     const [lesson, setLesson] = useState({
// //         session: '',
// //         description: '',
// //         url: '',
// //     });
// //     const [loading, setLoading] = useState(false); // Loading state
// //     const [error, setError] = useState(''); // Error state
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         if (lessonId) {
// //             const fetchData = async () => {
// //                 try {
// //                     const fetchedLesson = await fetchLessonById(lessonId);
// //                     setLesson(fetchedLesson);
// //                 } catch (error) {
// //                     console.error('Error fetching lesson:', error);
// //                     message.error('Failed to fetch lesson.');
// //                 }
// //             };

// //             fetchData();
// //         }
// //     }, [lessonId, fetchLessonById]);

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setLesson(prevLesson => ({
// //             ...prevLesson,
// //             [name]: value
// //         }));
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError('');

// //         try {
// //             if (lessonId) {
// //                 await updateLesson(lessonId, lesson);
// //                 message.success('Lesson updated successfully!');
// //             } else {
// //                 await createLesson(courseId, lesson);
// //                 message.success('Lesson created successfully!');
// //             }
// //             navigate(`/lessons/${courseId}`);
// //         } catch (error) {
// //             console.error('Error submitting lesson:', error);
// //             setError(error.response?.data?.message || 'Failed to submit lesson.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <Container>
// //             <h2>{lessonId ? 'Edit Lesson' : 'Create Lesson'}</h2>
// //             <Form onSubmit={handleSubmit}>
// //                 <Form.Group className="mb-3" controlId="formSession">
// //                     <Form.Label>Session</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="session"
// //                         value={lesson.session}
// //                         onChange={handleChange}
// //                         placeholder="Enter session"
// //                         required
// //                     />
// //                 </Form.Group>

// //                 <Form.Group className="mb-3" controlId="formDescription">
// //                     <Form.Label>Description</Form.Label>
// //                     <Form.Control
// //                         as="textarea"
// //                         name="description"
// //                         value={lesson.description}
// //                         onChange={handleChange}
// //                         placeholder="Enter description"
// //                         required
// //                     />
// //                 </Form.Group>

// //                 <Form.Group className="mb-3" controlId="formUrl">
// //                     <Form.Label>Video URL</Form.Label>
// //                     <Form.Control
// //                         type="text"
// //                         name="url"
// //                         value={lesson.url}
// //                         onChange={handleChange}
// //                         placeholder="Enter YouTube video URL"
// //                     />
// //                 </Form.Group>

// //                 <Button variant="primary" type="submit" disabled={loading}>
// //                     {loading ? 'Saving...' : (lessonId ? 'Update Lesson' : 'Create Lesson')}
// //                 </Button>
// //             </Form>

// //             {/* Display video preview */}
// //             {lesson.url && (
// //                 <div className="mt-4">
// //                     <h3>Video Preview</h3>
// //                     <YouTubePlayer url={lesson.url} />
// //                 </div>
// //             )}

// //             {/* Display error message */}
// //             {error && (
// //                 <div className="mt-3">
// //                     <p className="text-danger">{error}</p>
// //                 </div>
// //             )}
// //         </Container>
// //     );
// // };

// // export default CreateLesson;
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { Container, Form, Button } from 'react-bootstrap';
import { LessonContext } from '../ContextAPI/LessonContext';
import YouTubePlayer from './YouTubePlayer'; // Import YouTubePlayer

const CreateLesson = () => {
    const { lessonId, courseId } = useParams(); // Get lessonId if editing an existing lesson
    console.log("lessonId:", lessonId);

    const { fetchLessonById, createLesson, updateLesson } = useContext(LessonContext);
    const [lesson, setLesson] = useState({
        session: '',
        description: '',
        url: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        console.log("lessonId:", lessonId);
        if (lessonId) {
            const fetchData = async () => {
                try {
                    const fetchedLesson = await fetchLessonById(lessonId);
                    setLesson(fetchedLesson);
                } catch (error) {
                    console.error('Error fetching lesson:', error);
                    message.error('Failed to fetch lesson.');
                }
            };

            fetchData();
        }
    }, [lessonId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLesson(prevLesson => ({
            ...prevLesson,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (lessonId) {
                await updateLesson(lessonId, lesson);
                message.success('Lesson updated successfully!');
            } else {
                // Pass courseId along with lesson data
                await createLesson(courseId, lesson);
                message.success('Lesson created successfully!');
            }
            navigate(-1);
        } catch (error) {
            console.error('Error submitting lesson:', error);
            message.error('Failed to submit lesson.');
        }
    };

    return (
        <Container>
            <h2>{lessonId ? 'Edit Lesson' : 'Create Lesson'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formSession">
                    <Form.Label>Session</Form.Label>
                    <Form.Control
                        type="text"
                        name="session"
                        value={lesson.session}
                        onChange={handleChange}
                        placeholder="Enter session"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={lesson.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formUrl">
                    <Form.Label>Video URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        value={lesson.url}
                        onChange={handleChange}
                        placeholder="Enter YouTube video URL"
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    {lessonId ? 'Update Lesson' : 'Create Lesson'}
                </Button>
            </Form>

            {/* Display video preview */}
            {lesson.url && (
                <div className="mt-4">
                    <h3>Video Preview</h3>
                    <YouTubePlayer url={lesson.url} />
                </div>
            )}
        </Container>
    );
};

export default CreateLesson;
