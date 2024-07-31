import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { Container, Table } from 'react-bootstrap';
import { LessonContext } from '../ContextAPI/LessonContext';
import { AuthContext } from '../ContextAPI/AuthContext';

const LessonCompletionReport = () => {
    const { lessonId } = useParams();
    const { fetchLessonById } = useContext(LessonContext);
    const { fetchCompletedStudentsByLessonId } = useContext(AuthContext); // Adjust based on your actual implementation
    const [lesson, setLesson] = useState(null);
    const [completedStudents, setCompletedStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedLesson = await fetchLessonById(lessonId);
                setLesson(fetchedLesson);

                const students = await fetchCompletedStudentsByLessonId(lessonId);
                setCompletedStudents(students);
            } catch (error) {
                console.error('Error fetching lesson or students:', error);
                message.error('Failed to fetch lesson or student data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [lessonId, fetchLessonById, fetchCompletedStudentsByLessonId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!lesson) {
        return <p>Lesson not found.</p>;
    }

    return (
        <Container>
            <h2>{`Completion Report for: ${lesson.title}`}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Completion Date</th>
                    </tr>
                </thead>
                <tbody>
                    {completedStudents.length === 0 ? (
                        <tr>
                            <td colSpan="2" className="text-center">No students have completed this lesson yet.</td>
                        </tr>
                    ) : (
                        completedStudents.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{new Date(student.completionDate).toLocaleDateString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default LessonCompletionReport;
