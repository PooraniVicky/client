import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../ContextAPI/AuthContext';
import {QueryContext } from '../ContextAPI/QueryContext';

const Query = () => {
    const { discussions, fetchDiscussions, addDiscussion, addReply, editDiscussion, deleteDiscussion } = useContext(QueryContext);
    const [newDiscussionContent, setNewDiscussionContent] = useState('');
    const [editDiscussionId, setEditDiscussionId] = useState(null);
    const [newReplyContent, setNewReplyContent] = useState('');
    const [startDiscussion, setStartDiscussion] = useState(false); // State to track if discussion has started
    const { users } = useContext(AuthContext);
    const { enrollments, fetchEnrollmentByUser, loading, error } = useContext(EnrollmentContext);
    const [filteredEnrollments, setFilteredEnrollments] = useState([]);

    useEffect(() => {
        if (users?.userId) {
            fetchEnrollmentByUser(users.userId);
        }
    }, [users]);

    useEffect(() => {
        if (Array.isArray(enrollments)) {
            const filtered = enrollments.filter(enrollment => enrollment.user && enrollment.user._id === users.userId);
            setFilteredEnrollments(filtered);
        }
    }, [enrollments, users]);
    
    useEffect(() => {
        if (startDiscussion) {
            fetchDiscussions();
        }
    }, []);

    const handleAddDiscussion = async () => {
        try {
            await addDiscussion({ content: newDiscussionContent });
            setNewDiscussionContent('');
            setStartDiscussion(true); // Start discussion after adding first message
        } catch (error) {
            console.error('Error adding discussion:', error);
        }
    };

    const handleAddReply = async (discussionId) => {
        try {
            await addReply(discussionId, { content: newReplyContent });
            setNewReplyContent('');
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    const handleEditDiscussion = async (discussionId) => {
        try {
            await editDiscussion(discussionId, { content: newDiscussionContent });
            setEditDiscussionId(null);
        } catch (error) {
            console.error('Error editing discussion:', error);
        }
    };

    const handleDeleteDiscussion = async (discussionId) => {
        try {
            await deleteDiscussion(discussionId);
        } catch (error) {
            console.error('Error deleting discussion:', error);
        }
    };

    const handleEditClick = (discussionId, content) => {
        setEditDiscussionId(discussionId);
        setNewDiscussionContent(content);
    };

    return (
        <Box p={3}>
            {!startDiscussion && (
                <Paper elevation={3} style={{ padding: '15px' }}>
                    <Typography variant="h4" gutterBottom>Start a Discussion</Typography>
                    <TextField
                        fullWidth
                        multiline
                        variant="outlined"
                        value={newDiscussionContent}
                        onChange={(e) => setNewDiscussionContent(e.target.value)}
                        placeholder="Start a new discussion"
                        style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" color="primary" onClick={handleAddDiscussion}>Start Discussion</Button>
                </Paper>
            )}
{startDiscussion && Array.isArray(discussions) && discussions.map(discussion => (
                <Paper key={discussion._id} elevation={3} style={{ marginBottom: '15px' }}>
                    <Box p={2}>
                        <Typography variant="subtitle1" gutterBottom>User: {discussion.user.firstName} {discussion.user.lastName}</Typography>
                        {editDiscussionId === discussion._id ? (
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                value={newDiscussionContent}
                                onChange={(e) => setNewDiscussionContent(e.target.value)}
                                placeholder="Enter edited content"
                                style={{ marginBottom: '10px' }}
                            />
                        ) : (
                            <Typography variant="body1">{discussion.content}</Typography>
                        )}
                        <Typography variant="caption" gutterBottom>Created At: {new Date(discussion.createdAt).toLocaleString()}</Typography>
                        {user && ( // Conditional rendering based on user
                            <Box mt={2}>
                                <Button variant="outlined" color="primary" onClick={() => handleEditClick(discussion._id, discussion.content)} startIcon={<PencilSquare />}>Edit</Button>
                                <Button variant="outlined" color="secondary" onClick={() => handleDeleteDiscussion(discussion._id)} startIcon={<Trash />}>Delete</Button>
                            </Box>
                        )}
                        <List>
                            {discussion.replies.map(reply => (
                                <ListItem key={reply._id} alignItems="flex-start" style={{ marginTop: '10px' }}>
                                    <ListItemText
                                        primary={`User: ${reply.user.firstName} ${reply.user.lastName}`}
                                        secondary={
                                            <>
                                                <Typography variant="body2" component="span" color="textPrimary">{reply.content}</Typography>
                                                <Typography variant="caption" component="span" color="textSecondary" style={{ marginLeft: '10px' }}>
                                                    Created At: {new Date(reply.createdAt).toLocaleString()}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                        {user && ( // Conditional rendering based on user
                            <Box mt={2}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={newReplyContent}
                                    onChange={(e) => setNewReplyContent(e.target.value)}
                                    placeholder="Write a reply"
                                />
                                <Button variant="contained" color="primary" onClick={() => handleAddReply(discussion._id)} style={{ marginLeft: '10px' }}>Add Reply</Button>
                            </Box>
                        )}
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default Query;
