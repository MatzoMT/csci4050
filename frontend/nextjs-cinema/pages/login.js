import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


// SKELETON CODE

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectMessage, setIncorrectMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(0);
  const router = useRouter();

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
        } else {
          setIncorrectMessage("Username or password is incorrect.");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };


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
              <a><input type="text" placeholder="Enter your email address" onChange={(val) => setEmail(val.target.value)}></input></a><br />
              <p>Password</p>
              <a><input type="password" placeholder="Enter your password" onChange={(val) => setPassword(val.target.value)}></input></a><br />
              <div id="remember-me-div">
                <input name="remember-me" type="checkbox" onChange={handleCheckbox} />
                <label htmlFor="remember-me">Remember Me</label>
              </div>
              <button type="submit">Sign-In</button>

            </form>
            <h3 id="incorrect-credentials" style={{ color: 'red', position: 'absolute' }}>{incorrectMessage}</h3>
            <p id="forgotpassword"><a href="something">Forgot your password?</a></p>

          </div>

          <div id="footer">
            <p id="inline">Don't have an account?</p> <a href="/registration">Create one here.</a>
          </div>
        </main>

      </body>

      <footer>

      </footer>

      {
        /*   
        <style jsx>{`
               .container {
                 min-height: 100vh;
                 padding: 0 0.5rem;
                 display: flex;
                 flex-direction: column;
                 justify-content: center;
                 align-items: center;
               }
       
               main {
                 padding: 5rem 0;
                 flex: 1;
                 display: flex;
                 flex-direction: column;
                 justify-content: center;
                 align-items: center;
               }
       
               footer {
                 width: 100%;
                 height: 100px;
                 border-top: 1px solid #eaeaea;
                 display: flex;
                 justify-content: center;
                 align-items: center;
               }
       
               footer img {
                 margin-left: 0.5rem;
               }
       
               footer a {
                 display: flex;
                 justify-content: center;
                 align-items: center;
               }
       
               a {
                 color: inherit;
                 text-decoration: none;
               }
       
               .title a {
                 color: #0070f3;
                 text-decoration: none;
               }
       
               .title a:hover,
               .title a:focus,
               .title a:active {
                 text-decoration: underline;
               }
       
               .title {
                 margin: 0;
                 line-height: 1.15;
                 font-size: 4rem;
               }
       
               .title,
               .description {
                 text-align: center;
               }
       
               .description {
                 line-height: 1.5;
                 font-size: 1.5rem;
               }
       
               code {
                 background: #fafafa;
                 border-radius: 5px;
                 padding: 0.75rem;
                 font-size: 1.1rem;
                 font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                   DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
               }
       
               .grid {
                 display: flex;
                 align-items: center;
                 justify-content: center;
                 flex-wrap: wrap;
       
                 max-width: 800px;
                 margin-top: 3rem;
               }
       
               .card {
                 margin: 1rem;
                 flex-basis: 45%;
                 padding: 1.5rem;
                 text-align: left;
                 color: inherit;
                 text-decoration: none;
                 border: 1px solid #eaeaea;
                 border-radius: 10px;
                 transition: color 0.15s ease, border-color 0.15s ease;
               }
       
               .card:hover,
               .card:focus,
               .card:active {
                 color: #0070f3;
                 border-color: #0070f3;
               }
       
               .card h3 {
                 margin: 0 0 1rem 0;
                 font-size: 1.5rem;
               }
       
               .card p {
                 margin: 0;
                 font-size: 1.25rem;
                 line-height: 1.5;
               }
       
               .logo {
                 height: 1em;
               }
       
               @media (max-width: 600px) {
                 .grid {
                   width: 100%;
                   flex-direction: column;
                 }
               }
             `}</style>
        */
      }


    </div>
  )
}
