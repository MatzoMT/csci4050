import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PaymentInfoCard from '../components/PaymentInfoCard.js'



// SKELETON CODE

export default function Home() {

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const [stuff, setStuff] = useState([]);
  const [apples, setApples] = useState("");



  // let cardTable;
  // if (typeof window !== "undefined") {
  //   cardTable = document.getElementById("cardtable");
  //   console.log(cardTable.children.length);
  //   let userCardCount = 3; //replace later
  //   //
  //   for (let i = 0; i < userCardCount; i++) {
  //     //cardTable.push();
  //   }
  // }





  useEffect(async () => {
    try {
      axios.post("http://localhost:8000/api/v1/get-user-information",
        { email: window.sessionStorage.getItem("email") }).then((response) => {
          if (response.data.requestSuccess == "true") {
            setEmail(response.data.email);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
          } else {
            router.push('/login');
          }
        });
    } catch (err) {
      router.push('/login');
    }
    const cardArray = [];
    await axios.post("http://localhost:8000/api/v1/get-cards",
      { email: window.sessionStorage.getItem("email") }).then((response) => {
        console.log(response.data.list)
        
        // setApples(response.data.list.);
        for (const element of response.data.list) {
          cardArray.push(<PaymentInfoCard number={element.cardNumber} address={element.billingAddress} type={element.cardType} expiry={element.expirationDate} />);
        }
      });
      setStuff(cardArray);

  }, []);




  function addRow(e) {

    console.log(stuff.length)
    stuff.push(<PaymentInfoCard number="" email="" type="" address="" expiry="" />);
    stuff.push(<h1>dsfasdfas</h1>);
  }

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

          <div id="editprofile">



            <h1>Edit your profile</h1>
            <p>First Name</p>
            <a><input type="text" placeholder="Enter new first name" defaultValue={firstName}></input></a>
            <p>Last Name</p>
            <a><input type="text" placeholder="Enter new last name" defaultValue={lastName}></input></a>
            {/*<p>Age</p>
              <a><input type="text" placeholder="Enter your new age" defaultValue="37"></input></a>*/}
            <p>Email Address</p>
            <a><input type="text" placeholder="Enter new email" defaultValue={email}></input></a>
            <p>Password</p>
            <a><input type="text" placeholder="Enter a new password" ></input></a>
            <p>Confirm Password</p>
            <a><input type="text" placeholder="Re-enter the new password"></input></a>
            {/*<p>Credit Card Information</p>
            <a><input type="text" placeholder="Credit card number"></input></a><br />
            <a><input type="text" placeholder="Card holder's name"></input></a><br />
            <a><input type="text" placeholder="CVV"></input></a><br />
            <a><input type="text" placeholder="Expiration date"></input></a><br />*/}
            <table id="cardtable">
              <th>Card Number</th>
              <th>Type</th>
              <th>Expiration Date</th>
              <th>Address</th>
              <th></th>
              {stuff}
              {apples}
            </table>
            <h1>
            </h1>
            <button type="button" onClick={addRow}>Add Row</button>
            <button type="button">Update account information</button>
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
