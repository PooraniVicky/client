import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../Services/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const initialValues = {
        password: '',
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post(`/reset-password/${token}`, values);
            console.log(response.data.message);
            setMessage('Password Reset successful.')
            navigate('/login')
        } catch (error) {
            console.error(error);
            setError('Error resetting password');
        }
        setSubmitting(false);
    };
    useEffect(() => {
        const messageTimer = setTimeout(() => {
          setMessage('');
        }, 3000);
    
        const errorTimer = setTimeout(() => {
          setError('');
        }, 3000);
    
        return () => {
          clearTimeout(messageTimer);
          clearTimeout(errorTimer);
        };
      }, [message, error]);

    return (
        <div className="container">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-5 d-none d-md-block">
              <img
                src="  https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7876.jpg"
                className="img-fluid rounded-start login-image"
                alt="..."
              />
            </div>
            <div className="col-md-7 col-12">
              <div className="card-body">
                <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
                  Reset Password
                </h1>
                
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <Form>
                <div className="form-group">
                  <label>New Password</label>
                  <input name="password" type="password" className="form-control" placeholder="New Password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-3">Reset Password</button>
                   {error && <div className="alert alert-danger">{error}</div>}
                   {message && <div className="alert alert-success">{message}</div>}     
                   </Form>
            )}
        </Formik>
        </div>
        </div>
      </div>
    </div>
  </div>
    );
};

export default ResetPassword;
