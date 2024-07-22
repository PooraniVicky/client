import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../Services/axiosConfig.js';

const ForgotPassword = () => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [values, setValues] = useState({ email: '' });
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
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
    });
  
    const onSubmit = async (values) => {
      try {
        await axios.post('apiUsers/forgot-password', values);
        setMessage('Password reset link sent');
        setError('');
      } catch (error) {
        setError('Failed to send reset link');
        setMessage('');
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
    };
  
    return (
      <div className="container">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-5 d-none d-md-block">
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/462/187/original/forgot-the-password-illustration-concept-on-white-background-vector.jpg"
              className="img-fluid rounded-start login-image"
              alt="..."
            />
          </div>
          <div className="col-md-7 col-12">
            <div className="card-body">
              <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
                Forgot Password
              </h1>
              
        <Formik initialValues={values} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form>
              <div className="form-group">
                <label className='playwrite-sk'>Email</label>
                <input name="email" type="email" className="form-control" placeholder="Email" onChange={handleInputChange} />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>
              <button type="submit" className="btn btn-primary mt-3 pacifico-regular" style={{fontSize: '1.5rem'}}>Send Reset Link</button>
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

export default ForgotPassword;
