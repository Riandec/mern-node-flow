import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../context/Message';

function Input() {
    const navigate = useNavigate();
    const [inputMessage, setInputMessage] = useState('');
    const { setMessage } = useMessage();

    const sendOptions = [
        { src: "/images/line.png", text: "Line", path: "/line" },
        { src: "/images/facebook.png", text: "Facebook", path: "/facebook" },
        { src: "/images/discord.png", text: "Discord", path: "/discord" },
        { src: "/images/output.png", text: "Output", path: "/output" },
    ];

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };
    
    const handleOptionClick = (path) => {
        setMessage(inputMessage);
        navigate(path);
    };

  return (
    <div className="Input">
        <div className="Input__title">
            Input
        </div>
        <div>
            <label>Message: <input type="text" value={inputMessage} onChange={handleInputChange} /></label>
        </div>
        <div className="SendContainer">
            <p>Send to: </p>
            <div className="SendOptions">
                {sendOptions.map(({ src, text, path }, index) => (
                    <div className="SendOption" key={index} onClick={() => handleOptionClick(path)}>
                        <img src={src} alt={text} />
                        <span>{text}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Input