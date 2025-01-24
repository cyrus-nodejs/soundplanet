
// import {  Link } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';

import {useState} from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import { fetchRegister, getMessage } from '../../redux/features/auth/authSlice';

import Stack from 'react-bootstrap/Stack';



const Register = ( ) => {
  const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);



interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}




  const validationSchema = Yup.object().shape({
   firstname: Yup.string()
   .min(2, 'Name must be minimum 2')
   .max(100, 'Name must not be more than 100 characters')
   .required('Name is required'),
   lastname: Yup.string()
   .min(2, 'Name must be minimum 2')
   .max(100, 'Name must not be more than 100 characters')
   .required('Name is required'),
   email: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
   confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
   });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      dispatch(fetchRegister(values))
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
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

 

  return (
    
    <section className="  ">
      <Container className="vh-100 pt-5 mainCenter" fluid>
{/* <Link to="/" className="p-2 navbar fs-3 text-decoration-none text-reset text-danger">SOUND PLANET</Link> */}

 <div className=" d-flex ">
 <div className="ms-auto  me-auto">

                
  <h4 className="text-success" style={{textAlign:"center"}}>Register an account</h4>
  <Form className='text-light' onSubmit={formik.handleSubmit}>
  <Form.Control className='text-light'  size="lg"  required  onChange={formik.handleChange} value={formik.values.firstname} style={{}}  name="firstname"type="text"  placeholder="Enter firstname" />
  {formik.touched.firstname && formik.errors.firstname && (
            <div className="error ">{formik.errors.firstname}</div>
          )}
      <br /> 
      <Form.Control className='text-light' size="lg"  required onChange={formik.handleChange} value={formik.values.lastname}  style={{}}  name="lastname"   type="text"  placeholder="lastname" />
      {formik.touched.lastname && formik.errors.lastname && (
            <div className="error ">{formik.errors.lastname}</div>
          )}
      <br />
      <Form.Control className='text-light' size="lg"  required  value={formik.values.email} onChange={formik.handleChange} style={{}} name="email"   type="email" placeholder="Email" />
      {formik.touched.email && formik.errors.email && (
            <div className="error ">{formik.errors.email}</div>
          )}
      <br />
      <Form.Control className='text-light' size="lg" hidden  required  value={formik.values.email} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="Email" />
      {formik.touched.email && formik.errors.email && (
            <div className="error ">{formik.errors.email}</div>
          )}
      <br />
      <Form.Control className='text-light' size="lg"  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
       <Form.Control className='text-light' size="lg"  required   value={formik.values.confirmPassword}  onChange={formik.handleChange} style={{}} name="confirmPassword"     type="password" placeholder="Confirm Password" />
       {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
      <br />
     
      <div className="d-grid gap-2">
    
    <Button variant="outline-success" type="submit" disabled={submitting} style={{margin:"20px 0px"}} size="lg"      >Sign up</Button>
   
     </div>
     </Form>
     <Stack direction="horizontal" gap={1}>
      <div className="p-2 loginp"  > <p className="fs-6 "> Already registered? {message && (<span className="text-danger  fs-6 text-center">{message}</span> )}   <a href="/login" style={{color:'red', textDecoration:'none', }}>  Please sign in</a></p></div>
      
    </Stack>

</div>

</div>

</Container>

    </section>
  )
}

export default Register;