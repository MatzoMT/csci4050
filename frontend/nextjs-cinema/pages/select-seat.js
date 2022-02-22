import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';



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
                <p>A1</p>
                <p>A2</p>
                <p>A3</p>
                <p>A4</p>
                <p>A5</p>
                <p>A6</p>
                <p>A7</p>
                <p>A8</p>
                <p>A9</p>
                <br></br>
                <p>B1</p>
                <p>B2</p>
                <p>B3</p>
                <p>B4</p>
                <p>B5</p>
                <p>B6</p>
                <p>B7</p>
                <p>B8</p>
                <p>B9</p>
                <br></br>
                <p>C1</p>
                <p>C2</p>
                <p>C3</p>
                <p>C4</p>
                <p>C5</p>
                <p>C6</p>
                <p>C7</p>
                <p>C8</p>
                <p>C9</p>
                <br></br>
                <p>D1</p>
                <p>D2</p>
                <p>D3</p>
                <p>D4</p>
                <p>D5</p>
                <p>D6</p>
                <p>D7</p>
                <p>D8</p>
                <p>D9</p>
            </div>


            


        </div>


    </div>
}