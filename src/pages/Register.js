import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function Register() {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            // console.log(res.user);

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(

                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (downloadURL) => {

                            await updateProfile(res.user, {
                                /*I HAVE COPIED THESE COMMENTS FROM GOOGLE SO THAT I CAN REMEMBER THESE FUNCTIONALITIES 
                                AND CAN USE TO UNDERSTAND CODE LATER */
                                /*The updateProfile function is a part of Firebase Authentication, specifically the 
                                Firebase Auth SDK. It allows you to update the profile information of a user 
                                authenticated with Firebase Authentication. This function is typically used to update 
                                properties such as the user's display name, photo URL, or any other custom user profile 
                                fields. */
                                /*In Firebase Authentication, the photoURL property is used to store the URL of the 
                                user's profile picture, not the actual picture itself. This means that you need to 
                                separately upload the picture to a storage service, such as Firebase Storage or a 
                                third-party storage provider, and obtain the URL of the uploaded picture. Then, you 
                                can use that URL to update the photoURL property of the user's profile. */
                                displayName,
                                photoURL: downloadURL
                            });

                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL
                            });

                            await setDoc(doc(db, "userChats", res.user.uid), {
                                /*initially leaving it blank as we have no chats in beginning */
                            })

                            navigate("/");

                        });
                }
            );
        }
        catch (err) {
            setErr(true);
        }

    }



    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">React Chat-App</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input type="file" />
                    <button>Sign Up</button>
                </form>
                <p>You do have an account? <Link to="/login">Login</Link> </p>
                {err && <span>something went wrong!</span>}

            </div>

        </div>
    )
}

export default Register;