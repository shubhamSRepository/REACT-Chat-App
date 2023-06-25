import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;


        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }
        catch (err) {
            setErr(true);
        }
    };


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">React Chat-App</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign In</button>
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link> </p>
                {err && <span>something went wrong!</span>}

            </div>

        </div>
    )
}

export default Login;