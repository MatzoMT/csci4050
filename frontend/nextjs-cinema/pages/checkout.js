import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState, useEffect, useSearchParams } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Router } from 'react-router-dom';

export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    };
  }

export default function SelectTime() {
    const router = useRouter();
    const [movie, setMovie] = useState({});
    const [showTime, setShowTime] = useState({});
    const [cards, setCards] = useState([]);
    const [selectCard, setSelectCard] = useState();
    const [promotion, setPromotion] = useState("");
    const [incorrectMessage, setIncorrectMessage] = useState("");
    const [promoMessage, setPromoMessage] = useState("");
    let total = (parseInt(router.query.children) * 4.00) + (parseInt(router.query.adults) * 7.00) + (parseInt(router.query.seniors) * 4.00);

    const [totall, setTotall] = useState(total);    

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

    const applyPromotion = () => {
        axios.post("http://localhost:8000/api/v1/get-promotion-discount", {"promoCode":promotion}).then( (response) => {
            if(response["data"]["success"]=="true"){
                setTotall(total*((100-response["data"]["discount"])/100))
                setPromoMessage("Applied promotion to your purchase")
            }
            else
                setPromoMessage(response["data"]["error"])
        })
    }

    const handleSubmit = () => {
        // Need to check if router.query.seats is object or string before continuing
        axios.post("http://localhost:8000/api/v1/create-booking", {"showtimeID": router.query.showtimeID, "email": localStorage.getItem("email"), "seats": router.query.seats, "children": router.query.children, "adults": router.query.adults, "seniors": router.query.seniors, "card":selectCard}).then((response) => {;
            console.log(response)
            console.log("success: ",response["data"]["success"])
            if (response["data"]["success"] == "true") {
                router.push({
                    pathname: '/ticket-confirmation',
                    query: {
                        "movieID": router.query.movieID,
                        "showtimeID": router.query.showtimeID,
                        "children": router.query.children,
                        "adults": router.query.adults,
                        "seniors": router.query.seniors,
                        "seats": router.query.seats,
                        "total": totall
                    },
                })
            } else {
                setIncorrectMessage(response.data.error);
                router.reload();
            }
        });
        

    }


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
            <h3 id="incorrect-credentials" style={{ color: 'red' }}>{incorrectMessage}</h3>
            <div id="checkout-row">
                <div id="checkout-left">
                    <h2>Pick a payment method</h2>
                    <a><Dropdown  name="card" options={cards} onChange={(val) => setSelectCard(val.value)} value={selectCard} placeholder="Select an option..." /></a><br />
                    <br></br>
                    <h2>Enter a promotion code</h2>
                    <input type="text" className='fields' onChange={(val) => setPromotion(val.target.value)}></input>

                    <button id="return-home-button" type="button" onClick={() => applyPromotion()}><a id="return-home-text">Apply Promotion</a></button>
                    <h3 id="incorrect-credentials" style={{ color: 'green' }}>{promoMessage}</h3>

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
                    {typeof router.query.seats === Object ? router.query.seats.map(seat => <p>{seat}</p>) : <p>{router.query.seats}</p>}
                    <h3 class="info-tag">TICKET TYPES</h3>
                    {parseInt(router.query.children) !== 0 && <p>{router.query.children}x Children</p>}
                    {parseInt(router.query.adults) !== 0 && <p>{router.query.adults}x Adults</p>}
                    {parseInt(router.query.seniors) !== 0 && <p>{router.query.seniors}x Seniors</p>}

                    <h2>Total: ${totall.toFixed(2)}</h2>
                    <button id="return-home-button" type="button" onClick={() => handleSubmit()}><a id="return-home-text">Checkout</a></button>

                </div>
            </div>

        </div>



    </div>
}
