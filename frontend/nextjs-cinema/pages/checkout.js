import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState, useEffect, useSearchParams } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Router } from 'react-router-dom';


export default function SelectTime() {
    const [movie, setMovie] = useState({});
    const [showTime, setShowTime] = useState({});
    const [cards, setCards] = useState([]);
    const [selectCard, setSelectCard] = useState();

    const router = useRouter();
    let total = (parseInt(router.query.children) * 4.00) + (parseInt(router.query.adults) * 7.00) + (parseInt(router.query.seniors) * 4.00);

    useEffect(async () => {
        await axios.post("http://localhost:8000/api/v1/prepare-checkout", {"user":window.sessionStorage.getItem("email")}).then((response) => {
            let c1 = response.data.cards;
            setCards(c1)
        });
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

    // let handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formdate = dateSelected.toLocaleDateString('en-US', {
    //         day: 'numeric',
    //         month: 'numeric',
    //         year: 'numeric',
    //       });
    //     try {
    //         axios.post("http://localhost:8000/api/v1/schedule-movie", {date: formdate, time: timeSelected, movie: movieSelected, room: roomSelected}).then((response) => {
    //         if (response.data.success == "true") {
    //             router.push('/movies');
    //         } else {
    //             setIncorrectMessage(response.data.error);
    //             router.push('/schedule-movie');
    //         } 
    //         });
    //     } catch (err) {
    //       console.log(err);
    //     }
    
    //    };

    return <div>
        <NavBar />
        <div class="center">
            <h1>Checkout</h1>
            <div id="checkout-row">
                <div id="checkout-left">
                    <h2>Pick a payment method</h2>
                    <a><Dropdown  name="card" options={cards} onChange={(val) => setSelectCard(val.value)} value={selectCard} placeholder="Select an option..." /></a><br />
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                </div>

                <div id="checkout-right">
                    <br></br>
                    <h2>Cart Summary</h2>
                    <h3 class="info-tag">MOVIE</h3>
                    <p>{movie["title"]}</p>
                    <h3 class="info-tag">DATE AND TIME</h3>
                    <p>{showTime["show_date"]}</p>
                    <p>{showTime["show_time"]}</p>
                    <h3 class="info-tag">SEATS</h3>
                    {router.query.seats.map(seat => <p>{seat}</p>)}
                    <h3 class="info-tag">TICKET TYPES</h3>
                    {parseInt(router.query.children) !== 0 && <p>{router.query.children}x Children</p>}
                    {parseInt(router.query.adults) !== 0 && <p>{router.query.adults}x Adults</p>}
                    {parseInt(router.query.seniors) !== 0 && <p>{router.query.seniors}x Seniors</p>}

                    <h2>Total: ${total.toFixed(2)}</h2>
                    <button id="return-home-button" type="button"><a href="ticket-confirmation" id="return-home-text">Checkout</a></button>

                </div>
            </div>

        </div>



    </div>
}
