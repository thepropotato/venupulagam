import React, { useEffect } from 'react';
import './global-styles.css';

import LoadMenu from './pages/menu';
import LoadHero from './pages/hero';
import LoadProjects from './pages/projects';
import LoadWritings from './pages/writings';
import LoadContact from './pages/contact';
import LoadAbout from './pages/about';
import LoadEdits from './pages/edits';

function LoadPortfolio() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    /** 
    *    <LoadHero />
        <LoadAbout />
        <LoadProjects />
        <LoadWritings />
        <LoadEdits />
        <LoadContact />   
    **/

    return (
        <>
            <LoadMenu />
            <div id='body-container'>
                <LoadHero />
                <LoadAbout />
                <LoadProjects />
                <LoadWritings />
                <LoadEdits />
                <LoadContact />   
            </div>
        </>
        );
    };

export default LoadPortfolio;