import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import {FcGoogle} from "react-icons/fc"
import { auth } from '../firebase';
import { useLoginMutation } from '../redux/api/userApi';
import toast from 'react-hot-toast';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../types/apiTypes';

const Login = () => {

    const [gender,setGender]=useState<string>("");
    const [date,setDate]=useState<string>("");

    const [login]=useLoginMutation();

    const loginHandler=async()=>{
        const provider=new GoogleAuthProvider();
        // await signInWithPopup(auth,provider);
        //that much required for authentication below on for storing in mongodb

       const {user}= await signInWithPopup(auth,provider);

       const res=await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
       })
       if("data" in res){
        toast.success(res.data.message);
       }
       else{
        const error= res.error as FetchBaseQueryError;
        const message= error.data as MessageResponse;
        toast.error(message.message);
       }

    }

  return (
    <div className='login'>
        <h1>Login</h1>
        <div>
            <label htmlFor="">Gender</label>
            <select name="gender" value={gender} onChange={(e)=>setGender(e.target.value)} id="">
                <option value="">select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
        <div>
            <label htmlFor="">Date of Birth</label>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
        </div>
        <div>
            <p>Already Signed In Once</p>
            <button onClick={loginHandler}>
                <FcGoogle/><span>Sign in with Google</span>
            </button>
        </div>


    </div>
  )
}

export default Login