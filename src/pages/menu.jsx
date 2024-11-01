import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.jpg';
import '../styles/menu-styles.css';

function LoadMenu() {
    const pages = ['home', 'about', 'projects', 'writings', 'edits', 'contact'];

    const [showNavbar, setShowNavbar] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [activePage, setActivePage] = useState('home');

    const toggleNavbar = () => {
        if (showNavbar) {
            setIsClosing(true);
            
            setTimeout(() => {
                setShowNavbar(false);
                setIsClosing(false);
            }, 150);
        } else {
            setShowNavbar(true);
        }
    };

    useEffect(() => {
        if (showNavbar) {
            document.getElementById('spanning-highlight').style.top = `${16.67 * pages.indexOf(activePage)}%`;
            document.getElementById(activePage).classList.add('active');
            
            window.scrollTo({
                top: pages.indexOf(activePage) * window.innerHeight,
                behavior: 'smooth'
            }); 
        }
    }, [activePage, showNavbar]);

    function navigate(page) {
        setActivePage(page); // Set the active page
        toggleNavbar();      // Toggle the navbar
        document.getElementById('spanning-highlight').style.top = `${16.67 * pages.indexOf(page)}%`;
    }

    function hoverAnimation(page) {
        document.getElementById('spanning-highlight').style.top = `${16.67 * pages.indexOf(page)}%`;
    }

    function resetToActive() {
        document.getElementById('spanning-highlight').style.top = `${16.67 * pages.indexOf(activePage)}%`;
    }

    return (
        <div>
            {showNavbar && (
                <header className={isClosing ? 'hidden' : ''}>
                    <nav>
                        {pages.map(page => (
                            <button
                                key={page} 
                                id={page} 
                                onClick={() => navigate(page)} // Call navigate on click
                                onMouseEnter={() => hoverAnimation(page)}
                                onMouseLeave={resetToActive}
                                className={page === activePage ? 'active' : ''}
                            >
                                {page.toUpperCase()}
                            </button>
                        ))}
                        <span id='spanning-highlight'></span>
                    </nav>
                </header>
            )}

            <div id="menu-button" onClick={toggleNavbar}>
                <img src={logo} alt='menu-button' />
            </div>
        </div>
    );
}

export default LoadMenu;