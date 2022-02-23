import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';


export default function SelectTime() {
    return <div>
        <NavBar />
        <div class="center">
            <h1>Order Summary</h1>
            <h2>You have made a reservation for the following:</h2>
            <div id="confirmation-row">
                <div id="book-movie-poster" class="left">
                    <Image src={isleOfDogs} />
                </div>

                <div id="movie-confirmation-info" class="right">
                    <h3 class="info-tag">MOVIE</h3>
                    <p>Isle of Dogs</p>
                    <h3 class="info-tag">DATE AND TIME</h3>
                    <p>Wednesday, February 23</p>
                    <p>4:30 PM</p>
                    <h3 class="info-tag">SEATS</h3>
                    <p>A1</p>
                    <h3 class="info-tag">TICKET TYPES</h3>
                    <p>1x Adult</p>
                    <button id="edit-order-button" type="button"><a href="select-time">Edit Order</a></button>
                    <button id="proceed-to-checkout-button" type="button"><a href="checkout">Proceed to Checkout</a></button>

                </div>
            </div>

        </div>



    </div>
}