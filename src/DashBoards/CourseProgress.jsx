import React, { useContext, useEffect } from 'react';
import { LessonContext } from '../ContextAPI/LessonContext';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const CourseProgress = () => {
    const { courseId } = useParams();
    const { progress, lessons, fetchLessonsByCourseId } = useContext(LessonContext);

    useEffect(() => {
        fetchLessonsByCourseId(courseId);
    }, [courseId]);

    const lessonCount = lessons.length;
    const data = {
        labels: lessons.map((lesson, index) => `Lesson ${index + 1}`), // X-axis labels
        datasets: [
            {
                label: 'Completion Percentage',
                data: lessons.map(lesson => (lesson.completionStatus === 'completed' ? 100 : 0)), // Y-axis data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 2)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Completion Percentage (%)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Lessons',
                },
            },
        },
    };

    // Ensure progress is defined and a number before calling toFixed()
    // const formattedProgress = progress !== undefined ? progress.toFixed(2) : '0';

    return (
        <Container style={{ padding: '30px' }}>
            <Box>
                <Typography variant="h5" gutterBottom>
                    Course Progress
                </Typography>
                {/* <Typography variant="body1">
                    {formattedProgress}% completed
                </Typography> */}
                <Bar data={data} options={options} />
            </Box>
        </Container>
    );
};

export default CourseProgress;
