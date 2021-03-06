import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import CurrentlyShowingMovies from '../static/currently-showing.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import whiplash from '../images/whiplash.jpeg';
import granTorino from '../images/grantorino.jpg';
import granTorinoBanner from '../images/granTorinoBanner.jpg';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


export default function Home() {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState([]);
  const router = useRouter();


  const showMovie = (movie) => {
    //router.query.movie = movie["title"].toLowerCase().replaceAll(' ', '-');
    //router.push('/view-movie');
    router.push({
      pathname: '/view-movie',
      query: { "movieID": movie["id"] },
    })

  }

  useEffect(async () => {
    await axios.get("http://localhost:8000/api/v1/get-currently-showing-movies").then((response) => {
      let responseCopy = response["data"]["list"];
      for (let i = 0; i < responseCopy.length; i++) {
        responseCopy[i]["imageSource"] = require("../images/" + responseCopy[i]["imageSource"]);
      }
      setCurrentlyShowingMovies(responseCopy);
      console.log(responseCopy);

    });

    await axios.get("http://localhost:8000/api/v1/get-coming-soon-movies").then((response) => {
      let responseCopy = response["data"]["list"];
      for (let i = 0; i < responseCopy.length; i++) {
        responseCopy[i]["imageSource"] = require("../images/" + responseCopy[i]["imageSource"]);
      }
      setComingSoonMovies(responseCopy);

    });
  }, [])

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

          <h1 id="title">FilmMax</h1>
          <h1 id="subtitle">Your destination for the best movie experience.</h1>
          <div id="currently-showing-section">
            <h1>Currently Showing</h1>
            <div id="currently-showing-movies">
              {currentlyShowingMovies.map((filteredMovie) =>
                <div className={`image-wrapper ${filteredMovie["rating"]}`} onClick={() => showMovie(filteredMovie)}>

                  <Image src={filteredMovie["imageSource"]} height={300} width={200} />
                  <h4>{filteredMovie["title"]}</h4>

                  <p className="image-wrapper-rating">{filteredMovie["rating"]}</p>
                </div>)}
            </div>
          </div>


          {/*<div id="coming-soon-section">
            <h1>Coming Soon</h1>
            <div id="coming-soon-movies">
              <div className="image-wrapper">
                <Image src={whiplash} />
                <h2>Whiplash</h2>
              </div>
            </div>
          </div>*/}



          <div id="feature-div">
            <div id="feature-section" onLoad={() => alert("this is running")}>
              <div id="featured">
                <div id="event-container">
                  <ul id="event-list"></ul>
                </div>
              </div>
            </div>
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
