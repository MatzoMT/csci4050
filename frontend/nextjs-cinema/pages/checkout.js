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

    const handleSubmit = () => {

        router.push({
            pathname: '/ticket-confirmation',
            query: {
                "movieID": router.query.movieID,
                "showtimeID": router.query.showtimeID,
                "children": router.query.children,
                "adults": router.query.adults,
                "seniors": router.query.seniors,
                "seats": router.query.seats
            },
        })

    }


    return <div>
        <NavBar />
        <div class="center">
            <h1>Checkout</h1>
            <div id="checkout-row">
                <div id="checkout-left">
                    <h2>Billing Information</h2>
                    <h3>Full Name</h3>
                    <input type="text" class="billing-field" id="full-name" name="full-name"></input>
                    <h3>Email</h3>
                    <input type="text" class="billing-field" id="email" name="email"></input>
                    <h3>Billing Address</h3>
                    <input type="text" class="billing-field" id="billing-address" name="billing-address"></input>
                    <h3>Zip Code</h3>
                    <input type="text" class="billing-field" id="zip" name="zip"></input>
                    <h2>Payment Method</h2>
                    <select class="billing-field" name="payment-method" id="payment-method">
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                    </select>
                    <h3>Card Number</h3>
                    <input class="billing-field" type="text" id="email" name="email"></input>

                    <h3>Expiration Date</h3>
                    <select class="billing-field" name="expiration-month" id="experiment-month" placeholder="Month">
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                    <input class="billing-field" type="text" id="expiration-year" name="expiration-year" placeholder="Year"></input>

                    <h3>CV</h3>
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
                    <button id="return-home-button" type="button" onClick={() => handleSubmit()}><a id="return-home-text">Checkout</a></button>

                </div>
            </div>

        </div>



    </div>
}