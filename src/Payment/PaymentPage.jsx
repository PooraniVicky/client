import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { Container } from "react-bootstrap";

// Load your publishable key from Stripe
const stripePromise = loadStripe("pk_test_51PcnfQKiN6cZCYZsIyztW2luLdhmTftFc7mncXf21z9d9EV6X47DcJF8RSCfDbmsCLNruTY10eng8JLlICKNXeRI00TobzzP6n");

const PaymentPage = ({ amount, enrollmentId, onSuccess }) => {
    return (
        <Container>
        <Elements stripe={stripePromise}>
            <PaymentForm amount={amount} enrollmentId={enrollmentId} onSuccess={onSuccess} />
        </Elements>
        </Container>
    );
};

export default PaymentPage;
