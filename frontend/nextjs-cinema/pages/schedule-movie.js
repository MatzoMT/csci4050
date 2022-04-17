import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



// SKELETON CODE
//<a><select name="room" className="fields" value={roomSelected} onChange={onSelectRoom}>
//{roomList.map((option) => (
//    <option value={option}> {option}</option>
//))}
//</select></a>
//


export default function Home() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [roomList, setRoomList] = useState();
  const [movieList, setMovieList] = useState();
  const [roomSelected, setRoomSelected] = useState();
  const [movieSelected, setMovieSelected] = useState();
  const [timeSelected, setTimeSelected] = useState();
  const [dateSelected, setDateSelected] = useState(new Date());

  const [incorrectMessage, setIncorrectMessage] = useState("");

  let timelist = ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "24:00"]

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/schedule-movie").then((response) => {
        setMovieList(response.data.movies);
        setRoomList(response.data.rooms);
        setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    const formdate = dateSelected.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });
    try {
        axios.post("http://localhost:8000/api/v1/schedule-movie", {date: formdate, time: timeSelected, movie: movieSelected, room: roomSelected}).then((response) => {
        if (response.data.success == "true") {
            router.push('/movies');
        } else {
            setIncorrectMessage(response.data.error);
            router.push('/schedule-movie');
        } 
        });
    } catch (err) {
      console.log(err);
    }

   };

//    let onSelectRoom = (event) => {
//     setRoomSelected(event.target.value);
//    };
//    let onSelectTime = (event) => {
//     setTimeSelected(event.target.value);
//    };

  return (
    <div className="container">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <Script src="../static/currently-showing.js" />

      </Head>
      <body>
        <NavBar />
        <main>

          <div id="schedule">
            <form onSubmit={handleSubmit}>

              <h1>Schedule a movie</h1>
              <h3 id="incorrect-credentials" style={{ color: 'red' }}>{incorrectMessage}</h3>

              <label for="movie" className="field-label"><h3>Movie</h3></label>
              <a><Dropdown  name="movie" options={movieList} onChange={(val) => setMovieSelected(val.value)} value={movieSelected} placeholder="Select an option..." /></a><br />
              <label for="room" className="field-label"><h3>Room</h3></label>
              <a><Dropdown  name="room" options={roomList} onChange={(val) => setRoomSelected(val.value)} value={roomSelected} placeholder="Select an option..." /></a><br />
              <label for="date" className="field-label"><h3>Date</h3></label>
              <a><DatePicker selected={dateSelected} onChange={(date) => setDateSelected(date)} /></a><br />
              <label for="time" className="field-label"><h3>Time</h3></label>
              <a><Dropdown  name="time" options={timelist} onChange={(val) => setTimeSelected(val.value)} value={timeSelected} placeholder="Select an option..." /></a><br />

              <button type="submit" id="schedule-button">Schedule</button>
            </form>

          </div>

          <div id="footer">
         
          </div>
        </main>

      </body>

      <footer>

      </footer>


    </div>
  )
}