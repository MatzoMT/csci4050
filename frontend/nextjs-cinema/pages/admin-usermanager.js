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
  const [users, setUsers] = useState([]);



  const editUser = (userId) => {
    router.push({
      pathname: '/admin-userinfo',
      query: { "userId": userId },
    })
  }



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


      axios.post("http://localhost:8000/api/v1/get-users-and-ids",
      { email: window.sessionStorage.getItem("email") }).then((response) => {
        if (response.data.requestSuccess == "true") {
          //console.log(response.data.users);
          let userArray = [];
            for (const element of response.data.users) {
              //console.log(element.id)
              let color = "";
              if (element.accType == "admin") {
                color = "#bf9f37"
              } else if (element.accType == "active") {
                color = "black"
              } else if (element.accType == "inactive") {
                color = "gray"
              } else if (element.accType == "suspended") {
                color = "#9e1610"
              }
              console.log(color)
              userArray.push(<tr>
                <td><div></div><a style={{
                  borderColor: "black",
                  borderWidth: 3,
                  color: color, 
                  textShadowColor: 'black', 
                  textShadowRadius: 10, 
                  fontWeight: '800'
                  } } onClick={() => editUser(element.id)}>{element.email}</a></td>
              </tr>)
            }
            setUsers(userArray)

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
            <br></br>
            <h1>Users</h1>
            <table>
              <tr>
                <th>Email</th>
              </tr>
              {users}
            </table>
          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}
