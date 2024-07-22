// import React, { useContext, useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { Button } from 'react-bootstrap';
// import { message } from 'antd';
// import { useNavigate } from 'react-router-dom';

// const EditAssignmentForm = ({assignmentId }) => {
//     const { updateAssignment, fetchAssignmentByAssignmentId, currentAssignment } = useContext(AssignmentContext);
//     console.log("CurrentAss:", currentAssignment);
//     const navigate = useNavigate();
//     const [initialValues, setInitialValues] = useState({
//         title: '',
//         description: '',
//         dueDate: '',
//     });

//     useEffect(() => {
//         if (assignmentId) {
//             console.log("Fetching assignment with ID:", assignmentId);
//             fetchAssignmentByAssignmentId(assignmentId)
//             .then((assignment) => {
//                 if (assignment) {
//                     setInitialValues({
//                         title: assignment.title,
//                         description: assignment.description,
//                         dueDate: assignment.dueDate,
//                     });
//                 }
//            });
//         } else {
//             console.error("Assignment ID is undefined");
//         }
//     }, [assignmentId, fetchAssignmentByAssignmentId]);

//     const validationSchema = Yup.object({
//         title: Yup.string().required('Required'),
//         description: Yup.string().required('Required'),
//         dueDate: Yup.date().required('Required'),
//     });
//     // useEffect(() => {
//     //     // Initialize form fields based on currentAssignment
//     //     if (currentAssignment) {
//     //         const initialValues = {
//     //             title: currentAssignment.title || '',
//     //             description: currentAssignment.description || '',
//     //             dueDate: currentAssignment.dueDate ? new Date(currentAssignment.dueDate).toISOString().substr(0, 10) : '',
//     //         };
//     //         // Set initial values in the form
//     //         setInitialValues(initialValues);
//     //     }
//     // }, [currentAssignment]);

//     const handleFormSubmit = async (values, { setSubmitting }) => {
//         try {
//             await updateAssignment(assignmentId, values);
//             message.success('Assignment updated successfully!');
//             navigate('/courses');
//         } catch (error) {
//             console.error('Error updating assignment:', error);
//             message.error('Failed to update assignment.');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="container-fluid py-5">
//             <div className="container">
//                 <div className="card mb-3">
//                     <div className="row g-0">
//                         <div className="col-md-6 d-md-block">
//                             <img
//                                 src="https://cdni.iconscout.com/illustration/premium/thumb/online-assignment-5393172-4510999.png"
//                                 className="img-fluid rounded-start login-image"
//                                 alt="..."
//                             />
//                         </div>
//                         <div className="col-md-6 col-12">
//                             <div className="card-body">
//                                 <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
//                                 {currentAssignment ? currentAssignment.title : 'Edit Assignment'} <i className="bi bi-pen-fill"></i>
//                                 </h1>
//                                 <Formik
//                     initialValues={initialValues}
//                     validationSchema={validationSchema}
//                     onSubmit={handleFormSubmit}
//                     enableReinitialize
//                 >
//                     {({ isSubmitting }) => (
//                         <Form>
//                             <div className="mb-3">
//                                 <label htmlFor='title' className="form-label">Title</label>
//                                 <Field type="text" className="form-control" name="title" />
//                                 <ErrorMessage name="title" component="div" className="text-danger" />
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor='description' className="form-label">Description</label>
//                                 <Field as="textarea" className="form-control" name="description" />
//                                 <ErrorMessage name="description" component="div" className="text-danger" />
//                             </div>

//                             <div className="mb-3">
//                                 <label htmlFor='dueDate' className="form-label">Due Date</label>
//                                 <Field type="date" className="form-control" name="dueDate" />
//                                 <ErrorMessage name="dueDate" component="div" className="text-danger" />
//                             </div>

//                             <Button type="submit" variant="primary" disabled={isSubmitting}>
//                                 {isSubmitting ? 'Updating Assignment...' : 'Update Assignment'}
//                             </Button>
//                         </Form>
//                     )}
//                 </Formik>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         // <Modal show={show} onHide={handleClose}>
//         //     <Modal.Header closeButton>
//         //         <Modal.Title>Edit Assignment</Modal.Title>
//         //     </Modal.Header>
//         //     <Modal.Body className='mt-3'>
            
//         //     </Modal.Body>
//         // </Modal>
//     );
// };
//  export default EditAssignmentForm;
// import React, { useContext, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { message } from 'antd';

// const EditAssignmentForm = ({ show, handleClose, assignmentId }) => {
//     const { updateAssignment, fetchAssignmentByAssignmentId, currentAssignment } = useContext(AssignmentContext);

//     useEffect(() => {
//         if (show && assignmentId) {
//             fetchAssignmentByAssignmentId(assignmentId);
//         }
//     }, [show, assignmentId]);
// console.log("currentAssignment:", currentAssignment);
//     const initialValues = {
//         title: currentAssignment?.title || '',
//         description: currentAssignment?.description || '',
//         dueDate: currentAssignment?.dueDate ? new Date(currentAssignment.dueDate).toISOString().substr(0, 10) : '',
//     };

//     const validationSchema = Yup.object({
//         title: Yup.string().required('Required'),
//         description: Yup.string().required('Required'),
//         dueDate: Yup.date().required('Required'),
//     });

//     const handleFormSubmit = async (values, { setSubmitting }) => {
//         try {
//             await updateAssignment(assignmentId, values);
//             message.success('Assignment updated successfully!');
//         } catch (error) {
//             console.error('Error updating assignment:', error);
//             message.error('Failed to update assignment.');
//         } finally {
//             setSubmitting(false);
//             handleClose(); // Close the modal after submission
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Assignment</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className="container-fluid">
//                     <div className="container">
//                         <div className="card mb-3">
//                             <div className="row g-0">
//                                 <div className="col-md-6 d-md-block">
//                                     <img
//                                         src="https://cdni.iconscout.com/illustration/premium/thumb/online-assignment-5393172-4510999.png"
//                                         className="img-fluid rounded-start login-image"
//                                         alt="..."
//                                     />
//                                 </div>
//                                 <div className="col-md-6 col-12">
//                                     <div className="card-body">
//                                         <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
//                                             {currentAssignment.title} <i className="bi bi-pen-fill"></i>
//                                         </h1>
//                                         <Formik
//                                             initialValues={initialValues}
//                                             validationSchema={validationSchema}
//                                             onSubmit={handleFormSubmit}
//                                         >
//                                             {({ isSubmitting, handleSubmit }) => (
//                                                 <Form onSubmit={handleSubmit}>
//                                                     <div className="mb-3">
//                                                         <label className="form-label playwrite-sk">Assignment Title</label>
//                                                         <Field type="text" name="title" className="form-control mb-3" />
//                                                         <ErrorMessage name="title" component="div" className="text-danger" />
//                                                     </div>

//                                                     <div className="mb-3">
//                                                         <label className="form-label playwrite-sk">Assignment Description</label>
//                                                         <Field type="text" className="form-control" name="description" />
//                                                         <ErrorMessage name="description" component="div" className="text-danger" />
//                                                     </div>

//                                                     <div className="mb-3">
//                                                         <label htmlFor="dueDate">Due Date</label>
//                                                         <Field type="date" name="dueDate" className="form-control mb-3" />
//                                                         <ErrorMessage name="dueDate" component="div" className="error" />
//                                                     </div>

//                                                     <button type="submit" className="btn btn-primary mt-2 me-4 asap-bold" disabled={isSubmitting}>
//                                                         {isSubmitting ? 'Updating Assignment...' : 'Update Assignment'}
//                                                     </button>
//                                                     <button type="button" className='btn btn-outline-dark' onClick={handleClose}>
//                                                         Cancel
//                                                     </button>
//                                                 </Form>
//                                             )}
//                                         </Formik>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default EditAssignmentForm;
// import React, { useContext, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { message } from 'antd';

// const EditAssignmentForm = ({ show, handleClose, assignmentId }) => {
//     const { updateAssignment, fetchAssignmentByAssignmentId, currentAssignment } = useContext(AssignmentContext);

//     useEffect(() => {
//         if (show && assignmentId) {
//             fetchAssignmentByAssignmentId(assignmentId);
//         }
//     }, [show, assignmentId]);
// console.log("currentAss:", currentAssignment);
//     const initialValues = {
//         title: currentAssignment?.title || '',
//         description: currentAssignment?.description || '',
//         dueDate: currentAssignment?.dueDate ? new Date(currentAssignment.dueDate).toISOString().substr(0, 10) : '',
//     };

//     const validationSchema = Yup.object({
//         title: Yup.string().required('Required'),
//         description: Yup.string().required('Required'),
//         dueDate: Yup.date().required('Required'),
//     });

//     const handleFormSubmit = async (values, { setSubmitting }) => {
//         try {
//             await updateAssignment(assignmentId, values);
//             message.success('Assignment updated successfully!');
//         } catch (error) {
//             console.error('Error updating assignment:', error);
//             message.error('Failed to update assignment.');
//         } finally {
//             setSubmitting(false);
//             handleClose(); // Close the modal after submission
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Assignment</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div className="container-fluid">
//                     <div className="container">
//                         <div className="card mb-3">
//                             <div className="row g-0">
//                                 <div className="col-md-6 d-md-block">
//                                     <img
//                                         src="https://cdni.iconscout.com/illustration/premium/thumb/online-assignment-5393172-4510999.png"
//                                         className="img-fluid rounded-start login-image"
//                                         alt="..."
//                                     />
//                                 </div>
//                                 <div className="col-md-6 col-12">
//                                     <div className="card-body">
//                                         <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
//                                             {currentAssignment.title} <i className="bi bi-pen-fill"></i>
//                                         </h1>
//                                         <Formik
//                                             initialValues={initialValues}
//                                             validationSchema={validationSchema}
//                                             onSubmit={handleFormSubmit}
//                                         >
//                                             {({ isSubmitting, handleSubmit }) => (
//                                                 <Form onSubmit={handleSubmit}>
//                                                     <div className="mb-3">
//                                                         <label className="form-label playwrite-sk">Assignment Title</label>
//                                                         <Field type="text" name="title" className="form-control mb-3" />
//                                                         <ErrorMessage name="title" component="div" className="text-danger" />
//                                                     </div>

//                                                     <div className="mb-3">
//                                                         <label className="form-label playwrite-sk">Assignment Description</label>
//                                                         <Field type="text" className="form-control" name="description" />
//                                                         <ErrorMessage name="description" component="div" className="text-danger" />
//                                                     </div>

//                                                     <div className="mb-3">
//                                                         <label htmlFor="dueDate">Due Date</label>
//                                                         <Field type="date" name="dueDate" className="form-control mb-3" />
//                                                         <ErrorMessage name="dueDate" component="div" className="error" />
//                                                     </div>

//                                                     <button type="submit" className="btn btn-primary mt-2 me-4 asap-bold" disabled={isSubmitting}>
//                                                         {isSubmitting ? 'Updating Assignment...' : 'Update Assignment'}
//                                                     </button>
//                                                     <button type="button" className='btn btn-outline-dark' onClick={handleClose}>
//                                                         Cancel
//                                                     </button>
//                                                 </Form>
//                                             )}
//                                         </Formik>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default EditAssignmentForm;
// import React, { useContext, useEffect, useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { AssignmentContext } from '../ContextAPI/AssignmentContext';
// import { Button } from 'react-bootstrap';
// import { message } from 'antd';
// import { useNavigate } from 'react-router-dom';

// const EditAssignmentForm = ({ assignmentId }) => {
//     const { updateAssignment, fetchAssignmentByAssignmentId, currentAssignment } = useContext(AssignmentContext);
//     const navigate = useNavigate();
//     const [initialValues, setInitialValues] = useState({
//         title: '',
//         description: '',
//         dueDate: '',
//     });

//     useEffect(() => {
//         if (assignmentId) {
//             console.log("Fetching assignment with ID:", assignmentId);
//             fetchAssignmentByAssignmentId(assignmentId).then((assignment) => {
//                 if (assignment) {
//                     setInitialValues({
//                         title: assignment.title,
//                         description: assignment.description,
//                         dueDate: assignment.dueDate,
//                     });
//                 }
//             });
//         } else {
//             console.error("Assignment ID is undefined");
//         }
//     }, [assignmentId, fetchAssignmentByAssignmentId]);

//     const validationSchema = Yup.object({
//         title: Yup.string().required('Required'),
//         description: Yup.string().required('Required'),
//         dueDate: Yup.date().required('Required'),
//     });

//     const handleFormSubmit = async (values, { setSubmitting }) => {
//         try {
//             await updateAssignment(assignmentId, values);
//             message.success('Assignment updated successfully!');
//             navigate('/courses');
//         } catch (error) {
//             console.error('Error updating assignment:', error);
//             message.error('Failed to update assignment.');
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     return (
//         <div className="container-fluid py-5">
//             <div className="container">
//                 <div className="card mb-3">
//                     <div className="row g-0">
//                         <div className="col-md-6 d-md-block">
//                             <img
//                                 src="https://cdni.iconscout.com/illustration/premium/thumb/online-assignment-5393172-4510999.png"
//                                 className="img-fluid rounded-start login-image"
//                                 alt="..."
//                             />
//                         </div>
//                         <div className="col-md-6 col-12">
//                             <div className="card-body">
//                                 <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
//                                     {currentAssignment ? currentAssignment.title : 'Edit Assignment'} <i className="bi bi-pen-fill"></i>
//                                 </h1>
//                                 <Formik
//                                     initialValues={initialValues}
//                                     validationSchema={validationSchema}
//                                     onSubmit={handleFormSubmit}
//                                     enableReinitialize
//                                 >
//                                     {({ isSubmitting }) => (
//                                         <Form>
//                                             <div className="mb-3">
//                                                 <label htmlFor='title' className="form-label">Title</label>
//                                                 <Field type="text" className="form-control" name="title" />
//                                                 <ErrorMessage name="title" component="div" className="text-danger" />
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label htmlFor='description' className="form-label">Description</label>
//                                                 <Field as="textarea" className="form-control" name="description" />
//                                                 <ErrorMessage name="description" component="div" className="text-danger" />
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label htmlFor='dueDate' className="form-label">Due Date</label>
//                                                 <Field type="date" className="form-control" name="dueDate" />
//                                                 <ErrorMessage name="dueDate" component="div" className="text-danger" />
//                                             </div>

//                                             <Button type="submit" variant="primary" disabled={isSubmitting}>
//                                                 {isSubmitting ? 'Updating Assignment...' : 'Update Assignment'}
//                                             </Button>
//                                         </Form>
//                                     )}
//                                 </Formik>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditAssignmentForm;
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AssignmentContext } from '../ContextAPI/AssignmentContext';
import { Button } from 'react-bootstrap';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const EditAssignmentForm = ({ assignmentId }) => {
    const { updateAssignment, fetchAssignmentByAssignmentId, currentAssignment } = useContext(AssignmentContext);
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        dueDate: '',
    });

    useEffect(() => {
        if (assignmentId) {
            console.log("Fetching assignment with ID:", assignmentId);
            fetchAssignmentByAssignmentId(assignmentId).then((assignment) => {
                if (assignment) {
                    setInitialValues({
                        title: assignment.title,
                        description: assignment.description,
                        dueDate: assignment.dueDate,
                    });
                }
            }).catch((error) => {
                console.error('Error fetching assignment:', error);
                message.error('Failed to fetch assignment.');
            });
        } else {
            console.error("Assignment ID is undefined");
        }
    }, [assignmentId]);

    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        dueDate: Yup.date().required('Required'),
    });

    const handleFormSubmit = async (values, { setSubmitting }) => {
        try {
            await updateAssignment(assignmentId, values);
            message.success('Assignment updated successfully!');
            navigate('/courses');
        } catch (error) {
            console.error('Error updating assignment:', error);
            message.error('Failed to update assignment.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-6 d-md-block">
                            <img
                                src="https://cdni.iconscout.com/illustration/premium/thumb/online-assignment-5393172-4510999.png"
                                className="img-fluid rounded-start login-image"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="card-body">
                                <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
                                    {currentAssignment ? currentAssignment.title : 'Edit Assignment'} <i className="bi bi-pen-fill"></i>
                                </h1>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleFormSubmit}
                                    enableReinitialize
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor='title' className="form-label">Title</label>
                                                <Field type="text" className="form-control" name="title" />
                                                <ErrorMessage name="title" component="div" className="text-danger" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor='description' className="form-label">Description</label>
                                                <Field as="textarea" className="form-control" name="description" />
                                                <ErrorMessage name="description" component="div" className="text-danger" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor='dueDate' className="form-label">Due Date</label>
                                                <Field type="date" className="form-control" name="dueDate" />
                                                <ErrorMessage name="dueDate" component="div" className="text-danger" />
                                            </div>

                                            <Button type="submit" variant="primary" disabled={isSubmitting}>
                                                {isSubmitting ? 'Updating Assignment...' : 'Update Assignment'}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAssignmentForm;
