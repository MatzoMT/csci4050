import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image'
import CurrentlyShowingMovies from '../static/currently-showing.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import whiplash from '../images/whiplash.jpeg';
import AdminNavBar from '../components/AdminNavBar.js';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';



export default function AdminHome() {
  const [email, setEmail] = useState("");
  const router = useRouter();


  useEffect(async () => {
    axios.post("http://localhost:8000/api/v1/get-user-information",
      { email: window.sessionStorage.getItem("email") }).then((response) => {
        if (response.data.requestSuccess == "true" && response.data.isAdmin == "true") {
          setEmail(window.sessionStorage.getItem("email"));
          //handleCheckbox();
        } else if (response.data.requestSuccess == "true" && response.data.isAdmin == "false") {
          router.push('/');
        } else {
          router.push('/login');
        }
      });



  }, []);

  return (
    <div className="container">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="../static/currently-showing.js" />

      </Head>
      <body>
        <AdminNavBar />
        <main >

          <div id="movie-manager-section">

            <h1>Hello {email}.</h1>
            <h2>You are currently logged in as an administrator.</h2>
            <h1><a href="#">Manage and Schedule Movies</a></h1>
            <h1><a href="#">Manage Users</a></h1>
            <h1><a href="/admin-promotions">Manage Promotions</a></h1>



          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}
