import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image'
import CurrentlyShowingMovies from '../static/currently-showing.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import whiplash from '../images/whiplash.jpeg';
import AdminNavBar from '../components/AdminNavBar.js';


// ---THE TABLES---
//movies table (movie_id, movie_name, movie_rating, movie_genre, movie_director, movie_description, movie_trailer, movie_status)
//showtimes table - IMPORTANT (movie_id, showtime) //id is not displayed to admin, as it is simply backend. used to get the movie name when managing showtimes
      //(showtimes and movies are linked by movie_id)
//users table (stuff)
//promotions table (promotion_id, promotion_code, promotion_discount, promotion_expiry)
//probably want to make each table "item" its own element for cleanliness?? idk

export default function AdminHome() {
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
            <h1>Movies</h1>
            <button type="button">Add new movie</button> 
            <table className="table">
              <tr>
                <th/>
                <th>Name</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Director</th>
                <th>Description</th>
                <th>Trailer</th>
                <th>Status</th>
              </tr>
              <tr>
                <td><button>Manage Movie</button></td>
                <td>Gran Torino</td>
                <td>Drama</td>
                <td>R</td>
                <td>Clint Eastwood</td>
                <td>Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.</td>
                <td>https://www.youtube.com/embed/RMhbr2XQblk</td>
                <td>COMING SOON</td>
              </tr>
              <tr>
              <td><button>Manage Movie</button></td>
                <td>Isle of Dogs</td>
                <td>Comedy, Adventure</td>
                <td>PG-13</td>
                <td>Wes Anderson</td>
                <td>Set in Japan, Isle of Dogs follows a boy's odyssey in search of his lost dog.</td>
                <td>https://www.youtube.com/embed/dt__kig8PVU?&autoplay=1</td>
                <td>BOOK TICKETS</td>
              </tr>
              <tr>
              <td><button>Manage Movie</button></td>
                <td>Whiplash</td>
                <td>Drama</td>
                <td>R</td>
                <td>Damien Chazelle</td>
                <td>A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.</td>
                <td>https://www.youtube.com/embed/7d_jQycdQGo?&autoplay=1</td>
                <td>COMING SOON</td>
              </tr>
            </table>



            <h1>Now Showing</h1>
            <button type="button">Add new showtime</button> 
            <table>
              <tr>
              <th/>
                <th>Name</th>
                <th>Date</th>
                <th>Showtime</th>
              </tr>
              <tr>
                <td><button>Manage Showtime</button></td>
                <td>Isle of Dogs</td>
                <td>2-23-2022</td>
                <td>18:00</td>
              </tr>
            </table>
            

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