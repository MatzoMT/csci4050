import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


// SKELETON CODE

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [incorrectMessage, setIncorrectMessage] = useState("");
    const router = useRouter();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            axios.post("http://localhost:8000/api/v1/get-user-information", { email: email}).then((response) => {
                if (response.data.requestSuccess == "true") {
                    alert("FOUND")
                } else {
                    setIncorrectMessage("No account associated with that email was found.")
                }
            });
        } catch (err) {
            console.log(err);
        }

    };

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

                    <div id="forgot-password">
                        <form onSubmit={handleSubmit}>

                            <h1>Forgot Your Password?</h1>
                            <p>Enter the email associated with your account. If your account exists within our system, you will be sent an email with password reset instructions.</p>
                            <h3 id="incorrect-message" style={{ color: 'red' }}>{incorrectMessage}</h3>

                            <label htmlFor="email" className="field-label"><h3>Email</h3></label>
                            <a><input type="text" className="fields" name="email" placeholder="johndoe@email.com" onChange={(val) => setEmail(val.target.value)} defaultValue={email}></input></a><br />
                            <button type="submit" id="next-button">Next</button>
                        </form>

                    </div>

                </main>

            </body>




        </div>
    )
}
