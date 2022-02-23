import NavBar from '../../components/NavBar.js';

// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function GranTorino(movieName) {
    return <div>
        <NavBar />
        <div className='video-div'>
            <iframe className="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/RMhbr2XQblk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div className="movie-info">
            <h1 className="movie-title">Gran Torino</h1>
            <button className="book-button" type="button">BOOK TICKETS</button>
            <h2 className="movie-description">Disgruntled Korean War veteran Walt Kowalski sets out to reform his neighbor, Thao Lor, a Hmong teenager who tried to steal Kowalski's prized possession: a 1972 Gran Torino.</h2>
            <p className="movie-director">Director: Clint Eastwood</p>
            <p className="movie-genre">Genre: Drama</p>
            <p className="movie-rating">Rating: R</p>
        </div>


    </div>
}