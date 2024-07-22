import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { EnrollmentContext } from './EnrollmentContext';

// Create a context for discussions and replies
export const QueryContext = createContext();

// Provider component
export const QueryProvider = ({ children }) => {
    const [discussions, setDiscussions] = useState([]);
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    // const { users } = useContext(AuthContext);
    // const { enrollments, fetchEnrollmentByUser, loading, error } = useContext(EnrollmentContext);
    // const [filteredEnrollments, setFilteredEnrollments] = useState([]);

    // useEffect(() => {
    //     if (users?.userId) {
    //         fetchEnrollmentByUser(users.userId);
    //     }
    // }, [users]);

    // useEffect(() => {
    //     if (Array.isArray(enrollments)) {
    //         const filtered = enrollments.filter(enrollment => enrollment.user && enrollment.user._id === users.userId);
    //         setFilteredEnrollments(filtered);
    //     }
    // }, [enrollments, users]);

    const fetchDiscussions = async () => {
        try {
            const response = await axios.get('/api/discussions');
            setDiscussions(response.data);
        } catch (error) {
            console.error('Error fetching discussions:', error);
        }
    };

    const fetchDiscussionById = async (discussionId) => {
        try {
            const response = await axios.get(`/api/discussions/${discussionId}`);
            setSelectedDiscussion(response.data);
        } catch (error) {
            console.error('Error fetching discussion:', error);
        }
    };

    const addDiscussion = async (content) => {
        try {
            const courseId = enrolledCourses[0]._id; // Assuming the first enrolled course ID
            const response = await axios.post('/api/discussions', { course: courseId, content, courseInstructorEmail: users.email });
            setDiscussions([...discussions, response.data]);
        } catch (error) {
            console.error('Error adding discussion:', error);
        }
    };

    const addReply = async (discussionId, content) => {
        try {
            const response = await axios.post(`/api/discussions/${discussionId}/replies`, { content });
            setSelectedDiscussion(prevDiscussion => ({
                ...prevDiscussion,
                replies: [...prevDiscussion.replies, response.data.reply]
            }));
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    return (
        <QueryContext.Provider value={{ discussions, selectedDiscussion, fetchDiscussions, fetchDiscussionById, addDiscussion, addReply }}>
            {children}
        </QueryContext.Provider>
    );
};

