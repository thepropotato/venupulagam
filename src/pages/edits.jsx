import React, { useEffect, useState, useRef } from "react";
import '../styles/edits-styles.css';

function LoadEdits() {

    const images = require.context('../assets/edits', false, /\.(png|jpe?g|svg)$/);
    const imagePaths = images.keys().map(images);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [editName, setEditName] = useState('');
    const menuRef = useRef(null);
    const [lockScreenVisible, setLockScreenVisible] = useState(false);

    const handleWallpaperDoubleClick = () => {
        setLockScreenVisible(true);
    };

    const handleLockScreenDoubleClick = () => {
        setLockScreenVisible(false);
    };

    useEffect(() => {
        const imageName = imagePaths[currentIndex].split('/').pop().split('.')[0];
        setEditName(imageName);
    
        if (menuRef.current) {
            const activeImage = menuRef.current.children[currentIndex];
            if (activeImage) {
                const container = menuRef.current;
                const offset = activeImage.offsetLeft - (container.clientWidth - activeImage.clientWidth) / 2;
                container.scrollTo({
                    left: offset,
                    behavior: 'smooth'
                });
            }
        }
    }, [currentIndex, imagePaths]);    
    

    const handleNext = () => {
        if (currentIndex < imagePaths.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const getCurrentDateAndDay = () => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = imagePaths[currentIndex];
        link.download = `${editName}-by-mosagadu.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container" id="edits-container">

            <div id="information-container">
                <div id="image-menu-row" ref={menuRef}>
                    {imagePaths.map((imagePath, index) => (
                        <img
                            key={index}
                            src={imagePath}
                            alt={`Edit ${index}`}
                            className={index === currentIndex ? "active" : ""}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>

                <div id="image-meta-info">
                    <h1>{editName}</h1>
                    <a href="https://imgur.com/user/mosagadu/posts" target="_blank" rel="noreferrer">https://imgur.com/user/mosagadu/posts</a>
                    <div id="edits-button-row">
                        <button
                            className="material-symbols-outlined"
                            onClick={handlePrevious}
                            style={{ opacity: currentIndex === 0 ? 0.2 : 1 }}
                        >
                            arrow_back_ios
                        </button>
                        <button id="download-button" onClick={downloadImage}>Download</button>
                        <button
                            className="material-symbols-outlined"
                            onClick={handleNext}
                            style={{ opacity: currentIndex === imagePaths.length - 1 ? 0.2 : 1 }}
                        >
                            arrow_forward_ios
                        </button>
                    </div>
                </div>
            </div>

            <div id="mobile">
                <div id="left-panel-buttons">
                    <div id="profile-rocker"></div>
                    <div id="volume-buttons">
                        <div id="volume-up"></div>
                        <div id="volume-down"></div>
                    </div>
                </div>

                <div id="right-panel-buttons"></div>

                <div id="mobile-screen">
                    <div id="mobile-notch"></div>
                    <div
                        id="mobile-wallpapers-wrapper"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`
                        }}
                    >
                        {imagePaths.map((imagePath, index) => (
                            <img
                                key={index}
                                className="mobile-wallpaper"
                                src={imagePath}
                                alt={`Edit ${index}`}
                                onDoubleClick={handleWallpaperDoubleClick}
                            />
                        ))}
                    </div>

                    {lockScreenVisible && (
                        <div
                            id="lock-screen"
                            onDoubleClick={handleLockScreenDoubleClick}
                        >
                            <h2 className="date-and-day">{getCurrentDateAndDay()}</h2>
                            <h1 className="time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</h1>
                        </div>
                    )}
                </div>
            </div>

            <button className="material-symbols-outlined" id="help-for-edits">question_mark</button>
            <p id="help-text">Double tap to lock or unlock the mobile.</p>
        </div>
    );
}

export default LoadEdits;