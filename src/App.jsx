import React, { useState, useRef, useEffect } from 'react';
import './App.scss';
import data from './words.json';
import rusData from './rus.json';

const getWords = (lang) => {
  return Array.from(Array(100), () => {
    const words = lang === "ru" ? rusData : data;
    return (words[Math.floor(Math.random() * 3000)])
  }).join(" ");
}

function App() {
  const ref = useRef(null);
  const [language, setLanguage] = useState('eng');
  const [typing, setTyping] = useState({ value: '', mistake: '' });
  const [words, setWords] = useState(getWords(language));
  // const [timer, setTime] = useState(60);
  const [writenWords, setWritenWords] = useState('');

  const handleChange = (e) => {
    console.log({e, typing})
    const { key, keyCode } = e;
    if((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123)) {
      setTyping((i) => ({...i, value: i.value + key}));
      if(key === words[0]) {
        setWords((words) => words.slice(1));
        setWritenWords(writenWords + key);
      }else {
        setTyping((i) => ({...i, mistake: i.mistake + key}));
      }
    } else if(keyCode === 8) {
      if(typing.mistake) setTyping((i) => ({...i, mistake: i.mistake.slice(0, -1)}));
      else if(typing.value) setTyping((i) => ({...i, mistake: i.mistake.slice(0, -1)}));
    }
  }

  const handleClick = () => ref && ref.current && ref.current.focus();

  // const [seconds, setSeconds] = useState(5);

  // useEffect(() => {
  //   if(writenWords.length === 1) {
  //     const interval = setInterval(() => {
  //       setSeconds(seconds => seconds - 1);
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [writenWords.length]);

  const changeLanguage = (lang) => {
    setWords(getWords(lang));
    setLanguage(lang);
  }

  useEffect(() => {
   document.addEventListener("keydown", (e) => handleChange(e));
  }, [])

  return (
    <div className="App">
      <div className="changeLanguage">
        <div className={`item ${language === 'ru' ? 'active' : ''}`} onClick={() => changeLanguage('ru')}>RU</div>
        <div className={`item ${language === 'eng' ? 'active' : ''}`} onClick={() => changeLanguage('eng')}>ENG</div>
      </div>
      <div className="wrapper">
        <div className="score">
          {writenWords.length}
          {/* <span>{seconds}</span> */}
        </div>
        <div className="container" onClick={handleClick}>
          <div className="writenWords">
            <div className={`typing ${typing.mistake ? 'mistake' : ''}`}>{typing.value}</div>
          </div>
          {/* <input onChange={handleChange} value={value} autoFocus ref={ref} /> */}
          <div className="words">{words}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
