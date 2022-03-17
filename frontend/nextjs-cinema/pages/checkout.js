import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';


export default function SelectTime() {
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
                    <p>Isle of Dogs</p>
                    <h3 class="info-tag">DATE AND TIME</h3>
                    <p>Wednesday, February 23</p>
                    <p>4:30 PM</p>
                    <h3 class="info-tag">SEATS</h3>
                    <p>A1</p>
                    <h3 class="info-tag">TICKET TYPES</h3>
                    <p>1x Adult</p>
                    <h2>Total: $7.00</h2>
                    <button id="return-home-button" type="button"><a href="ticket-confirmation" id="return-home-text">Checkout</a></button>

                </div>
            </div>

        </div>



    </div>
}