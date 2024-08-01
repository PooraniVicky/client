import React, { createContext, useState, useContext } from 'react';
import axiosInstance from '../Services/axiosConfig';

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
            const response = await axiosInstance.get(`/apiLessons/lesson/course/${courseId}`);
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
            const response = await axiosInstance.get(`/apiLessons/lesson/${lessonId}`);
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
            const response = await axiosInstance.post(`/apiLessons/lesson/${courseId}`, lessonData);
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
            const response = await axiosInstance.put(`/apiLessons/lesson/${lessonId}`, updatedData);
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
            await axiosInstance.delete(`/apiLessons/lesson/${lessonId}`);
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
            await axiosInstance.post(`/apiLessons/lesson/${lessonId}/complete`, {
                userId,
                completionStatus
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
            const response = await axiosInstance.get(`/apiLessons/course/${courseId}/progress`);
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
            const response = await axiosInstance.get(`/apiLessons/lesson/${lessonId}/completed-students`, {
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
