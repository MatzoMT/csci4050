import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import CurrentlyShowingMovies from '../static/currently-showing.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import whiplash from '../images/whiplash.jpeg';
import granTorino from '../images/grantorino.jpg';
import granTorinoBanner from '../images/granTorinoBanner.jpg';
import Footer from '../components/Footer.js';
import React, { useState, useEffect, useCallback } from 'react';


export default function Home() {
  const [titleFilter, setTitleFilter] = useState("");

  // HARD CODE
  const currentlyShowingMovies = [
    { "title": "Gran Torino" },
    { "title": "The Grand Budapest Hotel" },
    { "title": "Isle of Dogs" },
    { "title": "Whiplash" }
    // {"title": "TITLE", }
  ];

  const onClick = useEffect((a, b) => {
    // do something with a, b and props.x
  }, [currentlyShowingMovies]);


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
          <div id="movies-view">
            <div id="filters-column">
              <h1>Filter By</h1>
              <h2>TITLE</h2>
              <a><input type="text" placeholder="Title..." id="filter-searchbar" onChange={(val) => setTitleFilter(val.target.value)}></input></a>
              <h2>RATING</h2>
              <input className="filter-checkbox" type="checkbox" id="g-rating" name="g" value="G"></input>
              <label for="g">G</label><br></br>
              <input className="filter-checkbox" type="checkbox" id="pg-rating" name="pg" value="PG"></input>
              <label for="pg">PG</label><br></br>
              <input className="filter-checkbox" type="checkbox" id="pg-13-rating" name="pg-13" value="PG-13"></input>
              <label for="pg-13">PG-13</label><br></br>
              <input className="filter-checkbox" type="checkbox" id="r-rating" name="r" value="R"></input>
              <label for="r">R</label><br></br>
              <h2>GENRE</h2>
              <input className="filter-checkbox" type="checkbox" id="animation" name="animation" value="Animation"></input>
              <label for="animation">Animation</label><br></br>
              <input className="filter-checkbox" type="checkbox" id="comedy" name="comedy" value="Comedy"></input>
              <label for="comedy">Comedy</label><br></br>
              <input className="filter-checkbox" type="checkbox" id="drama" name="drama" value="Drama"></input>
              <label for="drama">Drama</label><br></br>
              <input className="filter-checkbox" type="checkbox" id="horror" name="horror" value="Horror"></input>
              <label for="horror">Horror</label><br></br>
            </div>
            <div id="movies-column">
             <h1>{titleFilter}</h1>
              {
                currentlyShowingMovies.filter(movie => movie["title"].toLowerCase().includes(titleFilter)).map((filteredMovie) =>
                  <div>
                    <h1>{filteredMovie["title"]}</h1>
                  </div>
                 )}
              <h1>Currently Showing</h1>
              <div id="currently-showing-movies">

                <div className="image-wrapper">
                  <Image src={isleOfDogs} layout="responsive" sizes="50vw" />
                  <h2>Isle of Dogs</h2>
                </div>

                <div className="image-wrapper">
                  <Image src={granTorino} />
                  <h2>Gran Torino</h2>
                </div>

              </div>
              <div id="coming-soon-section">
                <h1>Coming Soon</h1>
                <div id="coming-soon-movies">
                  <div className="image-wrapper">
                    <Image src={whiplash} />
                    <h2>Whiplash</h2>
                  </div>
                </div>
              </div>
            </div>


          </div>





        </main>
      </body>

      <footer>

      </footer>


    </div>
  )
}
