import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [usersDetails, setUsersDetails] = useState(null);
    const [instructors, setInstructors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    // useEffect(() => {
    //     // Fetch all users on component mount
    //     getAllUsers();
    // }, []);

    const getAllUsers = async () => {
        setLoading(true);
        setError(null);
  
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/apiUsers/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
          
        if (response.data && Array.isArray(response.data)) {
            setUsersDetails(response.data);
            //console.log("Users Details:", response.data); // Check data format
        } else {
            console.warn("Unexpected response format:", response.data); // Debug output
        } 
        } catch (err) {
            console.error('User Fetching user:', err.response ? err.response.data : err.message);
            setError(err.message || 'Failed to fetch users.');
            setLoading(false);
        }
    };
    
    const fetchUserDetails = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:4000/apiUsers/user/details', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                throw error;
            }
        } else {
            throw new Error('No token found');
        }
    };

    const updateUserDetails = async (updatedDetails) => {
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:4000/apiUsers/user/update', updatedDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error updating user details:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:4000/apiUsers/login', credentials);
            localStorage.setItem('token', response.data.token);
            setUsers(response.data.user);
        } catch (error) {
            console.error('Login error:', error);
            setError('Error during login:', error.response ? error.response.data : error.message);
        }
    };

    const logout = () => {
        setUsers(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchUserDetails();
        }
    }, []);

    const fetchInstructors = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/apiUsers/user/instructor', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setInstructors(response.data);
        } catch (error) {
            console.error("Error fetching Instructor details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                users,
                login,
                logout,
                getAllUsers,
                usersDetails,
                fetchUserDetails,
                fetchInstructors,
                updateUserDetails,
                loading,
                error,
                instructors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
