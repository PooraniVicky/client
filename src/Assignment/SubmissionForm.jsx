
import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { AssignmentSubmissionContext } from '../ContextAPI/AssignmentSubmissionContext';
import { message } from 'antd';

const SubmissionForm = ({ assignmentId }) => {
    const { submitAssignment, fetchSubmissionsByAssignment } = useContext(AssignmentSubmissionContext); // Accessing submitSubmission from SubmissionContext

    const formik = useFormik({
        initialValues: {
            submissionUrl: ''
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await submitAssignment(assignmentId, values.submissionUrl); 
                await fetchSubmissionsByAssignment(assignmentId);
                message.success('Submission successful.');
            } catch (error) {
                console.error('Error submitting assignment:', error);
                message.error('Failed to submit.');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
                <label htmlFor="submissionUrl">Submission URL</label>
                <input
                    id="submissionUrl"
                    name="submissionUrl"
                    type="text"
                    className={`form-control ${formik.touched.submissionUrl && formik.errors.submissionUrl ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.submissionUrl}
                />
                {formik.touched.submissionUrl && formik.errors.submissionUrl ? (
                    <div className="invalid-feedback">{formik.errors.submissionUrl}</div>
                ) : null}
            </div>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                Submit
            </button>
        </form>
    );
};

export default SubmissionForm;
