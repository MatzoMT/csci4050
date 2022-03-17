import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';


export default function SelectTime() {
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
                    <h3 class="info-tag">MOVIE</h3>
                    <p>Isle of Dogs</p>
                    <h3 class="info-tag">DATE AND TIME</h3>
                    <p>Wednesday, February 23</p>
                    <p>4:30 PM</p>
                    <h3 class="info-tag">SEATS</h3>
                    <p>A1</p>
                    <h3 class="info-tag">TICKET TYPES</h3>
                    <p>1x Adult</p>
                    <h3>A confirmation email with your booking details has been sent to your account email.</h3>
                    <button id="return-home-button" type="button"><a href=".." id="return-home-text">Return to Home</a></button>

                </div>
            </div>

        </div>



    </div>
}