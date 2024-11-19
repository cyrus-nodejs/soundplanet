
import FacebookLogin from 'react-facebook-login';
import {  redirect, Navigate, useNavigate} from 'react-router-dom';
import "../../App.css"
import {Button, Container, Form} from 'react-bootstrap'
import "../../App.css"
import { GoogleLogin } from '@react-oauth/google';

import { useFormik } from 'formik';
import * as Yup from 'yup';


import {  useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../redux/app/hook';
import {fetchFacebookLogin, fetchFacebookAuth, getMessage,   fetchGoogleLogin, fetchLogin, getUpdateUser,   getIsAuthenticated } from '../../redux/features/auth/authSlice';


const Login = () => {
  const navigate = useNavigate()
  
  
    const isAuthenticated = useAppSelector(getIsAuthenticated)
      const user = useAppSelector(getUpdateUser)
    

      
    const dispatch = useAppDispatch()
  const message = useAppSelector(getMessage)
  const [submitting, setSubmitting] = useState(false);



interface FormValues {
  password: string;
  username:string,
}




  const validationSchema = Yup.object().shape({
   username: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
   });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitting(true);
      dispatch(fetchLogin(values))
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
      password: '',
      username:"",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });


      useEffect(() =>{
        if (isAuthenticated && user){
          navigate('/')
        }else{
          redirect("/login")
        }

          }, [isAuthenticated, user, navigate])
  
          
          
         
         

  return (
  

        <Container className="  mainCenter" fluid> 
          
          <div className=" d-flex ">
      {!isAuthenticated && !user &&(
          <Navigate to="/login" replace={true} />
        )} 
          
          
         
              <div className="ms-auto my-5 me-auto">
          
                   
            <p className="text-center text-success text-success fs-3 fw-normal">Login</p>
            <Form onSubmit={formik.handleSubmit}>
      <Form.Control size="lg"  required  value={formik.values.username} onChange={formik.handleChange} style={{}} name="username"   type="email" placeholder="Email" />
      {formik.touched.username && formik.errors.username && (
            <div className="error ">{formik.errors.username}</div>
          )}
     
      <br />
      <Form.Control size="lg"  required   value={formik.values.password}  onChange={formik.handleChange} style={{}} name="password"     type="password" placeholder="Password" />
      {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
      <br />
                <div className="d-grid gap-2">
             <Button type="submit" disabled={submitting}  variant="success" style={{margin:"20px 0px"}} size="lg"  >Sign in</Button>
               </div> 

               </Form>
               <div className=" pb-2 ">                                                                        
               {/* <Button className="my-2" variant="success" onClick={handleLogin} disabled={isLoading}>
      Login via FACEBOOK
    </Button> */}
    <FacebookLogin
    appId={import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID}
    autoLoad={true}
    fields="name,email,picture"
    onClick={() => dispatch(fetchFacebookAuth)}
    callback={() => dispatch(fetchFacebookLogin)}
    icon={<i className='bx bxl-facebook-circle mt-1 '></i>}
     cssClass="facebook bg-primary rounded-2 w-100 "
     />
    </div>
<GoogleLogin
             onSuccess={() => dispatch(fetchGoogleLogin)}
            onError={() => {}}
            login_uri='http://localhost:3000/auth/google'
            theme="filled_blue"
            shape='rectangular'
            logo_alignment="left"
            text="continue_with"
            useOneTap
          /> 
     
              {/* <a href="http://localhost:3000/auth/google"><Button >Google</Button> </a> */}
              
              <div className="d-flex mb-3">
           <div className="p-2"><a href="/forgotpassword" style={{color:'red', textDecoration:'none'}}><p style={{color:'red', textDecoration:'none'}}>Forgot password?</p></a></div>
           
           <div className="ms-auto p-2"><p className="fs-6 mr-4 "> Don't have an account?  <a href="/register" style={{color:'red', textDecoration:'none'}}>Sign up</a></p></div>

          </div>
             
              
          
          <p className="text-danger mt-2 fs-5 text-center">{message}</p>  
          </div>    
          </div>
     
          </Container>
        
      
 )
}

export default Login;



