import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';


// SKELETON CODE

export default function Home() {
    const router = useRouter();
    const query = router.query;
    const [email, setEmail] = useState("");



    console.log("yo")
    useEffect(async () => {
        console.log("yo2")
        try {
            await axios.post("http://localhost:8000/api/v1/decode-jwt", { jwt: query.jwt }).then((response) => {
                console.log(response.data);
                setEmail(response.data.email)
            });
            await axios.post("http://localhost:8000/api/v1/activate-account", { email: email })
        } catch (err) {
            console.log(err)
        }
    });

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

                    <div>
                        <h1>Your account has been activated!</h1>
                    </div>

                </main>

            </body>




        </div>
    )
}
