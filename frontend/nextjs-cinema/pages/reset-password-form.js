import Head from 'next/head';
import NavBar from '../components/NavBar.js';
import Script from 'next/script';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';




// SKELETON CODE



export default function Home(props) {
    const router = useRouter();
    const query = router.query;
    const [tokenExpired, setTokenExpired] = useState("");
    const [email, setEmail] = useState("");
    const [incorrectMessage, setIncorrectMessage] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let submitNewPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setIncorrectMessage("The passwords do not match.");
        } else {
            axios.post("http://localhost:8000/api/v1/edit-password", { email: email, newPassword: newPassword }).then((response) => {
                if (response.data.changeSuccess == "true") {
                    router.push('/confirm-reset-password')
                } else {
                    setIncorrectMessage("The passwords do not match.");
                }
            });
        }
    };

    useEffect(async () => {
        try {
            axios.post("http://localhost:8000/api/v1/decode-jwt", { jwt: query.jwt }).then((response) => {
                if (response.data.expired == "true") {
                    setTokenExpired("true");
                    console.log(response.data);
                } else {
                    setTokenExpired("false");
                    setEmail(response.data.email);
                }
            });
        } catch (err) {

        }
    }, [query]);

    function renderPage() {
        if (tokenExpired == "true") {
            return (
                <div>
                    <h2>Your link has expired.</h2>
                    <p>Please follow the instructions at the forgot password page to generate a new link</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Reset Your Password</h2>
                    <form onSubmit={submitNewPassword}>
                        <h3 id="incorrect-message" style={{ color: 'red' }}>{incorrectMessage}</h3>

                        <label htmlFor="new-password" className="field-label"><h3>New Password</h3></label>
                        <a><input type="password" className="fields" name="new-password" onChange={(val) => setNewPassword(val.target.value)}></input></a><br />
                        <label htmlFor="confirm-password" className="field-label"><h3>Confirm Password</h3></label>
                        <a><input type="password" className="fields" name="confirm-password" onChange={(val) => setConfirmPassword(val.target.value)}></input></a><br />
                        <button id="next-button">Submit</button>
                    </form>
                </div>
            );
        }
    }


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
                        <h1>
                            {renderPage()}
                        </h1>
                    </div>

                </main>

            </body>




        </div>
    )
}
