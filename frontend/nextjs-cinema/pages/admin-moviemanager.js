import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image'
import CurrentlyShowingMovies from '../static/currently-showing.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import whiplash from '../images/whiplash.jpeg';
import AdminNavBar from '../components/AdminNavBar.js';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieInfo from '../components/MovieInfo.js';



// import { setHttpAgentOptions } from 'next/dist/server/config';

// ---THE TABLES---
//movies table (movie_id, movie_name, movie_rating, movie_genre, movie_director, movie_description, movie_trailer, movie_status)
//showtimes table - IMPORTANT (movie_id, showtime) //id is not displayed to admin, as it is simply backend. used to get the movie name when managing showtimes
      //(showtimes and movies are linked by movie_id)
//users table (stuff)
//promotions table (promotion_id, promotion_code, promotion_discount, promotion_expiry)
//probably want to make each table "item" its own element for cleanliness?? idk

export default function AdminHome() {
  let movieArray = [];
  
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [imageSource, setImageSource] = useState("");
  const [imageDataURL, setImageDataURL] = useState("")
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("G");
  const [incorrectInfoMessage, setIncorrectInfoMessage] = useState("");
  const [genres, setGenres] = React.useState([]);
  const [cast, setCast] = React.useState([]);
  const [childPrice, setChildPrice] = useState("$4");
  const [adultPrice, setAdultPrice] = useState("$7");
  const [seniorPrice, setSeniorPrice] = useState("$4");

  
  const addGenre = event => {
    if (event.key == "Enter") {
      //console.log("ok")
      console.log(typeof genres)
      const currGenre = event.target.value;
      console.log("evt: " + currGenre)

      if (currGenre == "COMEDY" || currGenre == "HORROR" || currGenre == "ACTION" || currGenre == "ADVENTURE" || currGenre == "ANIMATION" || currGenre == "DRAMA" || currGenre == "FANTASY" || currGenre == "HISTORICAL" || currGenre == "SCIENCE FICTION" || currGenre == "THRILLER" || currGenre == "WESTERN") {
        if (genres.indexOf(currGenre) === -1) {
          setGenres([...genres, currGenre])
        }
      }
      event.target.value = "";
      console.log(genres)
    }
  }

  const removeGenre = indexToRemove => {
    setGenres(genres.filter((_, index) => index != indexToRemove))
  }

  const removeCast = indexToRemove => {
    setCast(cast.filter((_, index) => index != indexToRemove))
  }

  const toInputUppercase = e => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  const onlyNumbers = e => {
    e.target.value = "$" + e.target.value.replace(/\D/g, '')
  }

  const addCast = event => {
    if (event.key == "Enter") {
      //console.log("ok")
      console.log(typeof genres)
      const currCast = event.target.value;
      console.log("evt: " + currCast)
      if (cast.indexOf(currCast) === -1) {
        setCast([...cast, currCast])
      }
      event.target.value = "";
      console.log(cast)
    }
    
  
  }

  useEffect(async () => {
    try {
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
      await axios.post("http://localhost:8000/api/v1/get-movies",
        { email: window.sessionStorage.getItem("email") }).then((response) => {
          
          console.log(response.data)
          if (response.data.isSuccessful == "true") {
            // setApples(response.data.list.);
            for (const element of response.data.list) {
              let movieGenres = [];
              console.log(element.genres.length)
              for (let i = 0; i < element.genres.length; i++) {
                movieGenres.push(element.genres[i][1])
              }
              movieArray.push(<MovieInfo id={element.id} title={element.title} imageSource={element.imageSource} genres={movieGenres.join(", ")} rating={element.rating} director={element.director} description={element.description} videoLink={element.videoLink} cast={element.cast.join(", ")} />);
            }

            console.log(movieArray);
          }
  
        });
        setMovies(movieArray);
      
    //setCards(cardArray);
    } catch (err) {
      console.log('ran into an error:');
      console.log(err);
    }
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("not preventing :(")
    console.log()
    
    if (title == "" || title == null) {
      setIncorrectInfoMessage("You must provide the movie with a title.");
      return;
    }
    if (imageSource == "" || imageSource == null) {
      setIncorrectInfoMessage("You must upload an image for the movie.")
      return;
    }
    if (videoLink == "" || videoLink == null) {
      setIncorrectInfoMessage("You must provide the movie with a trailer link.");
      return;
    }
    if (description == "" || description == null) {
      setIncorrectInfoMessage("You must provide a description for the movie.");
      return;
    }
    if (director == "" || director == null) {
      setIncorrectInfoMessage("This movie must have a director.")
      return;
    }
    if (genres.length == 0) {
      setIncorrectInfoMessage("This movie cannot have 0 genres.")
      return;
    }
    if (cast.length == 0) {
      setIncorrectInfoMessage("This movie cannot have 0 cast members.")
      return;
    }
    if (childPrice == "$" || adultPrice == "$" || seniorPrice == "$") {
      setIncorrectInfoMessage("You cannot leave ticket prices empty.");
      return;
    }
    
    await axios.post("http://localhost:8000/api/v1/add-movie", { title: title, imageSource: imageSource, rating: rating, videoLink: videoLink, description: description, director: director, genres: genres, cast:cast, childPrice: childPrice.substring(1), adultPrice:adultPrice.substring(1), seniorPrice:seniorPrice.substring(1) }).then((response) => {
      //alert("You have successfully added a payment type to your account.")
      if (response.data.success == "false") {
        setIncorrectInfoMessage(response.data.errMsg);
      } else {
        setIncorrectInfoMessage("Successfully added movie.");
        router.reload()
      }
    
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

            <h1>Hello {email}.</h1>
            <h2>You are currently logged in as an administrator.</h2>
            <h1>Movies</h1>
            
            <table className="table" id="movieTable">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Director</th>
                <th>Description</th>
                <th>Trailer</th>
                <th>Cast</th>
              </tr>
              {movies}
            </table>           
            <h1>Add New Movie</h1>
            
            <form onSubmit={handleSubmit}>
              <h2>Title:</h2>
              <input className="fields" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} type="text" name="title" placeholder="Enter a title" onChange={(val) => setTitle(val.target.value)}></input><br></br>
              <h2>Image:</h2>
              <input className="fields" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} type="file" id="movieImage" onChange={ (val) => {
                  if (val.target.files.length == 1) {
                    console.log(val.target.files[0].type.replace('image/', ''));
                    let fileType = val.target.files[0].type.replace('image/', '');
  
                    const reader = new FileReader();
                    reader.readAsDataURL(val.target.files[0]);
                    reader.addEventListener("load", () => {
                      //console.log(reader.result);
                      console.log(val.target.files[0])
                      setImageSource(val.target.files[0].name)
                      setImageDataURL(reader.result)
  
                      //need to save in ""../images"
                      
                      //this is a dataURL but i'm not sure what to do with it.
                      //i've verified that it is indeed the image the 
                    })
                  }

              }}></input>
              <h2>Rating:</h2>
              <select className="fields" id="rating" name="rating" onChange={(val) => {
                console.log(val.target.value)
                setRating(val.target.value)
                }}>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
              </select>
              <h2>Trailer Link:</h2>
              <input className="fields" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} type="text" name="trailerLink" placeholder="Enter a trailer link" onChange={(val) => setVideoLink(val.target.value)}></input><br></br>
              <h2>Description:</h2>
              <textarea className="fields" name="description" placeholder="Enter a description" onChange={(val) => setDescription(val.target.value)}></textarea><br></br>
              <h2>Director:</h2>
              <input className="fields" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} type="text" name="director" placeholder="Enter the director name" onChange={(val) => setDirector(val.target.value)}></input><br></br>
              <h2>Genres:</h2>
              <div className="genres-input">
                <ul>
                  {genres.map((genre, index) => (
                    <li className="fields2" key={index}>
                      <span>{genre}</span>
                      <i onClick={() => removeGenre(index)}>                       
                      ❌
                      </i>
                    </li>
                  ))}
                </ul>
                <input        
                  className="fields"
                  onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}              
                  type="text"
                  placeholder="Press enter to add genre"
                  onKeyUp={addGenre}
                  onInput={toInputUppercase}
                />
              </div>  
              <h2>Cast:</h2>
              <div className="cast-input">
                <ul>
                  {cast.map((castMember, index) => (
                    <li className="fields2" key={index}>
                      <span>{castMember}</span>
                      <i onClick={() => removeCast(index)}>                       
                      ❌
                      </i>
                    </li>
                  ))}
                </ul>
                <input 
                  className="fields"  
                  onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}                   
                  type="text"
                  placeholder="Press enter to add cast member"
                  onKeyUp={addCast}
                />
              </div>  
              <h2>Child Ticket Price:</h2>
              <input className="fields" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} defaultValue={childPrice} type="text" onInput={onlyNumbers} name="childPrice" placeholder="Child ticket price" onChange={(val) => setChildPrice(val.target.value)}></input><br></br>
              <h2>Adult Ticket Price:</h2>
              <input className="fields" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} defaultValue={adultPrice} type="text" onInput={onlyNumbers} name="adultPrice" placeholder="Adult ticket price" onChange={(val) => setAdultPrice(val.target.value)}></input><br></br>
              <h2>Senior Ticket Price:</h2>
              <input className="fields" onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} defaultValue={seniorPrice} type="text" onInput={onlyNumbers} name="seniorPrice" placeholder="Senior ticket price" onChange={(val) => setSeniorPrice(val.target.value)}></input><br></br>

              <h3 id="incorrect-credentials" style={{color: 'red'}}>{incorrectInfoMessage}</h3>
              <button type="submit">Add new movie</button>
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
