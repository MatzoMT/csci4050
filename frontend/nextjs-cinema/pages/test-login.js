import { NextPage } from 'next'
import Head from 'next/head'
import LoginForm from '../components/LoginForm'
import Axios from 'axios';

import React, { useState, useEffect } from 'react';

export default function Home() {
    useEffect(async () => {
        alert("running");
        sessionStorage.setItem("currentloggedin" ,"stringsgs");
        alert(sessionStorage.getItem("currentloggedin"));
    }, []);
    useEffect(async () => {
        await Axios.get("http://localhost:8000/api/tasks/").then((response) => {
            console.log(response);
        });
    }, []);
    return (
        <div>
            <Head>
                <title>Login Page</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Tama on pahaa!</h1>
                <LoginForm />
            </main>
        </div>
    )
}
