import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import { useState, useEffect, useSearchParams } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';





// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function SelectTime() {
    const [movie, setMovie] = useState({});
    const [showTimes, setShowTimes] = useState([]);
    const [currentlyShowingMovies, setCurrentlyShowingMovies] = useState([]);

    const router = useRouter();



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

    const movieShows = [
        { "movieID": 1, "roomID": 1, "show_date": "04/19/22", "show_time": "15:00" },
        { "movieID": 1, "roomID": 1, "show_date": "04/19/22", "show_time": "18:00" },
        { "movieID": 1, "roomID": 1, "show_date": "04/21/22", "show_time": "19:00" },
    ]

    //const [alreadyShownDates, setAlreadyShownDates] = useState([]);
    let alreadyShownDates = []

    useEffect(async () => {
        await axios.post("http://localhost:8000/api/v1/get-movie-by-id", { "id": router.query.movieID }).then((response) => {
            let responseCopy = response["data"]["data"];
            responseCopy["imageSource"] = require("../images/" + responseCopy["imageSource"]);
            setMovie(responseCopy);
            //console.log(response["data"]["data"]);
        });

        await axios.post("http://localhost:8000/api/v1/get-showtimes-by-id", { "id": router.query.movieID }).then((response) => {

            setShowTimes(response["data"]["showtimes"]);
            console.log(response);
        });

    }, [])

    const showTickets = (showTime) => {
        router.push({
            pathname: '/select-tickets',
            query: { "movieID": router.query.movieID, "showtimeID": showTime },
        })
    }

    const renderTimes = () => {
        let result = [];
        for (let i = 0; i < showTimes.length; i++) {
            if (alreadyShownDates.indexOf(showTimes[i]["show_date"]) > -1) {
                continue;
            } else {
                let resultDate = [];
                for (let j = i; j < showTimes.length; j++) {
                    if (showTimes[j]["show_date"] == showTimes[i]["show_date"]) {
                        resultDate.push(<h3 onClick={() => showTickets(showTimes[j]["showtime_id"])}>{showTimes[j]["show_time"]}</h3>);

                    }
                }
                    result.push(<div className="book-movie-date">
                    <h2>{showTimes[i]["show_date"]}</h2>
                    <div className="book-movie-date-time">

                        {resultDate}
                    </div>
                </div>)
                

                alreadyShownDates.push(showTimes[i]["show_date"]);
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