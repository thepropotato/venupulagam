import React, { useState, useEffect } from "react";
import profile from "../assets/venu.png";
import "../styles/hero-styles.css";

const first_letters = ['V', 'E', 'N', 'U'];
const last_letters = ['P', 'U', 'L', 'A', 'G', 'A', 'M'];
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

function getRandomLetter() {
    return letters[Math.floor(Math.random() * letters.length)];
}

function scrollToContactPage() {
    window.scrollTo({
        top: 6 * window.innerHeight,
        behavior: 'smooth'
    }); 
    
}

function AnimateLetter({ finalLetter, delay }) {
    const [currentLetter, setCurrentLetter] = useState('');
    const [iteration, setIteration] = useState(0);
    
    useEffect(() => {
        let interval;

        if (iteration < 60) {
            interval = setInterval(() => {
                setCurrentLetter(getRandomLetter());
                setIteration((prev) => prev + 1);
            }, 50);
        } else {
            interval = setTimeout(() => {
                setCurrentLetter(finalLetter);
            }, 50);
        }

        return () => clearInterval(interval);
    }, [iteration, finalLetter]);

    return (
        <h1 className="hero-name-letters" style={{ animationDelay: `${delay}s` }}>
            {currentLetter}
        </h1>
    );
}

function LoadHero() {
    
    return (
        <div id="hero-container" className="container">
            <div id="hero-left">
                <p id="hero-greet">Hey &nbsp; there, I'm</p>

                <div id="hero-name">
                    <div>
                        {first_letters.map((element, index) => (
                            <AnimateLetter finalLetter={element} key={index} delay={index * 1} />
                        ))}
                    </div>

                    <div>
                        {last_letters.map((element, index) => (
                            <AnimateLetter finalLetter={element} key={index + first_letters.length} delay={(index + first_letters.length) * 1} />
                        ))}
                    </div>
                </div>

                <p id="hero-description">AI engineer and Web Developer</p>
            </div>

            <div id="hero-right">
                <div id="silhoutte">
                    <img src={profile} id="silhoutte-img" alt="venu pulagam"></img>
                </div>
            </div>

            <button id="call-to-action" onClick={scrollToContactPage}>Contact Me</button>

        </div>
    );
}

export default LoadHero;
