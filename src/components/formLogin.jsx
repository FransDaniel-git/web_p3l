import React from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link ,useNavigate } from 'react-router-dom';
import { useState } from "react";
import {toast} from 'react-toastify';
import { SignIn } from '../api/apiAuth';
const FormLogin = () => {

  const navigate = useNavigate();
  console.log("Navigate function:", navigate);

  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>{
    const newData = {...data, [e.target.name]: e.target.value};
    setData(newData);
    if(newData.email !== "" && newData.password !== ""){
      setIsDisabled(false);
    }else{
      setIsDisabled(true);
    }
  }

  const Login =  (event) => {
    event.preventDefault();
    console.log(data);
    console.log("bruh");
    setLoading(true);
    SignIn(data)
    .then((response) => {
      console.log("bruh12");
      setLoading(false);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("data", response.data);
      sessionStorage.setItem("id" , response.id);
      console.log("bruh122");
      console.log(response);
      toast.success("Login Success");
      console.log(navigate)
      navigate("/content");
    })
    .catch((error) => {
      console.log("bruh34");
      setLoading(false);
      toast.error(error.message);
    });
  };
  return (
    <Form>
          <Form.Group className="mb-3" controlId="formName">
      <Form.Label>Email</Form.Label>
      <Form.Control 
        type="email" 
        placeholder="Masukkan Email" 
        name="email"
        value={data.name}
        onChange={handleChange} 
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control 
        type="password" 
        placeholder="Masukkan password" 
        name="password"
        value={data.password}
        onChange={handleChange} 
      />
    </Form.Group>


      <Button variant="primary" type="submit" disabled={isDisabled} onClick={Login}>
        {loading ? (
          <Spinner animation='border' variant='light' size='sm'/>
        ) : (
          <span>Login</span>
        )}
      </Button>
      <p className='text-end mt-2'>
        Belum punya akun? <Link to='/register'>Daftar</Link>
      </p>
    </Form>
  );
};

export default FormLogin;
