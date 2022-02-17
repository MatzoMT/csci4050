import NavBar from '../../components/NavBar.js';

// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function IsleOfDogs(movieName) {
    return <div>
        <NavBar />
        <div className='video-div'>
            <iframe className='video-iframe' width="560" height="315" src="https://www.youtube.com/embed/dt__kig8PVU?&autoplay=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className="movie-info">
            <h1 className="movie-title">Isle of Dogs</h1>
            <button className="book-button" type="button">BOOK TICKETS</button>
            <h2 className="movie-description">Set in Japan, Isle of Dogs follows a boy's odyssey in search of his lost dog.</h2>
            <p className="movie-director">Director: Wes Anderson</p>
            <p className="movie-genre">Genre: Comedy, Adventure</p>
            <p className="movie-rating">Rating: PG-13</p>
        </div>


    </div>
}