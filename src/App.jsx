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

const initialTyping = { value: '', mistake: '' };

function App() {
  const ref = useRef(null);
  const [value, setValue] = useState({});
  const [language, setLanguage] = useState('eng');
  const [typing, setTyping] = useState(initialTyping);
  const [words, setWords] = useState(getWords(language));
  const [writenWords, setWritenWords] = useState(0);

  useEffect(() => {
    console.log(value)
    const { key, keyCode } = value;
    if((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123)) {
      if(key === words[0] && !typing.mistake) {
        setTyping((i) => ({...i, value: i.value + key}));
        setWords((words) => words.slice(1));
      }else {
        setTyping((i) => ({...i, mistake: i.mistake + key}));
      }
    } else if(keyCode === 8) {
      if(typing.mistake) setTyping((i) => ({...i, mistake: i.mistake.slice(0, -1)}));
      else if(typing.value) {
        setTyping((i) => ({...i, value: i.value.slice(0, -1)}));
        setWords(typing.value.slice(-1) + words);
      }
    } else if(keyCode === 32) {
      setWritenWords(writenWords + 1);
      setTyping(initialTyping);
      setWords((words) => words.slice(1));
    }
  }, [value]);

  const handleClick = () => ref && ref.current && ref.current.focus();

  const changeLanguage = (lang) => {
    setWords(getWords(lang));
    setLanguage(lang);
  }

  useEffect(() => {
   document.addEventListener("keydown", (e) => setValue(e));
  }, [])

  return (
    <div className="App">
      <div className="changeLanguage">
        <div className={`item ${language === 'ru' ? 'active' : ''}`} onClick={() => changeLanguage('ru')}>RU</div>
        <div className={`item ${language === 'eng' ? 'active' : ''}`} onClick={() => changeLanguage('eng')}>ENG</div>
      </div>
      <div className="wrapper">
        <div className="score">
          {writenWords} Words
        </div>
        <div className="container" onClick={handleClick}>
          <div className="writenWords">
            <div className={`typing ${typing.mistake ? 'mistake' : ''}`}>{typing.value + typing.mistake}</div>
          </div>
          <div className="words">{words}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
