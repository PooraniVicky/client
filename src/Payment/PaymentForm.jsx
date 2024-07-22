import React, { useState, useContext } from "react";
import { CourseContext } from "../ContextAPI/CourseContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { message } from "antd";
import { Container, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";

const PaymentForm = ({ amount, enrollmentId, onSuccess }) => {
    const stripe = useStripe();
    const { fetchCourseById, currentCourse } = useContext(CourseContext);
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                message.error(error.message);
                setLoading(false);
                return;
            }

            // Send paymentMethod.id and other required details to your server
            const response = await fetch(`http://localhost:4000/apiPayments/payment/${enrollmentId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount,
                    enrollmentId,
                }),
            });

            const paymentResult = await response.json();

            if (paymentResult.error) {
                message.error(paymentResult.error.message);
            } else {
                message.success('Payment successful!');
                onSuccess(paymentResult);
            }
        } catch (err) {
            console.error('Payment Error:', err);
            message.error('Payment failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container-fluid>
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
    <CardMedia
          component="img"
          height="300"
          image="https://cdni.iconscout.com/illustration/premium/thumb/card-payment-5364260-4510970.png"
          alt="green iguana"
        />
    <CardContent>

        <form onSubmit={handleSubmit}>
        <Typography gutterBottom variant="h5" component="div">
        <CardElement />

          </Typography>
            
            <button type="submit" className='btn btn-success  mt-5 px-5' disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>

        </form>
        </CardContent>
      </CardActionArea>
    </Card>
        </Container-fluid>
    );
};

export default PaymentForm;
