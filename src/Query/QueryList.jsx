// src/components/DiscussionList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QueryList = ({ courseId }) => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/discussions', {
                    params: { course: courseId }
                });
                setDiscussions(response.data);
            } catch (error) {
                console.error('Error fetching discussions:', error);
            }
        };

        fetchDiscussions();
    }, [courseId]);

    return (
        <div>
            <h3>Discussions</h3>
            {discussions.map(discussion => (
                <div key={discussion._id} className="discussion">
                    <h5>{discussion.user.firstName} {discussion.user.lastName}</h5>
                    <p>{discussion.content}</p>
                </div>
            ))}
        </div>
    );
};

export default QueryList;
