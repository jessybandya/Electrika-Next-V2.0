'use client'

import React, { useState } from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Spinner,
  } from "@material-tailwind/react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { updateAuthId, updateUser } from "@auth/redux/dataSlice";
   
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const history = useRouter()
  const authId = useSelector((state) => state.authId);
  const dispatch = useDispatch();

  if(authId){
    history.push("/"); // Use 'push' method to redirect
  }

  const login = async(e) => {
    e.preventDefault();
    setLoading(true);

    if(!email){
      setLoading(false);
      toast.error("Email is requred!", {
        position: toast.POSITION.TOP_CENTER,
      })
    }else if(!password){
      setLoading(false);
       toast.error("Password is required!", {
        position: toast.POSITION.TOP_CENTER,
      })
    } else {
      setLoading(true);
  
      const formData = {
        email: email,
        password: password,
      };
  
      try {
        const response = await fetch('https://electrikacomputers.co.ke/backend/php/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const responseData = await response.text();
        console.log(responseData); // Log the response data
  
        const data = JSON.parse(responseData);
        if (data && data.error) {
          const errorMessage = data.error; // Extract the error message
          setLoading(false);
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (data && data.message) {
          setLoading(false);
          const authId = data.authId;
  
          // Store the token and authId in localStorage or any other state management solution
          // Example using localStorage:
          dispatch(updateAuthId(authId));

const userDetails = {
  firstName: data.user.firstName,
  lastName: data.user.lastName,
  email: data.user.email,
  phone: data.user.phone,
  idNo: data.user.idNo,
  country: data.user.country,
  profile: data.user.profile,
  timestamp: data.user.timestamp,
  id: data.user.id,
};

dispatch(updateUser(JSON.stringify(userDetails)))

          setLoading(false);
          Swal.fire({
            icon: "success",
            title: `Welcome Back ${data.user.firstName} ${data.user.lastName} to Electrika Computers!`,
            text: "We are your leading TECH HUB!",
          })
            history.push('/');
        } else {
          // Handle unexpected response format
          console.error('Invalid response:', data);
        }
      } catch (error) {
        // Handle fetch or other network errors
        console.error('Error:', error);
      }
    }
  
  };


    return (
        <div className="login-container">
        <Helmet>
        <title>Login Page | Electrika Computers</title>
        <meta name="description" content="Sign in page for Electrika Shops" />
        <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={`Login Page  |  Electrika Computers`}  />
        <meta property="og:description" content="Sign in page for Electrika Shops" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982"  />
    
        {/* Twitter Card meta tags */}
        <meta name="twitter:title" content={`Login Page  |  Electrika Computers`} />
        <meta name="twitter:description" content="Sign in page for Electrika Shops" />
        <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982"  />
      </Helmet>
        <div className="centered-container">
      <Card style={{
        padding:10,
        border: '2px solid #42a5f5',
        backgroundColor: '#fff'
      }} color="transparent" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          <center>
          <img src="/media/images/logo2.jpg" style={{height:80}}/>
          </center>
        </Typography>
        <center>
        <i>
        <Typography color="gray" className="mt-1 font-normal">
        Sign in with your registered account.
      </Typography>
        </i>
        </center>
        <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="blue" size="lg" label="Email" />
            <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="blue" type="password" size="lg" label="Password" />
          </div>
          <Button onClick={login} color="blue" className="mt-6" fullWidth>
          {loading ? <div style={{display:'table', margin: 'auto'}}><Spinner color="blue" /></div> : 'Login'}
          </Button>
          <Typography
          onClick={() => Swal.fire({
            title: 'Forgotten Password?',
            text: 'Enter your email address below to reset your password.',
            input: 'text',
            inputLabel: 'Email Address',
            inputPlaceholder: 'Enter your email address',
            showCancelButton: true,
            confirmButtonText: 'Reset Password',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
              return fetch(`https://api.example.com/reset-password?email=${email}`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.statusText)
                  }
                  return response.json()
                })
                .catch(error => {
                  Swal.showValidationMessage(
                    `Request failed: ${error}`
                  )
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Password Reset',
                text: 'An email has been sent to your email address with instructions on how to reset your password.',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            }
          
          })}
          color="blue" className="mt-4 cursor-pointer text-center font-normal">
          Forgotten Password?
        </Typography>

          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium  text-gray-900">
              <b style={{color: '#42a5f5'}}>Sign Up</b>
            </Link>
          </Typography>
        </form>
      </Card>
      </div>
      </div>
    );
  }