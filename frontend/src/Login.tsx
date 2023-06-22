import React, { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [values, setvalues] = useState({
    
    email: '',
    password: '',

  })
  const navigate = useNavigate();
  axios.defaults.withCredentials=true;
  const handleSubmit = (event: { preventDefault: () => void; }) => {

    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/')
        } else {
          alert(res.data.Error)
        }
      })
      .then(err => console.log(err));
  }


  useEffect(()=>{
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === "Success") {
       
        navigate('/')
      } 
    })
    .then(err => console.log(err));
  },[])
  
  return (
    <div >
      <div className='d-flex  justify-content-center align-items-center'>
        <Form className=' d-flex flex-column rounded bg-info p-4' onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name='email' onChange={e => setvalues({ ...values, email: e.target.value })} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password'  onChange={e => setvalues({ ...values, password: e.target.value })}/>
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

export default Login