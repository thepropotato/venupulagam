import React, { useRef, useState, useEffect } from "react";
import '../styles/about-styles.css'
import techStack from "../about-page-codes/tech-stack.js";
import hobbies from "../about-page-codes/hobbies.js"
import others from "../about-page-codes/others.js"
import resume from "../about-page-codes/Venu Pulagam - Resume.pdf"

let codes = {
    'Tech Stack.py' : techStack,
    'Hobbies.java': hobbies,
    'Other Engagements.js' : others,
    'Resume.pdf' : resume,
    'README.md' : 'readme'
}

const techStack_out = {
    "OS" : ["Ubuntu/Linux", "Windows"],
    "LANGUAGES": ["Java", "Python", "C/C++", "CSS3", "HTML5", "Scala", "Matlab", "JavaScript"],
    "TECH_STACK": ["React JS", "Machine Learning", "Deep Learning", "Transfer Learning", "LLMs", "Apache Spark", "Tkinter", "OOP", "Boto3", "Youtube V3", "FlutterFlow", "UI/UX Design"],
    "CLOUD": ["AWS", "Google Cloud", "Azure"],
    "DATABASES": ["MySQL", "NoSQL", "MongoDB"],
    "OTHERS": ["Markdown", "Git", "Photo Editing", "Scratch", "PicsArt", "Video Editing", "PhotoShop"]
}

const hobbies_out = {
    "Creative": ["Film-making", "Editing", "Poster design"],
    "Leisure": ["Listening to music", "Watching films"],
    "Writing": ["Writing scripts"],
    "Technical": ["Programming", "Web design", "Web development"],
}

const others_out = {
    "September 2024" : ['Directed a Short film, Anokha Techfest', 'Winner of Best Film Award'],
    "March 2023" : ['Led the Gokulashtami banner team', 'Award for Best Props'],
    "August 2023" : ['Directed a Short film, Anokha Techfest', 'Participated']
}

const outputs = {
    'Tech Stack.py' : techStack_out,
    'Hobbies.java': hobbies_out,
    'Other Engagements.js' : others_out
}

const highlightCodeLines = (lines) => {
    return lines.map(line => {

        line = line.replaceAll(' ', '&nbsp;')

        if (line.startsWith('#') || line.startsWith('//')) {
            line = line
                .replaceAll(/(^|\s)(#.*$|\/\/.*$)/gm, '$1<span class="comment">$2</span>');
        } else {

            line = line
                .replaceAll(/"(.*?)"/g, '<span class="string">"$1"</span>')
                .replaceAll(/'(.*?)'/g, '<span class="string">"$1"</span>');

            line = line
                .replaceAll(/(^|\s)(#.*$|\/\/.*$)/gm, '$1<span class="comment">$2</span>');

            line = line
                .replaceAll(/\b(def|with|else|if|for|return|from|import|in|or|to|as|public|String|int|while|void|then|catch|fetch|function|const|let|var)\b/g, '<span class="keyword">$1</span>');

            line = line
                .replaceAll(/\(/g, '<span class="punctuation">(</span>')
                .replaceAll(/\)/g, '<span class="punctuation">)</span>')
                .replaceAll(/{/g, '<span class="punctuation">{</span>')
                .replaceAll(/}/g, '<span class="punctuation">}</span>')
                .replaceAll(/,/g, '<span class="punctuation">,</span>')
                .replaceAll(/:/g, '<span class="punctuation">:</span>');
            }

        return line;
    });
};

function LoadAbout() {

    const [warningOpened, setWarningOpened] = useState(false)
    const [highlightedCode, setHighlightedCode] = useState([]);
    const [openedFiles, setOpenedFiles] = useState(['README.md']);
    const [activeFile, setActiveFile] = useState(['README.md']);
    const [terminalOutput, setTerminalOuput] = useState('')

    const codeRef = useRef(null);
    const popupRef = useRef(null);

    let code = codes[activeFile];

    function modifyWindow(file_name) {
        setActiveFile(file_name);
    
        if (!openedFiles.includes(file_name)) {
            setOpenedFiles([...openedFiles, file_name]);
        }
    }
    
    useEffect(() => {
        document.querySelectorAll('.editor-head-button').forEach((el) => {
            el.classList.remove('active-file');
        });
    
        const activeFileElement = document.getElementById(activeFile);
        if (activeFileElement) {
            activeFileElement.classList.add('active-file');
        }
    }, [activeFile]);  

    function closeWindow(file_name) {
        const index = openedFiles.indexOf(file_name);
        if (index > 0) {
            setOpenedFiles(openedFiles.filter(item => item !== file_name));
            setActiveFile(openedFiles[index - 1]);
        }
    }

    function showOutput() {
        const formattedOutput = Object.entries(outputs[activeFile]).map(([key, value]) => {
            return `${key} : ${
                Array.isArray(value)
                ? JSON.stringify(value).replaceAll('"', '').replaceAll(',', ', ').replaceAll('\n', '<br />')
                : value.replaceAll('"', '').replaceAll(',', ', ').replaceAll('\n', '<br />')
            }<br />`;
        }).join('');
    
        let file_extension = activeFile.split('.')[1];
        let run_command = "";
    
        if (file_extension === 'java') {
            run_command = `<span class='run-command'>javac</span> ${activeFile} && <span class='run-command'>java</span> ${activeFile.split('.')[0]}`;
        } else if (file_extension === 'py') {
            run_command = `<span class='run-command'>python</span> ${activeFile}`;
        } else if (file_extension === 'js') {
            run_command = `<span class='run-command'>node</span> ${activeFile}`;
        }
    
        setTerminalOuput(prev => prev + `<p class="terminal-default">PS C:\\venupulagam\\portfolio> ${run_command}</p>` + '<br />' + formattedOutput + '<br />');

        setTimeout(() => {
            const terminalOutputDiv = document.getElementById('terminal-output');
            if (terminalOutputDiv) {
                terminalOutputDiv.scrollTop = terminalOutputDiv.scrollHeight;
            }
        }, 0);
    }    
    
    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.display = warningOpened ? 'flex' : 'none';
        }
    }, [warningOpened, popupRef]);    

    useEffect(() => {
        if (code !== resume && code !== 'readme') {
            const codeLines = highlightCodeLines(code);
            setHighlightedCode(codeLines);
        }
        if (code === 'readme') {
            modifyWindow('README.md');
        }
    }, [code]);    

    return (
        <div className="container" id="about-container">
            <div id="vs-code-container">

                <div id="other-buttons-popup" ref={popupRef}>
                    <div id="warning-head"><p>Warning</p><button className="material-symbols-outlined" id="close-popup-button" onClick={() => setWarningOpened(false)}>close</button></div>
                    <div id="warning-content">
                        <p>This is a demo version of VS Code. Some features may not work as expected.</p>
                        <p>To get the full experience, please download the official VS Code from <a href="https://code.visualstudio.com">https://code.visualstudio.com</a>.</p>
                    </div>
                </div>

                <div id="header-row">
                    <p id="mac-menu">
                        <span onClick={() => setWarningOpened(true)}>&middot;</span>
                        <span onClick={() => setWarningOpened(true)}>&middot;</span>
                        <span onClick={() => setWarningOpened(true)}>&middot;</span>
                    </p>
                    <p id="window-name">{`${activeFile} - Visual Studio Code`}</p>
                    <p></p>
                </div>
                
                <div id="vs-code-window">
                    <div id="menu-panel">
                        <div>
                            <span className="material-symbols-outlined" onClick={() => setWarningOpened(true)}>file_copy</span>
                            <span className="material-symbols-outlined" onClick={() => setWarningOpened(true)}>search</span>
                            <span className="material-symbols-outlined" onClick={() => setWarningOpened(true)}>play_arrow</span>
                            <span className="material-symbols-outlined" onClick={() => setWarningOpened(true)}>extension</span>
                        </div>
                        <div>
                            <span className="material-symbols-outlined" onClick={() => setWarningOpened(true)}>account_circle</span>
                            <span className="material-symbols-outlined" onClick={() => setWarningOpened(true)}>settings</span>
                        </div>
                    </div>
                    
                    <div id="left-panel">
                        <button><span>EXPLORER</span> <span>&middot;&middot;&middot;</span></button>
                        <button onClick={() => modifyWindow('Tech Stack.py')}>Tech Stack.py</button>
                        <button onClick={() => modifyWindow('Hobbies.java')}>Hobbies.java</button>
                        <button onClick={() => modifyWindow('Other Engagements.js')}>Other engagements.js</button>
                        <button onClick={() => modifyWindow('Resume.pdf')}>Resume.pdf</button>
                        <button onClick={() => modifyWindow('README.md')}>README.md</button>
                    </div>

                    <div id="right-panel">
                        <div id="editor">
                            <div id="editor-head">
                            <div id="opened-files">
                            <div id="opened-files">
                            {openedFiles.map((file) => (
                                <div className="editor-head-button" id={file} key={file}>
                                    <button onClick={() => modifyWindow(file)}>{file}</button>
                                    <button
                                        className="material-symbols-outlined"
                                        id="close-window-button"
                                        onClick={() => closeWindow(file)}
                                    >
                                        close
                                    </button>
                                </div>
                                ))}
                            </div>
                        </div>


                        <div id="run-buttons">
                            {activeFile === 'Resume.pdf' || activeFile === 'README.md' ? (
                                null
                            ) : (
                                <>
                                    <button className="material-symbols-outlined" onClick={() => showOutput()}>play_arrow</button>
                                    <button className="material-symbols-outlined" onClick={() => setWarningOpened(true)}>splitscreen_right</button>
                                </>
                            )}
                            </div>
                        </div>
                            
                        <div id="code-editor" ref={codeRef}>
                            {activeFile === 'Resume.pdf' ? (
                                <iframe title="Venu Pulagam - Resume" src={resume} className="resume-iframe" />
                            ) : activeFile === 'README.md' ? (
                                <div className="readme">
                                    <div>
                                        <h1>Welcome to my About section.</h1>
                                        <p>Explore more about me while enjoying a VS Code-themed experience.</p>
                                        <ol>
                                            <li key='point-one'>Open any file from the Explorer.</li>
                                            <li key='point-two'>Run the code to see the results.</li>
                                            <li key='point-three'>Each file's output corresponds to its name</li>
                                            <li key='point-four'>For example, the output for Hobbies.java will reveal my hobbies.</li>
                                        </ol>
                                    </div>
                                </div>
                            ) : (
                                highlightedCode.map((line, index) => (
                                    <div className="code-row" key={index}>
                                        <div className="number-column">
                                            {index + 1}
                                        </div>
                                        <div className="code-column" dangerouslySetInnerHTML={{ __html: line }} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div id="terminal">
                        <div id="terminal-options">
                            <button onClick={() => setWarningOpened(true)}>problems</button>
                            <button onClick={() => setWarningOpened(true)}>output</button>
                            <button>terminal</button>
                            <button onClick={() => setWarningOpened(true)}>debug console</button>
                        </div>

                        <div id="terminal-output" dangerouslySetInnerHTML={{__html : terminalOutput}}>
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoadAbout;