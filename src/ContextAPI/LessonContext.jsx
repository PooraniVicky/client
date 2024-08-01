import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

// Create the context
export const LessonContext = createContext();

// LessonProvider component
export const LessonProvider = ({ children }) => {
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch lessons for a specific course
    const fetchLessonsByCourseId = async (courseId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/apiLessons/lesson/course/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLessons(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch lessons');
        } finally {
            setLoading(false);
        }
    };

    // Fetch a single lesson by ID
    const fetchLessonById = async (lessonId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/apiLessons/lesson/${lessonId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // console.log('Full response:', response);
            // console.log('Fetched lesson data:', response.data);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch lesson');
        } finally {
            setLoading(false);
        }
    };

    // Create a new lesson
    const createLesson = async (courseId, lessonData) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:4000/apiLessons/lesson/${courseId}`, lessonData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            setLessons((prevLessons) => [...prevLessons, response.data]);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create lesson');
        } finally {
            setLoading(false);
        }
    };

    // Update a lesson by ID
    const updateLesson = async (lessonId, updatedData) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:4000/apiLessons/lesson/${lessonId}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLessons((prevLessons) =>
                prevLessons.map((lesson) => (lesson._id === lessonId ? response.data : lesson))
            );
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update lesson');
        } finally {
            setLoading(false);
        }
    };

    // Delete a lesson by ID
    const deleteLesson = async (lessonId) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/apiLessons/lesson/${lessonId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setLessons((prevLessons) => prevLessons.filter((lesson) => lesson._id !== lessonId));
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete lesson');
        } finally {
            setLoading(false);
        }
    };


    // Mark a lesson as completed
    const markLessonAsCompleted = async (lessonId, userId, completionStatus) => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:4000/apiLessons/lesson/${lessonId}/complete`, {
                userId,
                completionStatus
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update lesson completion status');
        } finally {
            setLoading(false);
        }
    };

    // Fetch progress for a course
    const fetchCourseProgress = async (courseId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/apiLessons/course/${courseId}/progress`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch course progress');
        } finally {
            setLoading(false);
        }
    };

    // Fetch completed students for a lesson
    const fetchCompletedStudents = async (lessonId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:4000/apiLessons/lesson/${lessonId}/completed-students`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch completed students');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LessonContext.Provider
            value={{
                lessons,
                currentLesson,
                loading,
                error,
                fetchLessonsByCourseId,
                fetchLessonById,
                createLesson,
                updateLesson,
                deleteLesson,
                markLessonAsCompleted,
                fetchCourseProgress,
                fetchCompletedStudents
            }}
        >
            {children}
        </LessonContext.Provider>
    );
};
