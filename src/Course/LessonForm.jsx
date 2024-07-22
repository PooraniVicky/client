import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLessonContext } from '../ContextAPI/LessonContext';

const LessonForm = () => {
    const { courseId } = useParams();
    const { createLesson } = useLessonContext();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setError('');

            try {
                const { title, description } = values;
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                formData.append('course', courseId); // Ensure courseId is used here

                // Append media files to formData
                for (let file of formik.values.mediaFiles) {
                    formData.append('mediaFiles', file);
                }

                await createLesson(formData);

                // Navigate to admin dashboard after successful creation
                navigate('/admin-dashboard');
            } catch (error) {
                console.error('Error creating lesson:', error);
                setError('Lesson creation failed: ' + error.message);
            }
        }
    });

    const handleFileChange = (event) => {
        formik.setFieldValue('mediaFiles', event.currentTarget.files);
    };

    return (
        <div className="container">
            <h2>Create Lesson</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-danger">{formik.errors.title}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-danger">{formik.errors.description}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="mediaFiles">Upload Media Files</label>
                    <input
                        type="file"
                        className="form-control"
                        id="mediaFiles"
                        name="mediaFiles"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Create Lesson
                </button>
            </form>
        </div>
    );
};

export default LessonForm;
