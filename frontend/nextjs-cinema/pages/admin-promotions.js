import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image'
import CurrentlyShowingMovies from '../static/currently-showing.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import whiplash from '../images/whiplash.jpeg';
import AdminNavBar from '../components/AdminNavBar.js';
import Promotion from '../components/Promotion.js';
import React , {useState, useEffect} from 'react';
import axios from 'axios';
import {useRouter} from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ---THE TABLES---
//movies table (movie_id, movie_name, movie_rating, movie_genre, movie_director, movie_description, movie_trailer, movie_status)
//showtimes table - IMPORTANT (movie_id, showtime) //id is not displayed to admin, as it is simply backend. used to get the movie name when managing showtimes
      //(showtimes and movies are linked by movie_id)
//users table (stuff)
//promotions table (promotion_id, promotion_code, promotion_discount, promotion_expiry)
//probably want to make each table "item" its own element for cleanliness?? idk weewooweewooweewooweewooweewoo

export default function AdminHome() {
const router = useRouter();
let promotionArray = []
const [promotions, setPromotions] = useState([]);
const [promotionCode, setPromotionCode] = useState();
const [promotionDiscount, setPromotionDiscount] = useState();
const [promotionExpiration, setPromotionExpiration] = useState(new Date());
const [incorrectInfo, setIncorrectInfo] = useState(''); 
  useEffect(async () => {
    try {
      console.log('test')
      await axios.post("http://localhost:8000/api/v1/get-promotions",
        { email: window.sessionStorage.getItem("email") }).then((response) => {
          console.log(response.data.list)
          for (const element of response.data.list) {
            promotionArray.push(<Promotion promotionCode={element.promotionCode} promotionDiscount={element.promotionDiscount} promotionExpiration={element.promotionExpiration} />);
          }
        });
      setPromotions(promotionArray);
    } catch (err) {
      console.log(err);
    }
  }, []);
  function isInDesiredForm(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(promotionCode)
    if (promotionCode == "" || promotionCode == null) {
      setIncorrectInfo("You must provide a valid code");
      return;
    }
    if (promotionDiscount == "" || promotionDiscount == null || !isInDesiredForm(promotionDiscount)) {
      setIncorrectInfo("You must provide a valid discount");
      return;
    }
    setIncorrectInfo('Successfully added a promotion!')
    const formdate = promotionExpiration.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    await axios.post("http://localhost:8000/api/v1/create-promotion", { promotionCode: promotionCode, promotionDiscount: promotionDiscount, promotionExpiration: formdate }).then((response) => {
        router.reload()
    }) 
  };
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

            <h1>Hello AdminUser12345.</h1>
            <h2>You are currently logged in as an administrator.</h2>
            <h1>Promotions</h1>
            <table className="table">
              <tr>
                <th>Code</th>
                <th>Discount Amount</th>
                <th>Expiry Date</th>
              </tr>
              {promotions}
            </table>

            <form onSubmit={handleSubmit}>
              <h3 id="incorrect-credentials" style={{ color: 'red' }}>{incorrectInfo}</h3>
              <label for="promotion_code" className="field-label"><h3>Promotion Code</h3></label>
              <a><input type="text" className="fields" name="promotion_code" placeholder="Promo Code" onChange={(val) => setPromotionCode(val.target.value)} defaultValue={promotionCode}></input></a><br />
              <label for="promotion_discount" className="field-label"><h3>Promotion Discount</h3></label>
              <a><input type="text" className="fields" name="promotion_discount" placeholder="Enter discount percentage in percentage form" onChange={(val) => setPromotionDiscount(val.target.value)} defaultValue={promotionDiscount}></input></a><br />
              <label for="promotion_expiry" className="field-label"><h3>Promotion Expiration Date</h3></label>
              <a><DatePicker className='fields' selected={promotionExpiration} onChange={(date) => setPromotionExpiration(date)} /></a><br></br>
              <button type="submit">Add new promotion</button> 
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
