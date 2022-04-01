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
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [apples, setApples] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [promotion, setPromotion] = useState(0);

  const [incorrectPasswordMessage, setIncorrectPasswordMessage] = useState("");
  
  const [incorrectInfoMessage, setIncorrectInfoMessage] = useState("");

  const [incorrectPaymentMessage, setIncorrectPaymentMessage] = useState("");

  let defaultCheckVal = "on"



  useEffect(async () => {
    try {
      axios.post("http://localhost:8000/api/v1/get-user-information",
        { email: window.sessionStorage.getItem("email") }).then((response) => {
          if (response.data.requestSuccess == "true") {
            setEmail(response.data.email);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            //console.log(response.data.phone);
            setPhone(response.data.phone);
            console.log("checking: " + response.data.promotion);
            
            if (response.data.promotion == true) {
              console.log("setting to true")
              setPromotion(1);
            } else {
              console.log("setting to false")
              setPromotion(0);
            }

            
            //handleCheckbox();
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
        if (response.data.isSuccessful == "true") {
          // setApples(response.data.list.);
          for (const element of response.data.list) {
            cardArray.push(<PaymentInfoCard lastDigits={element.lastDigits} number={element.cardNumber} address={element.billingAddress} type={element.cardType} expiry={element.expirationDate} />);
          }
        }

      });
    setCards(cardArray);

  }, []);




  let handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/v1/create-payment", { cardType: cardType, cardNumber: cardNumber, email: email, billingAddress: billingAddress, expirationDate: expirationDate }).then((response) => {
      //alert("You have successfully added a payment type to your account.")
      if (response.data.success == "false") {
        setIncorrectPaymentMessage(response.data.errMsg);
        
      } else {
        setIncorrectPaymentMessage("Successfully added payment method.");
        router.reload()
      }
    
    })

    
  };



  //NOT THE SAME AS RESET PASSWORD - CHANGE THIS
  let handleUpdatePassword = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/v1/change-password",{ email: email,currentPassword: currentPassword, newPassword: newPassword, confirmNewPassword: confirmNewPassword}).then((response) => {
    console.log(response.data.changeSuccess)  
    if (response.data.changeSuccess == "false") { 
        setIncorrectPasswordMessage(response.data.errMsg);
      } else {
        setIncorrectPasswordMessage("Successfully changed your password.");
        console.log(response.data.errMsg)

      }
    })
  };

  let handleUpdateUser = async (e) => {
    //console.log("handling")
    //alert("hello")
    e.preventDefault();
    axios.post("http://localhost:8000/api/v1/edit-profile", { email: email, firstName: firstName, lastName: lastName, phone: phone, promotion: promotion }).then((response) => {
      if (response.data.changeSuccess == "false") { 
        setIncorrectInfoMessage(response.data.errMsg);
      } else {
        setIncorrectInfoMessage("Successfully updated your info.");
      }
    })
  }

  let handleCheckbox = async (e) => {
    if (promotion == 0) {
      setPromotion(1);
    } else {
      setPromotion(0);
    }
  };


  function addRow(e) {
    axios.post("http://localhost:8000/api/v1/get-cards",
      { email: window.sessionStorage.getItem("email") }).then((response) => {
        /*

            "cardType": "D",
    "cardNumber": "3141321434",
    "email": "spiderman@email.com",
    "billingAddress": "citadel",
    "expirationDate": "2020-09-12"
    */
      });

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
            <form onSubmit={handleUpdateUser}>
              
              <h1>Update your Information</h1>
              <h3>Profile Info</h3>
              <p>First Name</p>
              <a><input type="text" placeholder="Enter new first name" defaultValue={firstName} onChange={(val) => setFirstName(val.target.value)}></input></a>
              <p>Last Name</p>
              <a><input type="text" placeholder="Enter new last name" defaultValue={lastName} onChange={(val) => setLastName(val.target.value)}></input></a>
              {/*<p>Age</p>
              <a><input type="text" placeholder="Enter your new age" defaultValue="37"></input></a>*/}
              <p>Phone Number</p>
              <a><input type="text" placeholder="Enter new phone number" defaultValue={phone} onChange={(val) => setPhone(val.target.value)}></input></a>
              <p>Subscribe to Promotions</p>
              <input type="checkbox"  checked={promotion} onChange={handleCheckbox} />




              <h3 id="incorrect-credentials" style={{color: 'red'}}>{incorrectInfoMessage}</h3>
              <button type="submit">Update account information</button>
            </form>
            <form onSubmit={handleUpdatePassword}>
            <h3>Change your password</h3>
                <p>Current Password</p>
                <a><input type="password" placeholder="Current Password" onChange={(val) => setCurrentPassword(val.target.value)}></input></a>
                <p>New Password</p>
                <a><input type="password" placeholder="Enter a new password" onChange={(val) => setNewPassword(val.target.value)}></input></a>
                <p>Confirm New Password</p>
                <a><input type="password" placeholder="Re-enter the new password" onChange={(val) => setConfirmNewPassword(val.target.value)}></input></a>
                <h3 id="incorrect-credentials" style={{color: 'red'}}>{incorrectPasswordMessage}</h3>
                <button type="submit">Change password</button>
            </form>

            <h3>Payment Information</h3>
            {/*<p>Credit Card Information</p>
            <a><input type="text" placeholder="Credit card number"></input></a><br />
            <a><input type="text" placeholder="Card holder's name"></input></a><br />
            <a><input type="text" placeholder="CVV"></input></a><br />
            <a><input type="text" placeholder="Expiration date"></input></a><br />*/}
            <table id="cardtable">
              <th>Last 4 Digits of Card</th>
              <th>Type</th>
              <th>Expiration Date</th>
              <th>Address</th>
              <th></th>
              {cards}
            </table>

            <p>New Payment Method</p>
            <form onSubmit={handleSubmit}>
              <a><input type="text" name="card-type" placeholder="D or C" onChange={(val) => setCardType(val.target.value)}></input></a><br></br>
              <a><input type="text" name="card-number" placeholder="Card Number" onChange={(val) => setCardNumber(val.target.value)}></input></a><br></br>
              <a><input type="text" name="billing-address" placeholder="Billing Address" onChange={(val) => setBillingAddress(val.target.value)}></input></a><br></br>
              <a><input type="text" name="expiration-date" placeholder="Expiration Date YYYY-MM-DD" onChange={(val) => setExpirationDate(val.target.value)}></input></a><br></br>
              <h3 id="incorrect-credentials" style={{color: 'red'}}>{incorrectPaymentMessage}</h3>
              <button type="submit">Add Payment Method</button>
            </form>
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
