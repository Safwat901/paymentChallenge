import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [values, setvalues] = useState({
    name: '',
    email: '',
    gender: '',
    birthday: '',
    password: '',

  })
  const navigate = useNavigate();
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // console.log(values)
    axios.post('http://localhost:8081/register', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/login')
        } else {
          alert("Error")
        }
      })
      .then(err => console.log(err));


  }
  return (
    <div >
      <div className='d-flex  justify-content-center align-items-center'>
        <Form className=' d-flex flex-column rounded bg-info p-4' onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name='name' onChange={e => setvalues({ ...values, name: e.target.value })} />

            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' onChange={e => setvalues({ ...values, email: e.target.value })} />

            <Form.Label>Gender</Form.Label>

            <div className='d-flex ' >
              <Form.Check className='me-2' type="radio" aria-label="radio 1" name='gender' value='male' onChange={e => setvalues({ ...values, gender: e.target.value })} />
              <Form.Label className='me-2' >Male</Form.Label>
              <Form.Check className='me-2' type="radio" aria-label="radio 2" name='gender' value='female' onChange={e => setvalues({ ...values, gender: e.target.value })} />
              <Form.Label className='me-2' >Female</Form.Label>
            </div>


            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" placeholder="Date of Birth" name='dateOfBirth' onChange={e => setvalues({ ...values, birthday: e.target.value })} />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' onChange={e => setvalues({ ...values, password: e.target.value })} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
          <Link to="/register" className='btn btn-primary'>
            Register
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Register