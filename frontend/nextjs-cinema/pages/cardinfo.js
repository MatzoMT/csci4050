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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(0);
  const [userType, setUserType] = useState(0);
  const [incorrectInfoMessage, setIncorrectInfoMessage] = useState("");
  const [cardType, setCardType] = useState("D");
  const [cardNumber, setCardNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("")
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [promotion, setPromotion] = useState(0);
  const [lastDigits, setLastDigits] = useState("");
  const [cvv, setCvv] = useState("");


  const editUser = (userId) => {
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


  const onlyNumbers = e => {
    e.target.value = e.target.value.replace(/\D/g, '')
  }

  let handleUpdateCard = async (e) => {
    //console.log("handling")
    //alert("hello")
    e.preventDefault();

    if (billingAddress == "") {
      setIncorrectInfoMessage("Billing address cannot be empty.")
      return;
    } else {
      setIncorrectInfoMessage("")
    }

    console.log(cvv.length)
    if (cardNumber.length != 16) {
      if (cardNumber.length != 0) {
        setIncorrectInfoMessage("Card number must be empty or 16 characters.")
        return;
      }

    } else {
      setIncorrectInfoMessage("")
    }

    if (cvv.length != 3) {
      if (cvv.length != 0) {
      setIncorrectInfoMessage("CVV must be empty or 16 characters.")
      return;
    }
    } else {
      setIncorrectInfoMessage("")
    }

    console.log("OK!")
    const formdate = expirationDate.toLocaleDateString('en-CA', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    axios.post("http://localhost:8000/api/v1/update-payment", { email: email, lastDigits: lastDigits, cardType: cardType, cardNumber: cardNumber, billingAddress: billingAddress, expirationDate: formdate, cvv: cvv }).then((response) => {
      if (response.data.isSuccessful == "true") { 
        setIncorrectInfoMessage("Successfully updated card info.");
      } else {
        setIncorrectInfoMessage("Something went wrong.");
      }
    })
  }


  useEffect(async () => {
    await axios.post("http://localhost:8000/api/v1/get-user-information",
      { email: window.sessionStorage.getItem("email") }).then((response) => {
        if (response.data.requestSuccess == "true") {
          setEmail(window.sessionStorage.getItem("email"));

          axios.post("http://localhost:8000/api/v1/get-card-info-by-last4",
          { "last_digits": router.query.lastDigits, "email": window.sessionStorage.getItem("email") }).then((response) => {
            if (response.data.isSuccessful == "true") {
              let card = response.data.card;
              console.log(card)
              setCardType(card.cardType)
              setBillingAddress(card.billingAddress)
              setExpirationDate(new Date(card.expirationDate))
              setLastDigits(card.lastDigits);

            } 
          });
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
        <NavBar />
        <main >

          <div id="movie-manager-section">
            <br></br>
            <form onSubmit={handleUpdateCard}>
              
              <h1>Update Card Information</h1>
              <h3>Card ending in {userEmail}</h3>

              <select className="fields" id="rating" name="rating" value={cardType} onChange={(val) => {
                console.log(val.target.value)
                setCardType(val.target.value)
                }}>
                <option value="D">Debit</option>
                <option value="C">Credit</option>
              </select>
              
              <input onInput={onlyNumbers} className="fields" type="text" name="card-number" placeholder="Card Number" onChange={(val) => setCardNumber(val.target.value)}></input><br></br>
              <input className="fields" type="text" name="billing-address" placeholder="Billing Address" defaultValue={billingAddress} onChange={(val) => setBillingAddress(val.target.value)}></input><br></br>
              <DatePicker minDate={new Date()} className='fields' selected={expirationDate} defaultValue={expirationDate} onChange={(date) => setExpirationDate(date)} /><br></br>
              <input onInput={onlyNumbers} className="fields" type="text" name="cvv" placeholder="CVV"  onChange={(val) => setCvv(val.target.value)}></input><br></br>
              <h3 id="incorrect-credentials" style={{color: 'red'}}>{incorrectInfoMessage}</h3>
              <button type="submit"><h3>Update card information</h3></button>
            </form>         
          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}
