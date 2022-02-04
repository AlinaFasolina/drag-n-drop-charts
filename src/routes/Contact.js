import emailjs from "emailjs-com";
import React, { useRef } from 'react';
import { Helmet } from "react-helmet";

export default function ContactUs () {
    const form = useRef();

    function sendEmail(e) {
        e.preventDefault();

        emailjs
            .sendForm(
            "service_swhbhhm",
            "template_viec73o",
            form.current,
            "user_pKKDtUrE20TYWHNzucj7a"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    const show = document.getElementById("messageres");
                    show.innerHTML = "Message sent ;)";
                },
                (error) => {
                    console.log(error.text);
                }
            );
        e.target.reset();
    }

    return (
        <>
        <Helmet>
        <title>Contact Us</title>
        </Helmet>
        <div className="w-full h-screen px-4 pt-16 bg-light-100 dark:bg-night-100
                        transition-all duration-150 ease-linear">
            <div className="w-full max-w-xl px-10 py-5 mx-auto bg-light-200
                            nm-convex-bg-100-lg  rounded-3xl">
                <form ref={form} className="flex flex-col items-center sm:mx-auto sm:w-full sm:max-w-md" onSubmit={sendEmail}>
                    
                    <span className="w-full font-extrabold text-light-400 dark:text-night-400
                                    text-center text-3xl p-5">
                        Contact Us
                    </span>

                    <text className="text-light-300 dark:text-night-300 text-lg">
                        We work around the clock to ensure our clients are happy. 
                        Fill out the form below with your enquiries and we’ll get back to you as soon as possible.
                        <br /><br />Or you can email us @ 
                        <a href="mailto:stacksmartly@gmail.com" className="underline text-light-400 dark:text-night-400">
                        help@stacksmartly.com
                        </a>
                    </text>

                    <div class="w-full relative group mt-5">
                        <label for="name" className="text-normal">name</label>
                        <input type="text" name="name" id="name" required 
                            className="w-full h-10 px-4 text-xl italic peer bg-light-100 dark:bg-night-100 outline-none rounded-lg
                                        text-light-300 dark:text-night-300" />
                    </div>

                    <div class="w-full relative group mt-5">
                        <label for="name" className="text-normal">email</label>
                        <input type="text" name="email" id="email" required 
                            className="w-full h-10 px-4 text-xl italic peer bg-light-100 dark:bg-night-100 outline-none rounded-lg
                                text-light-300 dark:text-night-300" />
                    </div>

                    <div class="w-full relative group mt-5">
                        <label for="name" class="text-normal">message</label>
                        <textarea type="text" name="message" id="message" required cols="10" rows="5"
                            className="w-full px-4 text-xl italic peer bg-light-100 dark:bg-night-100 
                                        outline-none rounded-lg break-words text-light-300 dark:text-night-300" />
                    </div>

                    <button className="px-4 inline py-2 text-xl font-medium leading-5 shadow 
                    text-light-200 hover:text-light-400 dark:text-night-200 hover:dark:text-night-400
                    bg-light-400 hover:bg-light-200 dark:bg-night-400 dark:hover:bg-night-100
                    transition-colors duration-150 mt-5
                    border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue"
                    type="submit">
                    Send
                    </button>

                    <span id="messageres" className="message-sent"></span>
                </form>
            </div>
        </div>

        </>
    )
}