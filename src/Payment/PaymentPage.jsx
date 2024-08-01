import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { message } from "antd";
import { Container, Card, CardActionArea, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

// Load your publishable key from Stripe
const stripePromise = loadStripe("pk_test_51PcnfQKiN6cZCYZsIyztW2luLdhmTftFc7mncXf21z9d9EV6X47DcJF8RSCfDbmsCLNruTY10eng8JLlICKNXeRI00TobzzP6n");

const PaymentPage = ({ onSuccess = () => { } }) => {
    const { enrollmentId } = useParams();
    const location = useLocation();
    const price = location.state?.price;
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !enrollmentId || !price) {
            message.error('Enrollment ID or price is missing.');
            setLoading(false);
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

            const amountToSend = price; // Convert to cents

            const response = await fetch(`http://localhost:4000/apiPayments/payment/${enrollmentId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payment_method_id: paymentMethod.id,
                    amount: amountToSend,
                    enrollment_id: enrollmentId,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const paymentResult = await response.json();

            if (paymentResult.error) {
                message.error(paymentResult.error.message);
            } else {
                message.success('Payment successful!');
                onSuccess(paymentResult); // Call the success handler
            }
        } catch (err) {
            console.error('Payment Error:', err);
            message.error('Payment failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="300"
                        image="https://cdni.iconscout.com/illustration/premium/thumb/card-payment-5364260-4510970.png"
                        alt="Payment"
                    />
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <Typography gutterBottom variant="h5" component="div">
                                Payment Details
                            </Typography>
                            <CardElement />
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                                disabled={!stripe || loading}
                                sx={{ mt: 2 }}
                            >
                                {loading ? 'Processing...' : 'Pay'}
                            </Button>
                        </form>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Container>
    );
};

const PaymentWrapper = (props) => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentPage {...props} />
        </Elements>
    );
};

export default PaymentWrapper;
