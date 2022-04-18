import NavBar from '../components/NavBar.js';
import { useRouter } from 'next/router';
import { useState, useEffect, useSearchParams } from 'react';
import axios from 'axios';



// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function Home(movieName) {
    const [movie, setMovie] = useState({});
    const [comingSoonMovies, setComingSoonMovies] = useState([]);
    const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState([]);
    const { query } = useRouter();
    const router = useRouter();

    // HARD CODE
    // IMPORTANT! React does not like dynamic url for Image component
    // Solution: change each image to require('source') after getting movies
    /*
    const currentlyShowingMovies = [
        { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood" },
        { "movieID": 2, "title": "Isle of Dogs", "imageSource": require("../images/isleofdogs.jpg"), "rating": "PG-13", "videoLink": "https://www.youtube.com/embed/dt__kig8PVU?&autoplay=1", "description": "Set in Japan, Isle of Dogs follows a boy's odyssey in search of his lost dog.", "director": "Wes Anderson" },
        { "movieID": 3, "title": "Whiplash", "imageSource": require("../images/whiplash.jpeg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/7d_jQycdQGo?&autoplay=1", "description": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.", "director": "Damien Chazelle" },
        { "movieID": 4, "title": "The Terminal", "imageSource": require("../images/theterminal.jpg"), "rating": "PG-13", "videoLink": "https://www.youtube.com/embed/iZqQRmhRvyg?&autoplay=1" },
        { "movieID": 5, "title": "Kill Bill Vol. 1", "imageSource": require("../images/killBill.png"), "rating": "R", "videoLink": "https://www.youtube.com/embed/c_dNIXwrbzY?&autoplay=1" },
        { "movieID": 6, "title": "Napoleon Dynamite", "imageSource": require("../images/napoleondynamite.jpeg"), "rating": "PG", "videoLink": "https://www.youtube.com/embed/ZHDi_AnqwN4?&autoplay=1" }
        // {"title": "TITLE", }
    ];
    */

    useEffect(async () => {
        await axios.post("http://localhost:8000/api/v1/get-movie-by-id", {"id": router.query.movieID}).then((response) => {

          setMovie(response["data"]["data"]);
            console.log(response["data"]["data"]);
        });
    

      }, [])

    const bookMovie = () => {
        console.log(window.sessionStorage.getItem("email"));
        if (window.sessionStorage.getItem("email") == null) {
            router.push('/login');
        } else {
            router.push({
                pathname: '/select-time',
                query: { "movieID": router.query.movieID },
            })
        }

    }


    return <div>
        <NavBar />
        <div className='video-div'>
            <iframe className='video-iframe' width="560" height="315" src={movie["videoLink"]} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className="movie-info">
            <h1 className="movie-title">{movie["title"]}</h1>
            <button className="book-button" type="button" onClick={() => bookMovie() }><a className="book-tickets-text">BOOK TICKETS</a></button>
            <h2 className="movie-description">{movie["description"]}</h2>
            <p className="movie-director">Director: Wes Anderson</p>
            <p className="movie-genre">Genre: Comedy, Adventure</p>
            <p className="movie-rating">Rating: {movie["rating"]}</p>
        </div>


    </div>
}