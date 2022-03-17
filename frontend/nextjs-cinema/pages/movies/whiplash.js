import NavBar from '../../components/NavBar.js';

// This is a hardcoded example
// In the future, pass movie metadata as props?
export default function Whiplash(movieName) {
    return <div>
        <NavBar />
        <div className='video-div'>
            <iframe className="video-iframe" width="560" height="315" src="https://www.youtube.com/embed/7d_jQycdQGo?&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className="movie-info">
            <h1 className="movie-title">Whiplash</h1>
            <button className="coming-soon-button" type="button">COMING SOON</button>
            <h2 className="movie-description">A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.</h2>
            <p className="movie-director">Director: Damien Chazelle</p>
            <p className="movie-genre">Genre: Drama</p>
            <p className="movie-rating">Rating: R</p>
        </div>


    </div>
}