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
import axios from "axios";
   
export default function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useRouter()
  const authId = useSelector((state) => state.authId);
  const dispatch = useDispatch();

  if(authId){
    history.push("/"); // Use 'push' method to redirect
  }

  const signUp = async(e) => {
    e.preventDefault();
    setLoading(true);

    if(!firstName){
      setLoading(false);
      toast.error("First Name is requred!", {
        position: toast.POSITION.TOP_CENTER,
      })
    }else if(!lastName){
      setLoading(false);
      toast.error("Last Name is requred!", {
        position: toast.POSITION.TOP_CENTER,
      })
    }else if(!email){
      setLoading(false);
      toast.error("Email is requred!", {
        position: toast.POSITION.TOP_CENTER,
      })
    }else if(!phone){
      setLoading(false);
      toast.error("Phone is requred!", {
        position: toast.POSITION.TOP_CENTER,
      })
    }else if(!password){
      setLoading(false);
       toast.error("Password is required!", {
        position: toast.POSITION.TOP_CENTER,
      })
    } else {
      setLoading(true);
  
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('country', 'Kenya');
      formData.append('idNo', 'N/A');
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('timestamp', Date.now());
      formData.append(
        'profilePhoto',
        'https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d'
      );
      
      axios
        .post('https://electrikacomputers.co.ke/backend/php/register.php', formData)
        .then((response) => {
          setLoading(false);
          const insertedId = response.data.id;
          if(insertedId === undefined){
            toast.error("Email entered already in use!", {
              position: toast.POSITION.TOP_CENTER,
            })
            
          }else{
            swal({
              title: 'Successfully created Electrika Computers account.\n',
              text: 'You are now required to sign in.\nThank you!',
            });
            history.push('/login');
          }
          
        })
        .catch((error) => {
          setLoading(false);
          if (error.response && error.response.status === 409) {
            const errorMessage = error.response.data.error;
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error('Error occurred while signing up!', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  
  };


    return (
        <div className="login-container">
        <Helmet>
        <title>Register Page | Electrika Computers</title>
        <meta name="description" content="Sign in page for Electrika Shops" />
        <meta property="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982" />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={`Register Page  |  Electrika Computers`}  />
        <meta property="og:description" content="Sign up page for Electrika Shops" />
        <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982"  />
    
        {/* Twitter Card meta tags */}
        <meta name="twitter:title" content={`Register Page  |  Electrika Computers`} />
        <meta name="twitter:description" content="Sign up page for Electrika Shops" />
        <meta name="twitter:image" content="https://firebasestorage.googleapis.com/v0/b/electrika-store.appspot.com/o/electrika-welcome.jpg?alt=media&token=34abff30-6591-4eef-a761-7b76bd78b982"  />
      </Helmet>
        <div className="centered-container"
        style={{
          marginTop:100
        }}
        >
      <Card style={{
        padding:10,
        border: '2px solid #42a5f5',
        backgroundColor: '#fff',
      }} color="transparent" shadow={true}>
        <Typography variant="h4" color="blue-gray">
          <center>
          <img src="/media/images/logo2.jpg" style={{height:80}}/>
          </center>
        </Typography>
        <center>
        <i>
        <Typography color="gray" className="mt-1 font-normal">
        Create a new account.
      </Typography>
        </i>
        </center>
        <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
          <Input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          color="blue" size="lg" label="First Name" />
          <Input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          color="blue" size="lg" label="Last Name" />
            <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color="blue" size="lg" label="Email" />
            <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            color="blue" size="lg" label="Phone" />

            <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            color="blue" type="password" size="lg" label="Password" />
          </div>
          <Button onClick={signUp} color="blue" className="mt-6" fullWidth>
          {loading ? <div style={{display:'table', margin: 'auto'}}><Spinner color="blue" /></div> : 'Sign Up'}
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Do you have an account already?{" "}
            <Link href="/login" className="font-medium  text-gray-900">
              <b style={{color: '#42a5f5'}}>Sign In</b>
            </Link>
          </Typography>
        </form>
      </Card>
      </div>
      </div>
    );
  }