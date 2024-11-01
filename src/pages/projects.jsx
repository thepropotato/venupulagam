import React, { useEffect, useState } from "react";
import '../styles/projects-styles.css';
import fallback_background from '../assets/fallback_background.jpg';
import { marked } from 'marked';

async function fetchProjects(username, retries = 3) {
    const cacheKey = 'cachedProjects';
    try {
        const latestRepoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=1`);

        if (latestRepoResponse.status === 403 && retries > 0) {
            throw new Error('API limit exceeded');
        }

        const latestRepoData = await latestRepoResponse.json();

        if (latestRepoData.length === 0) {
            console.log('No repositories found for this user.');
            return null;
        }

        const latestRepo = latestRepoData[0];
        const latestRepoTitle = latestRepo.name;
        const latestRepoDescription = latestRepo.description;
        const latestRepoUrl = latestRepo.html_url;

        const latestReadmeResponse = await fetch(`https://api.github.com/repos/${username}/${latestRepoTitle}/readme`, {
            headers: {
                Accept: "application/vnd.github.v3.raw",
            },
        });
        let latestReadmeContent = await latestReadmeResponse.text();

        const latestRepoImageMatch = latestReadmeContent.match(/!\[.*?\]\((.*?)\)/);
        const latestRepoImageURL = latestRepoImageMatch
            ? latestRepoImageMatch[1]
                .replace('https://github.com/', 'https://raw.githubusercontent.com/')
                .replace(/\/blob\/(.*)/, '/$1')
            : null;

        const latestProject = {
            title: latestRepoTitle,
            description: latestRepoDescription,
            repoUrl: latestRepoUrl,
            imageURL: latestRepoImageURL,
            readmeContent: latestReadmeContent,
        };

        const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?per_page=10`);
        const starredData = await starredResponse.json();

        const filteredStarredRepos = starredData
            .filter(starredRepo => starredRepo.name !== latestRepoTitle)
            .slice(0, 4);

        const featuredProjects = await Promise.all(filteredStarredRepos.map(async (starredRepo) => {
            let imageURL = null;
            let readmeContent = '';

            const readmeResponse = await fetch(`https://api.github.com/repos/${username}/${starredRepo.name}/readme`, {
                headers: {
                    Accept: "application/vnd.github.v3.raw",
                },
            });

            if (readmeResponse.ok) {
                readmeContent = await readmeResponse.text();

                readmeContent = readmeContent.replace(/https:\/\/github\.com\/(.*?)\/blob\/(.*?)(\s|$)/g, 'https://raw.githubusercontent.com/$1/$2');


                const imageMatch = readmeContent.match(/!\[.*?\]\((.*?)\)/);
                imageURL = imageMatch
                    ? imageMatch[1]
                        .replace('https://github.com/', 'https://raw.githubusercontent.com/')
                        .replace(/\/blob\/(.*)/, '/$1')
                    : null;
            }

            return {
                title: starredRepo.name,
                description: starredRepo.description,
                repoUrl: starredRepo.html_url,
                imageURL: imageURL,
                readmeContent: readmeContent,
            };
        }));

        const projectData = {
            latestProject,
            featuredProjects,
        };

        localStorage.setItem(cacheKey, JSON.stringify(projectData));
        return projectData;

    } catch (error) {
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            console.log('Loading data from cache due to API limit.');
            return JSON.parse(cachedData);
        } else if (retries > 0) {
            return await fetchProjects(username, retries - 1);
        }
    }
}

function openURL(url) {
    window.open(url, '_blank'); 
}

function openOverview(content, title, setReadmeContent, setRepoTitle) {
    document.querySelectorAll('.project').forEach(project => {
        project.style.filter = 'brightness(0.5) blur(0.15rem)';
    });    

    const overviewElement = document.getElementById('overview');
    overviewElement.style.display = 'flex';
    overviewElement.classList.add('showUp'); 

    setReadmeContent(content);
    setRepoTitle(title);

    setTimeout(() => {
        overviewElement.classList.remove('showUp');
    }, 150);
}

function closeOverview() {
    const overviewElement = document.getElementById('overview');
    overviewElement.classList.add('hideDown');

    setTimeout(() => {
        document.querySelectorAll('.project').forEach(project => {
            project.style.filter = 'brightness(1) blur(0rem)';
        });
        overviewElement.style.display = 'none';
        overviewElement.classList.remove('hideDown'); 
    }, 150);
}

function LoadProjects() {
    const [fetchedProjects, setFetchedProjects] = useState(null);
    const [readmeContent, setReadmeContent] = useState('');
    const [repoTitle, setRepoTitle] = useState('');

    const array = ['one', 'two', 'three', 'four'];

    useEffect(() => {
        const getLatestRepo = async () => {
            const projects = await fetchProjects('thepropotato');
            setFetchedProjects(projects);
        };

        getLatestRepo();
    }, []);

    useEffect(() => {
        const projects = document.querySelectorAll('.project-inner');
        projects.forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.parentElement.classList.add('hovered');
            });

            project.addEventListener('mouseleave', () => {
                project.parentElement.classList.remove('hovered');
            });
        });

        return () => {
            projects.forEach(project => {
                project.removeEventListener('mouseenter', () => {
                    project.parentElement.classList.add('hovered');
                });

                project.removeEventListener('mouseleave', () => {
                    project.parentElement.classList.remove('hovered');
                });
            });
        };
    }, [fetchedProjects]);

    if (!fetchedProjects) {
        return <div>Loading projects...</div>;
    }

    return (
        <div className="container" id="projects-container">
            {fetchedProjects.featuredProjects.map((project, index) => (
                <div className="project" id={`project-${array[index]}`} key={index} onClick={() => openOverview(project.readmeContent || '', project.title, setReadmeContent, setRepoTitle)}>
                    <div className="project-inner">
                        <h2>Featured <span className="material-symbols-outlined" onClick={() => openURL(project.repoUrl)}>north_east</span></h2>
                        <div>
                            <h1>{project.title || `Project ${array[index]}`}</h1>
                            <p className="project-description">{project.description || `Description for project ${index + 1}`}</p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="project" id="project-recent">
                <div className="project-inner">
                    <h2>Latest <span className="material-symbols-outlined" onClick={() => openURL(fetchedProjects.latestProject.repoUrl)}>north_east</span></h2>
                    <img src={fetchedProjects.latestProject.imageURL || fallback_background} alt="Latest Project" id="recent-project-image"/>
                    <div>
                        <h1>{fetchedProjects.latestProject.title || 'Project Title'}</h1>
                        <p className="project-description">{fetchedProjects.latestProject.description || 'Project Description'}</p>
                    </div>
                </div>
            </div>

            <div id="overview">
                <div id="head-panel">
                    <h1>Details | {repoTitle || 'Project Title'}</h1>
                    <button onClick={closeOverview}>
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div id="info">
                    <pre dangerouslySetInnerHTML={{ __html: marked(readmeContent || 'No README content available.') }} />
                </div>
            </div>
        </div>
    );
}

export default LoadProjects;