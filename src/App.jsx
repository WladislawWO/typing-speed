import React, { useState, useEffect } from 'react';
import './App.scss';
import Controlls from './components/Controlls';
import Language from './components/Language';
import { getWords } from './utils';

const initialTyping = { value: '', mistake: '', startTyping: false };

function App() {
  const [value, setValue] = useState({});
  const [typing, setTyping] = useState(initialTyping);
  const [words, setWords] = useState(getWords('eng'));
  const [writenWords, setWritenWords] = useState(0);

  useEffect(() => {
    const { key, keyCode } = value;
    if((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123)) {
      if(key === words[0] && !typing.mistake) {
        setTyping((i) => ({...i, value: i.value + key, startTyping: true}));
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

  useEffect(() => {
   document.addEventListener("keydown", (e) => setValue(e));
  }, [])

  return (
    <div className="App">
      <Language changeLanguage={(lang) => setWords(getWords(lang))} />
      <div className="wrapper">
        <Controlls writenWords={writenWords} />
        <div className="container" >
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
