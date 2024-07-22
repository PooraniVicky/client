// src/components/DiscussionForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext for user info

const QueryForm = ({ courseId, onDiscussionAdded }) => {
    const [content, setContent] = useState('');
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/discussions', {
                course: courseId,
                content,
            }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`, // Assuming token is stored in user context
                }
            });
            setContent('');
            message.success('Discussion created successfully');
            onDiscussionAdded(response.data); // Notify parent component about the new discussion
        } catch (error) {
            message.error('Failed to create discussion');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="content">Discussion Content</label>
                <textarea
                    id="content"
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default QueryForm;
