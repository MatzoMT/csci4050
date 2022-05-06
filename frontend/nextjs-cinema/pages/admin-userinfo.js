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

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function AdminHome() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(0);
  const [promotion, setPromotion] = useState(0);
  const [userType, setUserType] = useState(0);
  const [incorrectInfoMessage, setIncorrectInfoMessage] = useState("");

  const editUser = (userId) => {
    console.log("huh?")
    router.push({
      pathname: '/user-info',
      query: { "userId": userId },
    })
  }

  let handlePromoCheckbox = async (e) => {
    if (promotion == 0) {
      setPromotion(1);
    } else {
      setPromotion(0);
    }
  };

  let handleStatusCheckbox = async (e) => {
    console.log(status);
    
    if (status == 0) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  };


  let handleAdminCheckbox = async (e) => {
    console.log(userType)
    if (userType == 0) {
      setUserType(1);
    } else {
      setUserType(0);
    }
  };


  let handleUpdateUser = async (e) => {
    //console.log("handling")
    //alert("hello")
    e.preventDefault();

    

    if (userType == 1 && status == 1) {
      setIncorrectInfoMessage("Admin users cannot be suspended.")
      return;
    } else {
      setIncorrectInfoMessage("")
    }
    //leaving empty means password stays the same
    if (password.length > 0 && password.length < 8) {
      setIncorrectInfoMessage("The new password is not long enough.")
      return;
    } else {
      setIncorrectInfoMessage("")
    }

    //cannot set own account to non-admin
    if (email == userEmail && userType == 0) {
      setIncorrectInfoMessage("Admin users cannot set themselves as non-admins.")
      return;
    } else {
      setIncorrectInfoMessage("")
    }


    console.log("OK!")
    let statusString = (status == 1) ? "Suspended" : "Active";
    let actualUserType = userType + 1;
    axios.post("http://localhost:8000/api/v1/update-user", { email: userEmail, firstName: firstName, lastName: lastName, password: password, userType: actualUserType, phone: phone, promotion: promotion, status: statusString }).then((response) => {
      if (response.data.changeSuccess == "true") { 
        setIncorrectInfoMessage("Successfully updated user info.");
      } else {
        setIncorrectInfoMessage("Something went wrong.");
      }
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


      axios.post("http://localhost:8000/api/v1/get-user-by-id",
      { "id": router.query.userId }).then((response) => {
        if (response.data.requestSuccess == "true") {
          //console.log(response.data.users);
          console.log(response.data)
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setPhone(response.data.phone);
          setUserEmail(response.data.email);
         
          if (response.data.promotion == true) {
            setPromotion(1);
          } else {
            setPromotion(0);
          }

          if (response.data.userType == 2) {
            setUserType(1);
          } else {
            setUserType(0);
          }
          
          if (response.data.status == "Active" || response.data.status == "Inactive") {
            setStatus(0);
          } else {
            setStatus(1);
          }
          console.log(status)
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
            <form onSubmit={handleUpdateUser}>
              
              <h1>Update User Information</h1>
              <h3>Account information for {userEmail}</h3>
              <p>User First Name</p>
              <a><input type="text" placeholder="Enter new first name" defaultValue={firstName} onChange={(val) => setFirstName(val.target.value)}></input></a>
              <p>User Last Name</p>
              <a><input type="text" placeholder="Enter new last name" defaultValue={lastName} onChange={(val) => setLastName(val.target.value)}></input></a>
              <p>User Password</p>
              <a><input type="password" placeholder="Enter a new password" onChange={(val) => setPassword(val.target.value)}></input></a>
              <p>User Phone Number</p>
              <a><input type="text" placeholder="Enter new phone number" defaultValue={phone} onChange={(val) => setPhone(val.target.value)}></input></a>
              <p>User Promotions Status</p>
              <input type="checkbox"  checked={promotion} onChange={handlePromoCheckbox}/>
              <p>User Admin Status</p>
              <input type="checkbox"  checked={userType} onChange={handleAdminCheckbox}/>

              <p style={{color: 'red'}}>Suspend User?</p>
              <input type="checkbox"  checked={status} onChange={handleStatusCheckbox}/>


              <h3 id="incorrect-credentials" style={{color: 'red'}}>{incorrectInfoMessage}</h3>
              <button type="submit">Update account information</button>
            </form>         
          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}
