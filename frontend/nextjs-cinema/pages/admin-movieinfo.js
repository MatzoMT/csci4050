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
  const [id, setId] = useState(0);
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [imageSource, setImageSource] = useState("");
  const [imageDataURL, setImageDataURL] = useState("")
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("");
  const [incorrectInfoMessage, setIncorrectInfoMessage] = useState("");
  const [genres, setGenres] = React.useState([]);
  const [cast, setCast] = React.useState([]);
  const [childPrice, setChildPrice] = useState();
  const [adultPrice, setAdultPrice] = useState();
  const [seniorPrice, setSeniorPrice] = useState();


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
    e.target.value = e.target.value.replace(/\D/g, '')
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


  let handleUpdateMovie = async (e) => {
    //console.log("handling")
    //alert("hello")
    e.preventDefault();
    
    axios.post("http://localhost:8000/api/v1/update-movie", { id: id, title: title, imageSource: imageSource, rating: rating, videoLink: videoLink, description: description, director: director, genres: genres, cast: cast, childPrice:childPrice, adultPrice:adultPrice, seniorPrice:seniorPrice}).then((response) => {
      if (response.data.isSuccessful == "true") { 
        setIncorrectInfoMessage("Successfully updated movie info.");
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


      axios.post("http://localhost:8000/api/v1/get-movie-by-id",
      { "id": router.query.movieId }).then((response) => {
        console.log(response.data.data)
        if (response.data.isSuccessful == "true") {
          let movie = response.data.data;
          //console.log(response.data.users);
          setTitle(movie.title)
          setRating(movie.rating)
          let movieGenres = [];
          //console.log(response.data.data.genres)
          for (let i = 0; i < movie.genres.length; i++) {
            movieGenres.push(movie.genres[i][1])
          }
          //console.log(movieGenres)
          setGenres(movieGenres)

          let movieCast = [];
          for (let i = 0; i < movie.cast.length; i++) {
            movieCast.push(movie.cast[i]);
          }

          setCast(movieCast)
          setImageSource(movie.imageSource)
          setDescription(movie.description)
          setDirector(movie.director)
          setVideoLink(movie.videoLink)
          setId(movie.movieID)
          setChildPrice(movie.childPrice)
          setAdultPrice(movie.adultPrice)
          setSeniorPrice(movie.seniorPrice)


          // setFirstName(response.data.firstName);
          // setLastName(response.data.lastName);
          // setPhone(response.data.phone);
          // setUserEmail(response.data.email);
          
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
            <h1>Movie Information</h1>
            <form onSubmit={handleUpdateMovie}>
              <p>Title:</p>
              <a><input onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} defaultValue={title} type="text" name="title" placeholder="Enter a title" onChange={(val) => setTitle(val.target.value)}></input></a><br></br>
              <p>Image:</p>
              <input onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} title={imageSource} type="file" id="movieImage" onChange={ (val) => {
                  console.log("SUBMITTED")
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
              <p>Rating:</p>
              <select id="rating" name="rating" value={rating} onChange={(val) => {
                console.log(val.target.value)
                setRating(val.target.value)
                }}>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
              </select>
              <p>Trailer Link:</p>
              <a><input defaultValue={videoLink} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} type="text" name="trailerLink" placeholder="Enter a trailer link" onChange={(val) => setVideoLink(val.target.value)}></input></a><br></br>
              <p>Description:</p>
              <a><textarea defaultValue={description} name="description" placeholder="Enter a description" onChange={(val) => setDescription(val.target.value)}></textarea></a><br></br>
              <p>Director:</p>
              <a><input defaultValue={director} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} type="text" name="director" placeholder="Enter the director name" onChange={(val) => setDirector(val.target.value)}></input></a><br></br>
              <p>Genres:</p>
              <div className="genres-input">
                <ul>
                  {genres.map((genre, index) => (
                    <li key={index}>
                      <span>{genre}</span>
                      <i onClick={() => removeGenre(index)}>                       
                      ❌
                      </i>
                    </li>
                  ))}
                </ul>
                <input        
                  onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}              
                  type="text"
                  placeholder="Press enter to add genre"
                  onKeyUp={addGenre}
                  onInput={toInputUppercase}
                />
              </div>  
              <p>Cast:</p>
              <div className="cast-input">
                <ul>
                  {cast.map((castMember, index) => (
                    <li key={index}>
                      <span>{castMember}</span>
                      <i onClick={() => removeCast(index)}>                       
                      ❌
                      </i>
                    </li>
                  ))}
                </ul>
                <input   
                  onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}                   
                  type="text"
                  placeholder="Press enter to add cast member"
                  onKeyUp={addCast}
                />
              </div>  
              <p>Child Ticket Price:</p>
              $<input onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} defaultValue={childPrice} type="text" onInput={onlyNumbers} name="childPrice" placeholder="Child ticket price" onChange={(val) => setChildPrice(val.target.value)}></input><br></br>
              <p>Adult Ticket Price:</p>
              $<input onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} defaultValue={adultPrice} type="text" onInput={onlyNumbers} name="adultPrice" placeholder="Adult ticket price" onChange={(val) => setAdultPrice(val.target.value)}></input><br></br>
              <p>Senior Ticket Price:</p>
              $<input onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }} defaultValue={seniorPrice} type="text" onInput={onlyNumbers} name="seniorPrice" placeholder="Senior ticket price" onChange={(val) => setSeniorPrice(val.target.value)}></input><br></br>
              <h3 id="incorrect-credentials" style={{color: 'red'}}>{incorrectInfoMessage}</h3>
              <button type="submit">Update movie information</button>
            </form>
          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}
