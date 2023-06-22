import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Modal from 'react-bootstrap/Modal';
import {PaymentElement, CardElement} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51NLhbuJV1IgKgD8UcCZDzfXRtOBZifEyN8w7CxLsq4NND4tsQKd4JBzdPdJbpOJftn5fYJ8E2TPpCMDeFZPB88YI00zCm88FBS');

const Payment = () => {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [clientSecret, setClientSecret] = useState("");


    const [message, setMessage] = useState('');

    const [subscription, setSubscription] = useState([])


    axios.defaults.withCredentials = true;

    interface Subscription {
        id:          number;
        name:        string;
        description: string;
        price:       number;
    }

    useEffect(() => {
        
        axios.get('http://localhost:8081/subscription')
            .then(res => {
                if (res.data.Status === "Success") {
                    setSubscription(res.data.subscription)
                } else {
                    setMessage(res.data.Error)
                }
            })
            .then(err => console.log(err));


    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                window.location.reload();
            }).catch(err => console.log(err))
    }


    async function handleCheckout(e: { preventDefault: () => void; }) {
        e.preventDefault();

    
      
        
    }

      const openPaymentModal = () => {

        fetch("http://localhost:8081/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
          }).then(async (result) => {
            var { clientSecret } = await result.json();
            setClientSecret(clientSecret);
            handleShow();
          });

      }


    return (
        <div className=''>

            <Navbar className="bg-info" >
                <Container className=" d-flex justify-content-center align-items-center ">

                    <Nav className="px-4">
                        <Nav.Link className='text-light fs-5' href="/">Profile</Nav.Link>
                        <Nav.Link className='text-light fs-5' href="/payment">Payment</Nav.Link>
                        <button className='btn btn-success' onClick={handleDelete}>Logout</button>

                    </Nav>
                </Container>
            </Navbar>

            <div className='container d-flex justify-content-center align-items-center '>


            </div>
            <div className='d-flex  justify-content-center align-items-center mt-3'>

                {subscription.map((data:Subscription) =>
                    <Card style={{ width: '18rem' }}>

                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">${data.price}</Card.Subtitle>
                            <Card.Text>
                                {data.description}
                            </Card.Text>
                            <Button variant="primary" onClick={openPaymentModal}>Buy Now</Button>
                        </Card.Body>
                    </Card>

                )}

               

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Make Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {
                        clientSecret && stripePromise && <Elements stripe={stripePromise} options={{ clientSecret  }}>
                            <CheckoutForm />
                        </Elements>
                    }
                    </Modal.Body>
             
                </Modal>
            </div>

        </div>
    )
}

export default Payment