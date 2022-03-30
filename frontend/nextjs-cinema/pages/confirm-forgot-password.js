import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


// SKELETON CODE

export default function Home(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [incorrectMessage, setIncorrectMessage] = useState("");
    const router = useRouter();


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

                        <h1>Success!</h1>
                        <p>An email has been sent to your inbox containing password reset instructions.</p>
                        <a href="/login" id="back-to-login-button"><p>Back to Login</p></a>

                    </div>

                </main>

            </body>




        </div>
    )
}
