

import Container from 'react-bootstrap/Container';
 
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

import {  useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/app/hook';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchForgotPassword, getMessage } from '../../redux/features/auth/authSlice';

const ForgotPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  interface FormValues {
    email:string,
  }
  
  
  
  
    const validationSchema = Yup.object().shape({
     email: Yup.string().email('Invalid email').required('Email is required'),
     });
  
    const handleSubmit = async (values: FormValues) => {
      try {
        setSubmitting(true);
        dispatch(fetchForgotPassword(values))
        console.log(values);
        // Set submitting to false after successful submission
        setSubmitting(false);
      } catch (error) {
        // Handle form submission error
        console.error(error);
        setSubmitting(false);
      }
    };
  
    const formik = useFormik({
      initialValues: {
        email:"",
      },
      validationSchema,
      onSubmit: handleSubmit,
    });
  

  return (
   
    <section>
    <Container fluid>
   
<center>
<div   className="d-inline-flex px-5 mx-5">
<div >
         
                
  <p className="text-center text-dark fs-1 fw-normal">Forgot Your Password?
No problem! We'll send you instructions on how to reset your password.

</p>
  <Form onSubmit={formik.handleSubmit}>
      <Form.Control size="lg" className="shadow-none"  required  value={formik.values.email} onChange={formik.handleChange} style={{}} name="email"   type="email" placeholder="Email" />
      {formik.touched.email && formik.errors.email && (
            <div className="error ">{formik.errors.email}</div>
          )}
     
      <br />
     
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  variant="success" style={{margin:"20px 0px"}} size="lg"  >Send Reset</Button>
               </div> 

               </Form>
    
    
    <div className="d-flex mb-3">
 <div className="p-2"><p style={{color:'red', textDecoration:'none'}}>{message}</p></div>
 
 
</div>
    
    

     
      
</div>
</div>

</center>
</Container>

    </section>
 )
}

export default ForgotPassword;



