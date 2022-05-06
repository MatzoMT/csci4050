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
        if (response.data.loginSuccess == "true" && response.data.status != "Suspended") {
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
        } else if (response.data.isInactive == "true") {
          setIncorrectMessage("Your account is inactive. Please activate it using the link sent to your email.");
          
        } else if (response.data.status == "Suspended") {
          setIncorrectMessage("Your account has been suspended.");
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

              <h1>Sign in to FilmMax</h1>
              <h3 id="incorrect-credentials" style={{ color: 'red' }}>{incorrectMessage}</h3>

              <label for="email" className="field-label"><h3>Email</h3></label>
              <a><input type="text" className="fields" name="email" placeholder="johndoe@email.com" onChange={(val) => setEmail(val.target.value)} defaultValue={email}></input></a><br />
              <label for="password" className="field-label"><h3>Password</h3></label>
              <a><input type="password" className="fields" name="password" placeholder="Enter your password" onChange={(val) => setPassword(val.target.value)} defaultValue={password}></input></a><br />
              <div id="remember-me-div">
                <input name="remember-me" type="checkbox" onChange={handleCheckbox} checked={rememberMe} />
                <label htmlFor="remember-me">Remember Me</label>
                <p id="forgotpassword"><a href="/forgot-password">Forgot your password?</a></p>
              </div>
              <button type="submit" id="sign-in-button">Sign-In</button>
            </form>
              <p id="or">OR</p>

          </div>

          <div id="footer">
         <a href="/registration" id="create-account-button"><p>Create an Account</p></a>
          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}
