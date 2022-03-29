import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


// SKELETON CODE

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectMessage, setIncorrectMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(0);
  const router = useRouter();


  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("rememberMe") == "true") {
      setEmail(localStorage.getItem("email"));
      setPassword(localStorage.getItem("password"));
      setRememberMe(1);
    }
  }, []);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8000/api/v1/login", { email: email, password: password }).then((response) => {
        if (response.data.loginSuccess == "true") {
          window.sessionStorage.setItem("email", email);
          if (response.data.isAdmin == "true") {
            window.sessionStorage.setItem("isAdmin", true);
            router.push('/admin-home');
          } else {
            router.push('/');
          }
          if (rememberMe == 1) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
        } else {
          setIncorrectMessage("Username or password is incorrect.");
        }
      });
    } catch (err) {
      console.log(err);
    }

  };/*
  function RememberCheckbox(props) {
    if (typeof window !== "undefined" && localStorage.getItem("rememberMe") == "true") {
      return (
        <div>
          <input name="remember-me" type="checkbox" onChange={handleCheckbox} checked={rem/>
          <label htmlFor="remember-me">Remember Me</label>
        </div>
      );
    } else {
      return (
        <div>
          <input name="remember-me" type="checkbox" onChange={handleCheckbox}/>
          <label htmlFor="remember-me">Remember Me</label>
        </div>
      );
    }
  };*/

  let handleCheckbox = async (e) => {
    if (rememberMe == 0) {
      setRememberMe(1);
    } else {
      setRememberMe(0);
    }
  };
  return (
    <div className="container">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="../static/currently-showing.js" />

      </Head>
      <body>
        <NavBar />
        <main>

          <div id="login">
            <form onSubmit={handleSubmit}>

              <h1>Sign-In</h1>
              <p>Email Address</p>
              <a><input type="text" placeholder="Enter your email address" onChange={(val) => setEmail(val.target.value)} defaultValue={email}></input></a><br />
              <p>Password</p>
              <a><input type="password" placeholder="Enter your password" onChange={(val) => setPassword(val.target.value)} defaultValue={password}></input></a><br />
              <div id="remember-me-div">
                <input name="remember-me" type="checkbox" onChange={handleCheckbox} checked={rememberMe}/>
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <button type="submit">Sign-In</button>

            </form>
            <h3 id="incorrect-credentials" style={{ color: 'red' }}>{incorrectMessage}</h3>
            <p id="forgotpassword"><a href="something">Forgot your password?</a></p>

          </div>

          <div id="footer">
            <p id="inline">Don't have an account?</p> <a href="/registration">Create one here.</a>
          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}
