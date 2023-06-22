import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Hoome = () => {
  const [values, setvalues] = useState({
    name: '',
    gender: '',
    birthday: '',

  })


  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const[user,setUser]=useState({
    id:'',
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
    axios.post('http://localhost:8081/updateprofile', {...values, id: user.id})
      .then(res => {
        if (res.data.Status === "Success") {
          alert("success")
        } else {
          alert("Error")
        }
      })
      .then(err => console.log(err));


  }
  // const [email, setEmail] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081/profile')
      .then(res => {
        if (res.data.Status === "Success") {
       
          setAuth(true)
          setId(res.data.user.id)
          setUser({...res.data.user});
          setvalues({...res.data.user});
          console.log(user)
          // setEmail(res.data.email)
          // navigate('/login')
        } else {
          setAuth(false)
          setMessage(res.data.Error)
          navigate('/login')
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
  return (
    <div className=''>

      <Navbar className="bg-info" >
        <Container className=" d-flex justify-content-center align-items-center ">

          <Nav className="px-4">
            <Nav.Link className='text-light fs-5' href="#home">Profile</Nav.Link>
            <Nav.Link className='text-light fs-5' href="/payment">Payment</Nav.Link>
            <button className='btn btn-success' onClick={handleDelete}>Logout</button>

          </Nav>
        </Container>
      </Navbar>

      <div className='container d-flex justify-content-center align-items-center '>
        {
          auth ?
            <div className='p-4'>
              <h3>You are authorized --{user.name}</h3>
              
            </div>
            :
            <div>
              <h3>{message}</h3>
              <h3>Login now</h3>
              <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
        }

      </div>
      <div className='d-flex  justify-content-center align-items-center'>
        <Form className=' d-flex flex-column rounded bg-info p-4' onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" defaultValue={user.name} name='name' onChange={e => setvalues({ ...values, name: e.target.value })} />

          

            <Form.Label>Gender</Form.Label>

            <div className='d-flex ' >
              <Form.Check className='me-2' type="radio" aria-label="radio 1" name='gender' value='male' defaultChecked={user.gender=='male'} onChange={e => setvalues({ ...values, gender: e.target.value })} />
              <Form.Label className='me-2' >Male</Form.Label>
              <Form.Check className='me-2' type="radio" aria-label="radio 2" name='gender' value='female' defaultChecked={user.gender=='female'} onChange={e => setvalues({ ...values, gender: e.target.value })} />
              <Form.Label className='me-2' >Female</Form.Label>
            </div>


            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" defaultValue={user.birthday.split('T')[0]} name='dateOfBirth' onChange={e => setvalues({ ...values, birthday: e.target.value })} />

          </Form.Group>

         

          <Button type="submit" className='btn btn-primary'>
            Update
          </Button>

        </Form>
      </div>

    </div>
  )
}

export default Hoome