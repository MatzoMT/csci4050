import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import Footer from '../components/Footer.js';
import { useState, useEffect, useSearchParams } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';




// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function SelectSeat(movieName) {
    const [movie, setMovie] = useState({});
    const [showTime, setShowTime] = useState({});
    const [childTickets, setChildTickets] = useState(0);
    const [adultTickets, setAdultTickets] = useState(0);
    const [seniorTickets, setSeniorTickets] = useState(0);
    const router = useRouter();

    useEffect(async () => {
        await axios.post("http://localhost:8000/api/v1/get-movie-by-id", { "id": router.query.movieID }).then((response) => {
            let responseCopy = response["data"]["data"];
            responseCopy["imageSource"] = require("../images/" + responseCopy["imageSource"]);
            setMovie(responseCopy);
            //console.log(response["data"]["data"]);
        });

        await axios.post("http://localhost:8000/api/v1/get-showtime-by-showtime-id", {"movieID": router.query.movieID, "showtimeID": router.query.showtimeID}).then((response) => {
            console.log(response);
            setShowTime(response["data"]["showtime"]);
             
        // let responseCopy = response["data"]["data"];
            //responseCopy["imageSource"] = require("../images/" + responseCopy["imageSource"]);
            //setMovie(responseCopy);
            //console.log(response["data"]["data"]);
        });
    }, []);


    return <div>
        <NavBar />
        <div class="book-movie-poster">
        {movie["imageSource"] !== undefined && <Image src={movie["imageSource"]} height={300} width={200} />}
        </div>

        <div className="center">
            <h1 className="book-movie-title">{movie["title"]}</h1>
            <h3>{showTime["show_date"]}</h3>
            <h3>{showTime["show_time"]}</h3>

            <h2 className="book-movie-available-times">Ticket Ages</h2>
            <div class="age-select">
                <h2>Child ($4)</h2>
                <span class="minus-child unselectable" onClick={() => childTickets !== 0 && setChildTickets(childTickets - 1)}>-</span>
                <input type="text" value={childTickets} class="age-select-field" />
                <span class="plus-child unselectable" onClick={() => setChildTickets(childTickets + 1)}>+</span>
            </div>
            <div class="age-select">
                <h2>Adult ($7)</h2>
                <span class="minus-child unselectable" onClick={() => adultTickets !== 0 && setAdultTickets(adultTickets - 1)}>-</span>
                <input type="text" value={adultTickets} class="age-select-field" />
                <span class="plus-child unselectable" onClick={() => setAdultTickets(adultTickets + 1)}>+</span>
            </div>
            <div class="age-select">
                <h2>Senior ($4)</h2>
                <span class="minus-child unselectable" onClick={() => seniorTickets !== 0 && setSeniorTickets(seniorTickets - 1)}>-</span>
                <input readonly type="text" value={seniorTickets} class="age-select-field" />
                <span class="plus-child unselectable" onClick={() => setSeniorTickets(seniorTickets + 1)}>+</span>
            </div>
            <button id="return-home-button" type="button"><a href="checkout" id="return-home-text">Proceed to Checkout</a></button>








        </div>

        <Footer />

    </div>
}