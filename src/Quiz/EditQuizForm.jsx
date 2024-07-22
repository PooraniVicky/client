import React, { useContext, useState, useEffect } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { QuizContext } from '../ContextAPI/QuizContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { message } from 'antd';

const EditQuizForm = () => {
  const { fetchQuizById, updateQuiz } = useContext(QuizContext);
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: '',
    questions: [{
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    }]
  });

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const quizData = await fetchQuizById(quizId);
        console.log('Fetched quiz data:', quizData);

        if (quizData && quizData.title && quizData.questions && Array.isArray(quizData.questions) && quizData.questions.length > 0) {
          setInitialValues({
            title: quizData.title,
            questions: quizData.questions.map(question => ({
              questionText: question.questionText,
              options: question.options,
              correctAnswer: question.correctAnswer
            }))
          });
        } else {
          console.error('Invalid quiz data structure:', quizData);
          // Handle invalid data scenario (e.g., show error message)
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
        // Handle fetch error (e.g., show error message)
      }
    };

    fetchQuizData();
  }, [quizId]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      questions: Yup.array().of(
        Yup.object().shape({
          questionText: Yup.string().required('Question text is required'),
          options: Yup.array()
            .of(Yup.string().required('Option is required'))
            .min(4, 'At least 4 options are required'),
          correctAnswer: Yup.number().required('Correct answer is required')
        })
      )
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const updatedQuizData = {
          title: values.title,
          questions: values.questions
        };
        await updateQuiz(quizId, updatedQuizData);
        message.success('Quiz updated successfully');
        navigate(`/quizzes/${quizId}`);
      } catch (error) {
        message.error('Failed to update quiz');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="container">
      <div className="card mb-3" style={{ width: '1200px' }}>
        <div className="row g-0">
          <div className="col-md-6 d-md-block">
            <img
              src="https://clipart-library.com/2023/232-2328186_image-free-printable-and-other-fun-quizzes-clickable.png"
              className="img-fluid rounded-start login-image"
              alt="..."
            />
          </div>
          <div className="col-md-6 col-12">
            <div className="card-body">
              <h1 className="text-center pacifico-regular" style={{ color: 'gray' }}>
                <i className="bi bi-pen-fill">Edit Quiz</i>
              </h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.title && formik.errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <FormikProvider value={formik}>
                  <FieldArray name="questions">
                    {({ push, remove }) => (
                      <>
                        {formik.values.questions.map((question, index) => (
                          <div key={index} className="mt-3">
                            <h5>Question {index + 1}</h5>
                            <Form.Group controlId={`questions[${index}].questionText`}>
                              <Form.Label>Question Text</Form.Label>
                              <Form.Control
                                type="text"
                                name={`questions[${index}].questionText`}
                                value={formik.values.questions[index].questionText}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.questions && formik.touched.questions[index] && formik.errors.questions && formik.errors.questions[index] && formik.errors.questions[index].questionText}
                              />
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.questions && formik.errors.questions[index] && formik.errors.questions[index].questionText}
                              </Form.Control.Feedback>
                            </Form.Group>

                            <FieldArray name={`questions[${index}].options`}>
                              {({ push: pushOption, remove: removeOption }) => (
                                <div>
                                  {formik.values.questions[index].options.map((option, optionIndex) => (
                                    <Form.Group key={optionIndex} controlId={`questions[${index}].options[${optionIndex}]`}>
                                      <Form.Label>Option {optionIndex + 1}</Form.Label>
                                      <Form.Control
                                        type="text"
                                        name={`questions[${index}].options[${optionIndex}]`}
                                        value={formik.values.questions[index].options[optionIndex]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.touched.questions && formik.touched.questions[index] && formik.touched.questions[index].options && formik.touched.questions[index].options[optionIndex] && formik.errors.questions && formik.errors.questions[index] && formik.errors.questions[index].options && formik.errors.questions[index].options[optionIndex]}
                                      />
                                      <Form.Control.Feedback type="invalid">
                                        {formik.errors.questions && formik.errors.questions[index] && formik.errors.questions[index].options && formik.errors.questions[index].options[optionIndex]}
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  ))}
                                  <Button
                                    variant="outline-primary"
                                    onClick={() => pushOption('')}
                                    className="mt-2"
                                  >
                                    Add Option
                                  </Button>
                                  {formik.values.questions[index].options.length > 4 && (
                                    <Button
                                      variant="outline-danger"
                                      onClick={() => removeOption(formik.values.questions[index].options.length - 1)}
                                      className="mt-2 ms-2"
                                    >
                                      Remove Option
                                    </Button>
                                  )}
                                </div>
                              )}
                            </FieldArray>

                            <Form.Group controlId={`questions[${index}].correctAnswer`}>
                              <Form.Label>Correct Answer</Form.Label>
                              <Form.Control
                                as="select"
                                name={`questions[${index}].correctAnswer`}
                                value={formik.values.questions[index].correctAnswer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.questions && formik.touched.questions[index] && formik.errors.questions && formik.errors.questions[index] && formik.errors.questions[index].correctAnswer}
                                custom="true"
                              >
                                {formik.values.questions[index].options.map((option, optionIndex) => (
                                  <option key={optionIndex} value={optionIndex}>
                                    {`Option ${optionIndex + 1}`}
                                  </option>
                                ))}
                              </Form.Control>
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.questions && formik.errors.questions[index] && formik.errors.questions[index].correctAnswer}
                              </Form.Control.Feedback>
                            </Form.Group>

                            {formik.values.questions.length > 1 && (
                              <Button
                                variant="outline-danger"
                                onClick={() => remove(index)}
                                className="mt-2"
                              >
                                Remove Question
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline-primary"
                          onClick={() => push({
                            questionText: '',
                            options: ['', '', '', ''],
                            correctAnswer: 0
                          })}
                          className="mt-3 me-3"
                        >
                          Add Question
                        </Button>
                      </>
                    )}
                  </FieldArray>
                </FormikProvider>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="mt-3"
                >
                  {loading ? 'Updating...' : 'Update Quiz'}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EditQuizForm;
