
import React from 'react'
// import ReactDOM from 'react-dom'
import './App.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useSpeechSynthesis} from 'react-speech-kit';
//import Logo from './images'



function App() {
  const [advice, setAdvice] = useState('');
  const { speak, speaking } = useSpeechSynthesis();

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    axios
      .get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;
        setAdvice(advice);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const speakAdvice = () => {
    if (!speaking) {
      speak({ text: advice });
    }
  };

  return (
    <div className="app">
      <img alt="" className="logo"></img>
       <div className="card">
        <h2 className="heading">{advice}</h2>
        <button className="button" onClick={fetchAdvice}>
          <span style={{fontSize: 15}}>Generate</span>
        </button>
        <button className="button" onClick={speakAdvice}>
          <span style={{fontSize: 15}}>Narrate</span>
        </button>
      </div>
    </div>
  );
}

export default App;
