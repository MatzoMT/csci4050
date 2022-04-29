import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import Footer from '../components/Footer.js';
import { useState, useEffect, useSearchParams } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Router } from 'react-router-dom';



// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function SelectSeat(movieName) {
    const [movie, setMovie] = useState({});
    const [showTime, setShowTime] = useState({});
    const [seats, setSeats] = useState(["A1", "A2", "A3", "B1", "B2", "B3"])
    const [reservedSeats, setReservedSeats] = useState(["B2"]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    let numSeats = parseInt(router.query.children) + parseInt(router.query.adults) + parseInt(router.query.seniors);

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

    const addSeat = (seat) => {
        console.log("NUMSEATS")
        console.log(numSeats);
        if (selectedSeats.length < numSeats && selectedSeats.indexOf(seat) == -1) {
            setSelectedSeats(selectedSeats => [...selectedSeats, seat]);
        } else if (selectedSeats.indexOf(seat) !== -1) {
            setSelectedSeats(selectedSeats.filter(oldSeat => oldSeat !== seat))
        }
        console.log(selectedSeats);
    }

    const handleSubmit = () => {
        if (selectedSeats.length !== numSeats) {
            setErrorMessage("You must select " + numSeats + " seats to continue.");
        } else {
            router.push({
                pathname: '/checkout',
                query: {
                    "movieID": router.query.movieID,
                    "showtimeID": router.query.showtimeID,
                    "children": router.query.children,
                    "adults": router.query.adults,
                    "seniors": router.query.seniors,
                    "seats": selectedSeats
                },
            })
        }
    }

    const renderSeats = () => {
        let seatLetter = seats[0].charAt(0);
        let returnCode = [];
        for (let i = 0; i < seats.length; i++) {
            if (seats[i].charAt(0) !== seatLetter) {
                seatLetter = seats[i].charAt(0);
                returnCode.push(<br></br>);
            }
            if (reservedSeats.indexOf(seats[i]) == -1) {
                if (selectedSeats.indexOf(seats[i]) == -1) {
                    returnCode.push(<span onClick={() => addSeat(seats[i])}><p className="vacant-seat" >{seats[i]}</p></span>);

                } else {
                    returnCode.push(<span onClick={() => addSeat(seats[i])}><p className="selected-seat" >{seats[i]}</p></span>);
                }
            } else {
                returnCode.push(<p className="closed-seat">{seats[i]}</p>);
            }
        }
        return <div className="seat-row">
            {returnCode}
        </div>
    }

    return <div>
        <NavBar />
        <div class="book-movie-poster">
            {movie["imageSource"] !== undefined && <Image src={movie["imageSource"]} height={300} width={200} />}
        </div>

        <div className="center">
            <h1 className="book-movie-title">{movie["title"]}</h1>
            <h3>{showTime["show_date"]}</h3>
            <h3>{showTime["show_time"]}</h3>
            <h3>Tickets Reserved: {numSeats}</h3>
            <h2 className="book-movie-available-times">Available Seats</h2>
            <h3 id="screen">SCREEN</h3>
            {renderSeats()}

            {/* <div className="seat-row">
                <p className="vacant-seat">A1</p>
                <p className="closed-seat">A2</p>
                <p className="vacant-seat">A3</p>
                <p className="vacant-seat">A4</p>
                <p className="vacant-seat">A5</p>
                <p className="vacant-seat">A6</p>
                <p className="vacant-seat">A7</p>
                <p className="vacant-seat">A8</p>
                <p className="vacant-seat">A9</p>
                <br></br>
                <p className="vacant-seat">B1</p>
                <p className="vacant-seat">B2</p>
                <p className="vacant-seat">B3</p>
                <p className="vacant-seat">B4</p>
                <p className="vacant-seat">B5</p>
                <p className="vacant-seat">B6</p>
                <p className="vacant-seat">B7</p>
                <p className="vacant-seat">B8</p>
                <p className="vacant-seat">B9</p>
                <br></br>
                <p className="vacant-seat">C1</p>
                <p className="vacant-seat">C2</p>
                <p className="vacant-seat">C3</p>
                <p className="vacant-seat">C4</p>
                <p className="vacant-seat">C5</p>
                <p className="vacant-seat">C6</p>
                <p className="vacant-seat">C7</p>
                <p className="vacant-seat">C8</p>
                <p className="vacant-seat">C9</p>
                <br></br>
                <p className="vacant-seat">D1</p>
                <p className="vacant-seat">D2</p>
                <p className="vacant-seat">D3</p>
                <p className="vacant-seat">D4</p>
                <p className="closed-seat">D5</p>
                <p className="closed-seat">D6</p>
                <p className="closed-seat">D7</p>
                <p className="vacant-seat">D8</p>
                <p className="vacant-seat">D9</p>
                <br></br>

            </div>*/}
            <div id="legend">
                <p className="vacant-seat-legend" >VACANT SEAT</p>
                <p className="closed-seat-legend">CLOSED SEAT</p>
            </div>
            <button id="return-home-button" type="button" onClick={handleSubmit}><a id="return-home-text">Proceed to Checkout</a></button>
            <p style={{ color: "red" }}>{errorMessage}</p>







        </div>

        <Footer />

    </div>
}