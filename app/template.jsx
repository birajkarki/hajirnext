'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Template = ({ children }) => {
  const router = useRouter();
  const params = useParams();
  const { setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect away from login, otp, and default routes
    if (isLoggedIn) {
      if (router === '/login') {
        router.push('/dashboard'); // or any other route you want to redirect to
      }
    }
  }, [isLoggedIn, router]);

  console.log(isLoggedIn, 'from isLogged in');

  useEffect(() => {
    const token =
      typeof window !== 'undefined' &&
      JSON.parse(localStorage.getItem('token'));
    const user =
      typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'));

    if (token) {
      setIsLoggedIn(true);
      setAuthUser({ user: user, token });
    } else {
      setIsLoggedIn(false);
      setAuthUser(null);
      // Redirect to the login page if there is no token
      router.replace('/login');
    }
  }, [router, setAuthUser, setIsLoggedIn]);

  return <div>{children}</div>;
};

export default Template;

// still needs to do !!

// - if user already has token and otp then he should be push to dashboard
//   and should not access /login , /otp , / default

// - if he doesnt have token then he should pushed to /login
