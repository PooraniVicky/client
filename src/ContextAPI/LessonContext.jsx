import React, { createContext, useState, useContext } from 'react';
import axiosInstance from '../Services/axiosConfig.js';

// Create context
export const LessonContext = createContext();

// Custom hook to use LessonContext
export const useLessonContext = () => useContext(LessonContext);

// Provider component
export const LessonProvider = ({ children }) => {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch lessons from API
    const fetchLessons = async (courseId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/apiLessons/${courseId}`);
            setLessons(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Create a new lesson
    const createLesson = async (courseId, formData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/apiLessons/${courseId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setLessons([...lessons, response.data]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Update an existing lesson by ID
    const updateLesson = async (courseId, lessonId, updatedData) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/apiLessons/${courseId}/${lessonId}`, updatedData);
            const updatedLessons = lessons.map((lesson) => (lesson._id === lessonId ? response.data : lesson));
            setLessons(updatedLessons);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Delete a lesson by ID
    const deleteLesson = async (courseId, lessonId) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/apiLessons/${courseId}/${lessonId}`);
            const updatedLessons = lessons.filter((lesson) => lesson._id !== lessonId);
            setLessons(updatedLessons);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <LessonContext.Provider
            value={{
                lessons,
                loading,
                error,
                fetchLessons,
                createLesson,
                updateLesson,
                deleteLesson
            }}
        >
            {children}
        </LessonContext.Provider>
    );
};
