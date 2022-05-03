import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import { useState, useEffect, useSearchParams } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Router } from 'react-router-dom';


export default function SelectTime() {
    const [movie, setMovie] = useState({});
    const [showTime, setShowTime] = useState({});
    const router = useRouter();
    let total = (parseInt(router.query.children) * 4.00) + (parseInt(router.query.adults) * 7.00) + (parseInt(router.query.seniors) * 4.00);

    useEffect(async () => {
        await axios.post("http://localhost:8000/api/v1/get-movie-by-id", { "id": router.query.movieID }).then((response) => {
            let responseCopy = response["data"]["data"];
            responseCopy["imageSource"] = require("../images/" + responseCopy["imageSource"]);
            setMovie(responseCopy);
        });

        await axios.post("http://localhost:8000/api/v1/get-showtime-by-showtime-id", { "movieID": router.query.movieID, "showtimeID": router.query.showtimeID }).then((response) => {
            console.log(response);
            setShowTime(response["data"]["showtime"]);
        });
    }, []);

    return <div>
        <NavBar />
        <div class="center">
            <h1>Success!</h1>
            <h2>You have booked tickets for the following movie:</h2>
            <div id="confirmation-row">
                <div id="book-movie-poster" class="left">
                    <Image src={isleOfDogs} />
                </div>

                <div id="movie-confirmation-info" class="right">
                    <h2>Cart Summary</h2>
                    <h3 class="info-tag">MOVIE</h3>
                    <p>{movie["title"]}</p>
                    <h3 class="info-tag">DATE AND TIME</h3>
                    <p>{showTime["show_date"]}</p>
                    <p>{showTime["show_time"]}</p>
                    <h3 class="info-tag">SEATS</h3>
                    {typeof router.query.seats === Object ? router.query.seats.map(seat => <p>{seat}</p>) : <p>{router.query.seats}</p>}
                    <h3 class="info-tag">TICKET TYPES</h3>
                    {parseInt(router.query.children) !== 0 && <p>{router.query.children}x Children</p>}
                    {parseInt(router.query.adults) !== 0 && <p>{router.query.adults}x Adults</p>}
                    {parseInt(router.query.seniors) !== 0 && <p>{router.query.seniors}x Seniors</p>}

                    <h2>Total: ${total.toFixed(2)}</h2>
                    <button id="return-home-button" type="button"><a href=".." id="return-home-text">Return to Home</a></button>

                </div>
            </div>

        </div>



    </div>
}