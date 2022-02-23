import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import CurrentlyShowingMovies from '../static/currently-showing.js';
import isleOfDogs from '../images/isleofdogs.jpg';
import whiplash from '../images/whiplash.jpeg';
import granTorino from '../images/grantorino.jpg';
import granTorinoBanner from '../images/granTorinoBanner.jpg';
import Footer from '../components/Footer.js';

export default function Home() {
    return (
        <div className="container">

            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
                <Script src="../static/currently-showing.js" />

            </Head>
            <body>
                <NavBar />
                <main >
                    <div id="movies-view">
                        <div id="filters-column">
                            <h1>Filter By</h1>
                            <h2>TITLE</h2>
                            <a><input type="text" placeholder="Title..." id="filter-searchbar"></input></a>
                            <h2>RATING</h2>
                            <input className="filter-checkbox" type="checkbox" id="g-rating" name="g" value="G"></input>
                            <label for="g">G</label><br></br>
                            <input className="filter-checkbox" type="checkbox" id="pg-rating" name="pg" value="PG"></input>
                            <label for="pg">PG</label><br></br>
                            <input className="filter-checkbox" type="checkbox" id="pg-13-rating" name="pg-13" value="PG-13"></input>
                            <label for="pg-13">PG-13</label><br></br>
                            <input className="filter-checkbox" type="checkbox" id="r-rating" name="r" value="R"></input>
                            <label for="r">R</label><br></br>
                            <h2>GENRE</h2>
                            <input className="filter-checkbox" type="checkbox" id="animation" name="animation" value="Animation"></input>
                            <label for="animation">Animation</label><br></br>
                            <input className="filter-checkbox" type="checkbox" id="comedy" name="comedy" value="Comedy"></input>
                            <label for="comedy">Comedy</label><br></br>
                            <input className="filter-checkbox" type="checkbox" id="drama" name="drama" value="Drama"></input>
                            <label for="drama">Drama</label><br></br>
                            <input className="filter-checkbox" type="checkbox" id="horror" name="horror" value="Horror"></input>
                            <label for="horror">Horror</label><br></br>
                        </div>
                        <div id="movies-column">
                            <h1>Currently Showing</h1>
                            <div id="currently-showing-movies">
                                <div className="image-wrapper">
                                    <Image src={isleOfDogs} layout="responsive" sizes="50vw" />
                                    <h2>Isle of Dogs</h2>
                                </div>

                                <div className="image-wrapper">
                                    <Image src={granTorino} />
                                    <h2>Gran Torino</h2>
                                </div>

                            </div>
                            <div id="coming-soon-section">
                                <h1>Coming Soon</h1>
                                <div id="coming-soon-movies">
                                    <div className="image-wrapper">
                                        <Image src={whiplash} />
                                        <h2>Whiplash</h2>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>



                   

                </main>
            </body>

            <footer>
          
            </footer>

            {
                /*   
                <style jsx>{`
                       .container {
                         min-height: 100vh;
                         padding: 0 0.5rem;
                         display: flex;
                         flex-direction: column;
                         justify-content: center;
                         align-items: center;
                       }
               
                       main {
                         padding: 5rem 0;
                         flex: 1;
                         display: flex;
                         flex-direction: column;
                         justify-content: center;
                         align-items: center;
                       }
               
                       footer {
                         width: 100%;
                         height: 100px;
                         border-top: 1px solid #eaeaea;
                         display: flex;
                         justify-content: center;
                         align-items: center;
                       }
               
                       footer img {
                         margin-left: 0.5rem;
                       }
               
                       footer a {
                         display: flex;
                         justify-content: center;
                         align-items: center;
                       }
               
                       a {
                         color: inherit;
                         text-decoration: none;
                       }
               
                       .title a {
                         color: #0070f3;
                         text-decoration: none;
                       }
               
                       .title a:hover,
                       .title a:focus,
                       .title a:active {
                         text-decoration: underline;
                       }
               
                       .title {
                         margin: 0;
                         line-height: 1.15;
                         font-size: 4rem;
                       }
               
                       .title,
                       .description {
                         text-align: center;
                       }
               
                       .description {
                         line-height: 1.5;
                         font-size: 1.5rem;
                       }
               
                       code {
                         background: #fafafa;
                         border-radius: 5px;
                         padding: 0.75rem;
                         font-size: 1.1rem;
                         font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                           DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
                       }
               
                       .grid {
                         display: flex;
                         align-items: center;
                         justify-content: center;
                         flex-wrap: wrap;
               
                         max-width: 800px;
                         margin-top: 3rem;
                       }
               
                       .card {
                         margin: 1rem;
                         flex-basis: 45%;
                         padding: 1.5rem;
                         text-align: left;
                         color: inherit;
                         text-decoration: none;
                         border: 1px solid #eaeaea;
                         border-radius: 10px;
                         transition: color 0.15s ease, border-color 0.15s ease;
                       }
               
                       .card:hover,
                       .card:focus,
                       .card:active {
                         color: #0070f3;
                         border-color: #0070f3;
                       }
               
                       .card h3 {
                         margin: 0 0 1rem 0;
                         font-size: 1.5rem;
                       }
               
                       .card p {
                         margin: 0;
                         font-size: 1.25rem;
                         line-height: 1.5;
                       }
               
                       .logo {
                         height: 1em;
                       }
               
                       @media (max-width: 600px) {
                         .grid {
                           width: 100%;
                           flex-direction: column;
                         }
                       }
                     `}</style>
                */
            }


        </div>
    )
}