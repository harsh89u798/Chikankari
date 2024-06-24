import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {  createUserWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import { getDatabase, ref, set } from 'firebase/database';
export default function SignupForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save additional data in Realtime Database
      const userId = user.uid;
      await saveUserData(userId, name);

      toast.success('Account created successfully');
      props.setLogin(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`${errorCode}: ${errorMessage}`);
    }
  };

  const saveUserData = async (userId, name) => {
    try {
      // Reference to the location where user data will be stored
      const userRef = ref(getDatabase(), `users/${userId}/profileData`);
      
      // Set user data
      await set(userRef, { name ,userId});
    } catch (error) {
      console.error('Error saving user data:', error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // Sign in with Google
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Save additional data in Realtime Database
      const userId = user.uid;
      const userName = user.displayName ? user.displayName : 'Anonymous';
      await saveUserData(userId, userName);

      toast.success('Account created successfully');
      props.setLogin(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`${errorCode}: ${errorMessage}`);
    }
  };

  return (
    <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
      <div className="text-center">
        <div className="mt-5 space-y-2">
          <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create account</h3>
          <p className="">
            Already have an account?{' '}
            <button onClick={() => props.setLogin(true)} className="font-medium cursor-pointer text-[#B08B59] hover:text-[#B08B59]">
              Sign in
            </button>
          </p>
        </div>
      </div>
      <div className="bg-white shadow-lg p-4 py-6 space-y-8 sm:p-6 sm:rounded-3xl">
      <div className="grid ">
                      <button onClick={handleGoogleSignup} className="flex items-center justify-center py-2.5 border rounded-lg hover:bg-[#FFF8E7] duration-150 active:bg-[#FFF8E7]">
                          <svg className="w-5 h-5 mx-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_17_40)">
                                  <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                  <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                  <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                  <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                              </g>
                              <defs>
                                  <clipPath id="clip0_17_40">
                                      <rect width="48" height="48" fill="white" />
                                  </clipPath>
                              </defs>
                          </svg>
                          Continue with Google
                      </button>
                   
                  </div>
            
                  <div className="relative">
                      <span className="block w-full h-px bg-[#B08B59]"></span>
                      <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Or continue with</p>
                  </div>
      
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#B08B59] shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#B08B59] shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#B08B59] shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-[#B08B59] shadow-sm rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-[#B08B59] hover:bg-[#876941] active:bg-[#B08B59] rounded-lg duration-150"
            >
              Sign Up
            </button>
          </form>
        
   
      </div>
    </div>
  );
}
