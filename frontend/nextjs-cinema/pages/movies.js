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
import theTerminal from '../images/theterminal.jpg';
import killBillVol1 from '../images/killBill.png';
import napoleonDynamite from '../images/napoleondynamite.jpeg';
import { Redirect } from 'react-router-dom';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';


// USE RATINGS AS CLASS NAMES
// CHANGE DIV DISPLAY DEPENDING ON WHICH CLASSES ARE SELECTED

export default function Home() {
  const [titleFilter, setTitleFilter] = useState("");

  const ratings = ['G', 'PG', 'PG-13', 'R'];
  const [GRating, setGRating] = useState(false);
  const [PGRating, setPGRating] = useState(false);
  const [PG13Rating, setPG13Rating] = useState(false);
  const [RRating, setRRating] = useState(false);
  const [currentlyShowingFilter, setCurrentlyShowingFilter] = useState(false);
  const [comingSoonFilter, setComingSoonFilter] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [ratingsState, setRatingsState] = useState(
    new Array(ratings.length)
    // ratings
  );
  /*
('1', 'COMEDY'), X
('2', 'HORROR'), X
('3', 'ACTION'),
('4', 'ADVENTURE'),
('5', 'ANIMATION'), X
('6', 'DRAMA'), X
('7', 'FANTASY'),
('8', 'HISTORICAL'),
('9', 'SCIENCE FICTION'),
('10', 'THRILLER'),
('11', 'WESTERN')
*/
  const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Comedy',
    'Drama',
    'Fantasy',
    'Historical',
    'Horror',
    'Science Fiction',
    'Thriller',
    'Western'
  ]


  const router = useRouter();


  const renderMovie = (movie) => {
    return <MovieView />
  }

  const handleGRating = (event) => {
    let gMovies = document.getElementsByClassName('G');
    if (event.target.checked == false) {
      setGRating(false);
      /*for (let i = 0; i < gMovies.length; i++) {
        gMovies[i].style.display = "none";
      }*/
    } else {
      setGRating(true);
      /*for (let i = 0; i < gMovies.length; i++) {
        gMovies[i].style.display = "block";
      }*/
    }
  }
  const handlePGRating = (event) => {
    let pgMovies = document.getElementsByClassName('PG');
    if (event.target.checked == false) {
      setPGRating(false);
      /*
      for (let i = 0; i < pgMovies.length; i++) {
        pgMovies[i].style.display = "none";
      }*/
    } else {
      setPGRating(true);
      /*
      for (let i = 0; i < gMovies.length; i++) {
        pgMovies[i].style.display = "block";
      }*/
    }
  }
  const handlePG13Rating = (event) => {
    if (event.target.checked == false) {
      setPG13Rating(false);
    } else {
      setPG13Rating(true);
    }
  }
  const handleRRating = (event) => {
    let rMovies = document.getElementsByClassName('R');
    if (event.target.checked == false) {
      setRRating(false);
      /*for (let i = 0; i < rMovies.length; i++) {
        rMovies[i].style.display = "none";
      }*/
    } else {
      setRRating(true);/*
      for (let i = 0; i < rMovies.length; i++) {
        rMovies[i].style.display = "block";
      }*/
    }
  }
  const handleCurrentlyShowing = (event) => {

    if (event.target.checked == false) {
      setCurrentlyShowingFilter(false);
    } else {
      setCurrentlyShowingFilter(true);
    }
  }

  const handleComingSoon = (event) => {
    if (event.target.checked == false) {
      setComingSoonFilter(false);
    } else {
      setComingSoonFilter(true);
    }
  }

  const showMovie = (movie) => {
    //router.query.movie = movie["title"].toLowerCase().replaceAll(' ', '-');
    //router.push('/view-movie');
    router.push({
      pathname: '/view-movie',
      query: { "movieID": movie["movieID"] },
    })

  }

  // HARD CODE
  // IMPORTANT! React does not like dynamic url for Image component
  // Solution: change each image to require('source') after getting movies
  const currentlyShowingMovies = [
    { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood", "genre": "" },
    { "movieID": 2, "title": "Isle of Dogs", "imageSource": require("../images/isleofdogs.jpg"), "rating": "PG-13", "videoLink": "https://www.youtube.com/embed/dt__kig8PVU?&autoplay=1", "description": "Set in Japan, Isle of Dogs follows a boy's odyssey in search of his lost dog.", "director": "Wes Anderson" },
    { "movieID": 3, "title": "Whiplash", "imageSource": require("../images/whiplash.jpeg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/7d_jQycdQGo?&autoplay=1", "description": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.", "director": "Damien Chazelle" },
    { "movieID": 4, "title": "The Terminal", "imageSource": require("../images/theterminal.jpg"), "rating": "PG-13", "videoLink": "https://www.youtube.com/embed/iZqQRmhRvyg?&autoplay=1" },
  ];

  const movieGenres = [
    { "movieID": 1, "genre": "Drama"},
    { "movieID": 2, "genre": "Animation"},
    { "movieID": 2, "genre": "Adventure"},
    { "movieID": 2, "genre": "Drama"},
    { "movieID": 2, "genre": "Science Fiction"},
    { "movieID": 2, "genre": "Comedy"}
  ]

  const comingSoonMovies = [
    { "movieID": 5, "title": "Kill Bill Vol. 1", "imageSource": require("../images/killBill.png"), "rating": "R", "videoLink": "https://www.youtube.com/embed/c_dNIXwrbzY?&autoplay=1" },
    { "movieID": 6, "title": "Napoleon Dynamite", "imageSource": require("../images/napoleondynamite.jpeg"), "rating": "PG", "videoLink": "https://www.youtube.com/embed/ZHDi_AnqwN4?&autoplay=1" }
  ]

  const addGenre = (genre, event) => {
    
    if (event.target.checked == true) {
      setGenreList(genreList => [...genreList, genre]);
    } else {
      setGenreList(genreList.filter(oldGenre => oldGenre !== genre))
     // const index = genreList.indexOf(genre);
     // genreList.splice(index, 1); // 2nd parameter means remove one item only
    }

  //  console.log(genreList);
  }

  const movieInGenre = (movieID, genreList) => {
    console.log(genreList);
    if (genreList.length == 0) {
      return true;
    }
    for (let i = 0; i < movieGenres.length; i++) {
      if (movieGenres[i]["movieID"] == movieID && genreList.indexOf(movieGenres[i]["genre"].toLowerCase()) !== -1) {
        return true;
      }
    }
    return false;
  }

  const currentlyShowingMoviesFilter = currentlyShowingMovies.filter(movie =>
    movie["title"].toLowerCase().includes(titleFilter) && ((GRating == false && PGRating == false && PG13Rating == false && RRating == false) ||
      (movie["rating"] == "G" && GRating == true) || (movie["rating"] == "PG" && PGRating == true) || (movie["rating"] == "PG-13" && PG13Rating == true) || (movie["rating"] == "R" && RRating == true))
    && ((currentlyShowingFilter == false && comingSoonFilter == false) || (currentlyShowingFilter == true))
    && (movieInGenre(movie["movieID"], genreList) == true)
  );
  // movie rating includes rating && rating !== false (rating is NOT undefined)

  const comingSoonMoviesFilter = comingSoonMovies.filter(movie =>
    movie["title"].toLowerCase().includes(titleFilter) && ((GRating == false && PGRating == false && PG13Rating == false && RRating == false) ||
      (movie["rating"] == "G" && GRating == true) || (movie["rating"] == "PG" && PGRating == true) || (movie["rating"] == "PG-13" && PG13Rating == true) || (movie["rating"] == "R" && RRating == true))
    && ((comingSoonFilter == false && currentlyShowingFilter == false) || (comingSoonFilter == true))
  );

  const onClick = useEffect((a, b) => {
    // do something with a, b and props.x
  }, [currentlyShowingMovies]);

  useEffect(() => {

  }, [genreList])


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
              <h2>SCREENING</h2>
              <input className="filter-checkbox" type="checkbox" name="currently-showing" value="currently-showing" onChange={(e) => handleCurrentlyShowing(e)}></input>
              <label for="currently-showing">Currently Showing</label><br></br>
              <input className="filter-checkbox" type="checkbox" name="coming-soon" value="coming-soon" onChange={(e) => handleComingSoon(e)}></input>
              <label for="coming-soon">Coming Soon</label><br></br>
              <h2>RATING</h2>
              <input className="filter-checkbox" type="checkbox" name="g" value="G" onChange={(e) => handleGRating(e)}></input>
              <label for="g">G</label><br></br>
              <input className="filter-checkbox" type="checkbox" name="pg" value="PG" onChange={(e) => handlePGRating(e)}></input>
              <label for="pg">PG</label><br></br>
              <input className="filter-checkbox" type="checkbox" name="pg-13" value="PG-13" onChange={(e) => handlePG13Rating(e)}></input>
              <label for="pg-13">PG-13</label><br></br>
              <input className="filter-checkbox" type="checkbox" name="r" value="R" onChange={(e) => handleRRating(e)}></input>
              <label for="r">R</label><br></br>
              <h2>GENRE</h2>

              {
                genres.map((genre) =>
                  <div>
                    <input className="filter-checkbox" type="checkbox" id={genre.toLowerCase()} name={genre.toLowerCase()} value={genre.toLowerCase()} onChange={(e) => addGenre(genre.toLocaleLowerCase(), e)}></input>
                    <label for={genre.toLowerCase()}>{genre}</label><br></br>

                  </div>
                )
              }
            </div>
            <div id="movies-column">
              {comingSoonFilter == false || (comingSoonFilter == true && currentlyShowingFilter == true) ? <h1>Currently Showing</h1> : <h1>Adjust filter to view currently showing movies.</h1>}
              <div id="currently-showing-movies">

                {currentlyShowingMoviesFilter.length !== 0 ? currentlyShowingMoviesFilter.map((filteredMovie) =>
                  <div className={`image-wrapper ${filteredMovie["rating"]}`} onClick={() => showMovie(filteredMovie)}>

                    <Image src={filteredMovie["imageSource"]} height={300} width={200} />
                    <h4>{filteredMovie["title"]}</h4>

                    <p class="image-wrapper-rating">{filteredMovie["rating"]}</p>
                  </div>
                ) : <h2>No movies matched your search criteria.</h2>}

              </div>
              <div id="coming-soon-section">


              {currentlyShowingFilter == false || (currentlyShowingFilter == true && comingSoonFilter == true) ? <h1>Coming Soon</h1> : <h1>Adjust filter to view coming soon movies.</h1>}
                <div id="currently-showing-movies">
                  {comingSoonMoviesFilter.length !== 0 ? comingSoonMoviesFilter.map((filteredMovie) =>
                    <div className={`image-wrapper ${filteredMovie["rating"]}`} onClick={() => showMovie(filteredMovie)}>

                      <Image src={filteredMovie["imageSource"]} height={300} width={200} />
                      <h4>{filteredMovie["title"]}</h4>

                      <p class="image-wrapper-rating">{filteredMovie["rating"]}</p>
                    </div>
                  ) : <h2>No movies matched your search criteria.</h2>}
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
