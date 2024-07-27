import React, { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { AssignmentContext } from '../ContextAPI/AssignmentContext';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';
import * as Yup from 'yup';

const SubmissionForm = ({ assignmentId, onSubmit }) => {
    const { fetchAssignmentByAssignmentId, assignments } = useContext(AssignmentContext);
    const [submittedAssignment, setSubmittedAssignment] = useState(null);
    const [showUrl, setShowUrl] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchAssignmentByAssignmentId(assignmentId);
            } catch (error) {
                console.error('Failed to fetch assignment:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (assignments.length > 0) {
            const assignment = assignments.find(assignment => assignment._id === assignmentId);
            if (assignment && assignment.submissions) {
                const submission = assignment.submissions.find(submission => submission.assignmentId === assignmentId);
                setSubmittedAssignment(submission || null);
            }
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            url: '',
        },
        validationSchema: Yup.object({
            url: Yup.string().url('Invalid URL format').required('URL is required'),
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmit(values);
            resetForm();
        },
    });

    const handleViewClick = () => {
        setShowUrl(!showUrl);
    };

    if (submittedAssignment) {
        return (
            <Box>
                <Typography variant="h6" gutterBottom>
                    Submission Details
                </Typography>
                <Typography variant="body1">
                    Submitted Date: {new Date(submittedAssignment.createdAt).toLocaleDateString() || '-'}
                </Typography>
                <Typography variant="body1">
                    Grade: {submittedAssignment.grade || '-'}
                </Typography>
                <Typography variant="body1">
                    Comments: {submittedAssignment.comments || '-'}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleViewClick}
                >
                    {showUrl ? 'Hide URL' : 'View URL'}
                </Button>
                {showUrl && (
                    <Typography variant="body1">
                        Submission URL: <a href={submittedAssignment.url} target="_blank" rel="noopener noreferrer">{submittedAssignment.url || '-'}</a>
                    </Typography>
                )}
            </Box>
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="url"
                        name="url"
                        label="Submission URL"
                        value={formik.values.url}
                        onChange={formik.handleChange}
                        error={formik.touched.url && Boolean(formik.errors.url)}
                        helperText={formik.touched.url && formik.errors.url}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default SubmissionForm;
