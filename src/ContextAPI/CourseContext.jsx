import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../Services/axiosConfig';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState();

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/apiCourses');
            setCourses(response.data);
            setLoading(false);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Unauthorized. Please log in.');
                // Add logic to handle unauthorized access (e.g., redirect to login)
            } else {
                setError(err.message || 'An error occurred.');
            }
            setLoading(false);
        }
    };

    // Fetch a single course by ID
    const fetchCourseById = async (courseId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/apiCourses/${courseId}`);
            setCurrentCourse(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'Failed to fetch course.');
            setLoading(false);
            console.error("Error:", err)
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    // Create a new course
    const createCourse = async (courseData, mediaFiles) => {
        setLoading(true);
        try {

            const formData = new FormData();
            Object.keys(courseData).forEach((key) => {
                formData.append(key, courseData[key]);
            });
            if (mediaFiles) {
                for (let file of mediaFiles) {
                    formData.append('media', file);
                }
            }
            const response = await axiosInstance.post('/apiCourses', formData);
            setCourses([...courses, response.data.course]);
            setLoading(false);
            setMessage("Course Created Successfully..!");
            fetchCourses();
        } catch (err) {
            console.error("Error:", err)
            setError(err.message);
            setLoading(false);
        }
    };

    const updateCourse = async (courseId, updatedData, mediaFiles = []) => {
        setLoading(true);
        try {

            const formData = new FormData();
            Object.keys(updatedData).forEach((key) => {
                formData.append(key, updatedData[key]);
            });
            if (mediaFiles) {
                for (let file of mediaFiles) {
                    formData.append('media', file);
                }
            }

            const response = await axiosInstance.put(`/apiCourses/${courseId}`, formData);

            const updatedCourses = courses.map(course => course._id === courseId ? response.data : course);
            setCourses(updatedCourses);
            setLoading(false);
            setMessage("Course Updated Successfully!");
        } catch (err) {
            setError(err.message || 'Failed to update course.');
            setLoading(false);
            console.error("Error:", err);
        }
    };

    // Delete a course by ID
    const deleteCourse = async (courseId) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/apiCourses/${courseId}`);
            const updatedCourses = courses.filter((course) => course._id !== courseId);
            setCourses(updatedCourses);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    return (
        <CourseContext.Provider value={{
            courses,
            currentCourse,
            fetchCourses,
            fetchCourseById,
            createCourse,
            updateCourse,
            deleteCourse,
            loading,
            error,
            message
        }}>
            {children}
        </CourseContext.Provider>
    );
};
