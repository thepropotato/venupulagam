import '../styles/writings-styles.css';
import { useState } from 'react';

function LoadWritings() {

    const [isPenHovered, setIsPenHovered] = useState(false);

    return (
        <div className="container" id="writings-container">
            <div id="pen-container">
                <h1 id='pen-name' className={isPenHovered ? 'pen-hovered' : ''}>mosagadu</h1>
                <h1 id='pen-name' className={isPenHovered ? 'pen-hovered' : ''}>mosagadu</h1>

                <div id="pen" onMouseEnter={() => setIsPenHovered(true)}
                    onMouseLeave={() => setIsPenHovered(false)}
                    className={isPenHovered ? 'pen-hovered' : ''}>
                    <p id="written-by">Written by <span>Venu Pulagam</span></p>
                    <div id="nibble"></div>
                </div>
                <div id="cap">
                    <div id="cap-metal"></div>
                </div>
            </div>

            <div id="text-container">
                <div>
                    <h1 id='link-to-medium-parent'>I <a id='link-to-medium' href='https://medium.com/@mosagadu' target='_blank' rel='noreferrer' onMouseEnter={() => setIsPenHovered(true)} onMouseLeave={() => setIsPenHovered(false)}><span className="material-symbols-outlined">north_east</span></a></h1>
                    <h1>write</h1>
                    <h1 id='layer-head-one'>
                        <p id="top-layer-one" className={isPenHovered ? 'pen-hovered' : ''}>short</p>
                        <p id="bottom-layer-one" className={isPenHovered ? 'pen-hovered' : ''}>crazy</p>
                    </h1>

                    <h1 id='layer-head-two'>
                        <p id="top-layer-two" className={isPenHovered ? 'pen-hovered' : ''}>stories</p>
                        <p id="bottom-layer-two" className={isPenHovered ? 'pen-hovered' : ''}>sh*t</p>
                    </h1>
                </div>
            </div>
        </div>
        );
    }

export default LoadWritings;
