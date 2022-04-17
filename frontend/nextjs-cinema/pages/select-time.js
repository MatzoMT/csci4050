import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import { useState, useEffect, useSearchParams } from 'react';
import { useRouter } from 'next/router';




// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function SelectTime() {
    const [movie, setMovie] = useState({});
    const [showTimes, setShowTimes] = useState([]);
    const router = useRouter();


    const currentlyShowingMovies = [
        { "movieID": 1, "title": "Gran Torino", "imageSource": require("../images/grantorino.jpg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/RMhbr2XQblk?&autoplay=1", "description": "Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.", "director": "Clint Eastwood" },
        { "movieID": 2, "title": "Isle of Dogs", "imageSource": require("../images/isleofdogs.jpg"), "rating": "PG-13", "videoLink": "https://www.youtube.com/embed/dt__kig8PVU?&autoplay=1", "description": "Set in Japan, Isle of Dogs follows a boy's odyssey in search of his lost dog.", "director": "Wes Anderson" },
        { "movieID": 3, "title": "Whiplash", "imageSource": require("../images/whiplash.jpeg"), "rating": "R", "videoLink": "https://www.youtube.com/embed/7d_jQycdQGo?&autoplay=1", "description": "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.", "director": "Damien Chazelle" },
        { "movieID": 4, "title": "The Terminal", "imageSource": require("../images/theterminal.jpg"), "rating": "PG-13", "videoLink": "https://www.youtube.com/embed/iZqQRmhRvyg?&autoplay=1" },
        { "movieID": 5, "title": "Kill Bill Vol. 1", "imageSource": require("../images/killBill.png"), "rating": "R", "videoLink": "https://www.youtube.com/embed/c_dNIXwrbzY?&autoplay=1" },
        { "movieID": 6, "title": "Napoleon Dynamite", "imageSource": require("../images/napoleondynamite.jpeg"), "rating": "PG", "videoLink": "https://www.youtube.com/embed/ZHDi_AnqwN4?&autoplay=1" }
        // {"title": "TITLE", }
    ];

    const movieShows = [
        { "movieID": 1, "roomID": 1, "show_date": "04/19/22", "show_time": "15:00" },
        { "movieID": 1, "roomID": 1, "show_date": "04/19/22", "show_time": "18:00" },
        { "movieID": 1, "roomID": 1, "show_date": "04/21/22", "show_time": "19:00" },


    ]

    //const [alreadyShownDates, setAlreadyShownDates] = useState([]);
    let alreadyShownDates = []

    useEffect(() => {
        for (let i = 0; i < currentlyShowingMovies.length; i++) {
            if (currentlyShowingMovies[i]["movieID"] == router.query.movieID) {
                setMovie(currentlyShowingMovies[i]);
            }
        }
        for (let i = 0; i < movieShows.length; i++) {
            if (movieShows[i]["movieID"] == router.query.movieID) {
                setShowTimes(showTimes => [...showTimes, movieShows[i]]);
            }
        }
    }, []);

    const renderTimes = () => {
        let result = [];
        for (let i = 0; i < movieShows.length; i++) {
            if (alreadyShownDates.indexOf(movieShows[i]["show_date"]) > -1) {
                continue;
            } else {
                let resultDate = [];
                for (let j = i; j < movieShows.length; j++) {
                    if (movieShows[j]["movieID"] == router.query.movieID && movieShows[j]["show_date"] == movieShows[i]["show_date"]) {
                        resultDate.push(<h3>{movieShows[j]["show_time"]}</h3>);

                    }
                }
                if (movieShows[i]["movieID"] == router.query.movieID) {
                    result.push(<div className="book-movie-date">
                    <h2>{movieShows[i]["show_date"]}</h2>
                    <div className="book-movie-date-time">

                        {resultDate}
                    </div>
                </div>)
                }

                alreadyShownDates.push(movieShows[i]["show_date"]);
            }
        }
        return result;
    }
    /*
    iterate through each showtime
    if date is not in alreadyShownDates, show dates
    after map iteration, add each date to alreadyShownDates
    */
    return <div>
        <NavBar />
        <div class="book-movie-poster">
            {movie["imageSource"] !== undefined && <Image src={movie["imageSource"]} height={300} width={200} />}
        </div>

        <div className="book-movie-info">
            <h1 className="book-movie-title">{movie["title"]}</h1>
            <h2 className="book-movie-available-times">Available Times</h2>
            {renderTimes()}
            {/*showTimes.map((showDate) =
            
                <div className="book-movie-date">
                    <h2>{showDate["show_date"]}</h2>
                    <div className="book-movie-date-time">
                        {showTimes.map((showTime) => 
                        <h3>{showTime["show_date"] == showDate["show_date"] && showTime["show_time"]}</h3>
                        )}
                    </div>
                </div>
                        
                        )*/}

        </div>


    </div>
}