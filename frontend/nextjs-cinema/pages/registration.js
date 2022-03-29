import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';





// SKELETON CODE

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [promotion, setPromotion] = useState(0);
  const router = useRouter();
  const [incorrectMessage, setIncorrectMessage] = useState("");

  /*
{
    "firstName": "Eman",
    "lastName": "saleh",
    "password": "password123",
    "email": "emansaleh@gmail.com",
    "phone": "1234567890",
    "promotion": 0 
}
  */

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post("http://localhost:8000/api/v1/create-user", { firstName: firstName, lastName: lastName, password: password, confirm_password: confirm_password, email: email, phone: phone, promotion: promotion }).then((response) => {
      console.log("response: " + response.data.creationSuccess)  
      
      if (response.data.creationSuccess == "true") { 
          router.push('/confirmation');
        } else {
          setIncorrectMessage(response.data.errMsg);
        }
      


      });
    } catch (err) {
      console.log(err);
    }
  };

  let handleCheckbox = async (e) => {
    if (promotion == 0) {
      setPromotion(1);
    } else {
      setPromotion(0);
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

          <div id="registration">
            <form onSubmit={handleSubmit}>
              <h1>Create an account</h1>
              <p>* - indicates a required field</p>
              <p>* First Name</p>
              <a><input type="text" placeholder="Enter your first name" onChange={(val) => setFirstName(val.target.value)}></input></a>
              <p>* Last Name</p>
              <a><input type="text" placeholder="Enter your last name" onChange={(val) => setLastName(val.target.value)}></input></a>
              <p>* Phone number</p>
              <a><input type="text" placeholder="Enter your phone number" onChange={(val) => setPhone(val.target.value)}></input></a>
              <p>* Email Address</p>
              <a><input type="text" placeholder="Enter your email address" onChange={(val) => setEmail(val.target.value)}></input></a>
              <p>* Password</p>
              <a><input type="password" placeholder="Enter a password" onChange={(val) => setPassword(val.target.value)}></input></a>
              <p>* Confirm Password</p>
              <a><input type="password" placeholder="Re-enter the password" onChange={(val) => setConfirmPassword(val.target.value)}></input></a>

              <p>Subscribe to Promotions</p>
              <input type="checkbox" onChange={handleCheckbox} />
              <button type="submit">Create your account</button>
            </form>
            <h3 id="incorrect-credentials" style={{color: 'red', position: 'absolute'}}>{incorrectMessage}</h3>
          </div>
          <div id="footer">
            <p id="inline">Already have an account?</p> <a href="/login">Sign in here.</a>
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