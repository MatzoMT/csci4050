import NavBar from '../components/NavBar.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import Image from 'next/image';



// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function SelectTime() {
    return <div>
        <NavBar />
        <div class="book-movie-poster">
            <Image src={isleOfDogs} />
        </div>

        <div className="book-movie-info">
            <h1 className="book-movie-title">Isle of Dogs</h1>
            <h2 className="book-movie-available-times">Available Times</h2>
            <div className="book-movie-date">
                <h2>Wednesday, February 23</h2>
                <div className="book-movie-date-time">
                    <h3>4:30</h3>
                    <h3>6:45</h3>
                    <h3>9:00</h3>
                </div>
            </div>
            <div className="book-movie-date">
                <h2>Thursday, February 24</h2>
                <div className="book-movie-date-time">
                    <h3>2:15</h3>
                    <h3>4:30</h3>
                    <h3>6:45</h3>
                    <h3>9:00</h3>
                </div>
            </div>
        </div>


    </div>
}