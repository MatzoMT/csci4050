import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';
import Footer from '../components/Footer.js';



// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function SelectSeat(movieName) {
    return <div>
        <NavBar />
        <div class="book-movie-poster">
            <Image src={isleOfDogs} />
        </div>

        <div className="center">
            <h1 className="book-movie-title">Isle of Dogs</h1>
            <h2 className="book-movie-available-times">Available Seats</h2>
            <h3 id="screen">SCREEN</h3>
            <div className="seat-row">
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
            </div>
            <div id="legend">
                <p className="vacant-seat-legend">VACANT SEAT</p>
                <p className="closed-seat-legend">CLOSED SEAT</p>
            </div>





        </div>

        <Footer />

    </div>
}