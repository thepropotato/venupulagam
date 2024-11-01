import React, { useState } from "react";
import '../styles/contact-styles.css';
import { useForm, ValidationError } from '@formspree/react';

import memoji from '../assets/memoji.png';

function ContactForm({ state, handleSubmit }) {
    return (
        <form id="message" onSubmit={handleSubmit}>
            <input id="contact-name" placeholder="Your name" name="Name" />
            <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
            />
            <input id="contact-text" placeholder="Drop a message <3" name="Message" />
            <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
            />
            <button className="material-symbols-outlined" type="submit">send</button>
        </form>
    );
}

function LoadContact() {
    const [state, handleSubmit] = useForm("xpwzqenj");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // SHOW THE SUCCESS MESSAGE
    const handleFormSubmit = (e) => {
        handleSubmit(e);
        if (state.succeeded) { // UNCOMMENT THESE LINES FOR PRODUCTION
            setShowSuccessMessage(true);
            document.getElementById("contact-container").style.filter = 'brightness(0.5) blur(1rem)';
            document.getElementById("contact-container").style.pointerEvents = 'none';
        }
    };

    // CLOSE THE SUCCESS MESSAGE
    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
        document.getElementById("contact-container").style.filter = 'none';
        document.getElementById("contact-name").value = '';
        document.getElementById("contact-text").value = '';
        document.getElementById("contact-container").style.pointerEvents = 'all';
    };

    return (
        <div id="contact-wrapper">
            <div className="container" id="contact-container" style={{ '--name': 'value' }}>
                <div id="contact-credits">
                    <h1 className="quote">You know the business</h1>
                    <h1 className="quote">I know the chemistry</h1>
                    <p className="quote-overlay">I'm thinking maybe you and I could partner up!</p>
                </div>

                <div id="contact-main">
                
                    <ContactForm state={state} handleSubmit={handleFormSubmit} />

                    <div id="socials">
                        <a name="Github" href="https://github.com/thepropotato"><i className="fa-brands fa-github"></i></a>
                        <a name="Linkedin" href="https://www.linkedin.com/in/venu-pulagam/"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a name="Mail" href="mailto:notvenupulagam@gmail.com"><i className="fa-solid fa-envelope"></i></a>
                        <a name="Instagram" href="https://www.instagram.com/venupulagam/"><i className="fa-brands fa-instagram"></i></a>
                        <a name="Medium" href="https://medium.com/@mosagadu"><i className="fa-brands fa-medium"></i></a>
                        <a name="Mobile" href="tel:+919494121711"><i className="fa-solid fa-phone"></i></a>
                    </div>
                </div>

                <footer>&copy; 2024 <span id="sign">&nbsp; Venu Pulagam</span>. All rights reserved.</footer>
            </div>

            {showSuccessMessage && (
                <div id="success-message" className="success-message" style={{ display: 'flex' }}>
                    <div>
                        <p>Message sent successfully! Thanks for reaching out to me.</p>
                        <img src={memoji} alt="Memoji" />
                    </div>

                    <button id="close-message" onClick={handleCloseSuccessMessage}>Okay, Thanks</button>
                </div>
            )}
        </div>
    );
}

export default LoadContact;