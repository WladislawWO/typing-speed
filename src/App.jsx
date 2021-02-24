import React, { useState, useEffect } from 'react';
import './App.scss';
import Controlls from './components/Controlls';
import Language from './components/Language';
import Modal from './components/Modal';
import { getWords } from './utils';

const initialTyping = { value: '', mistake: '', startTyping: false };

function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [result, setResult] = useState(0);
  const [typing, setTyping] = useState(initialTyping);
  const [words, setWords] = useState(getWords('eng'));
  const [writtenWords, setwrittenWords] = useState([]);

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
      setwrittenWords((i) => [typing, ...i]);
      setTyping({...initialTyping, startTyping: true});
      if(words[0] === " ") setWords((words) => words.slice(1));
      else setWords((words) => words.slice(words.indexOf(" ") + 1));
    }
  }, [value]);

  const handleTimeOut = () => {
    setResult(writtenWords);
    setOpen(true);
    setValue({});
    setTyping(initialTyping)
    setwrittenWords([]);
    setTimeout(() => setOpen(false), 4000);
  }

  useEffect(() => {
   document.addEventListener("keydown", (e) => setValue(e));
  }, [])

  return (
    <div className="App">
      <Language changeLanguage={(lang) => setWords(getWords(lang))} />
      <div className="wrapper">
        <Controlls
          writtenWords={writtenWords}
          handleTimeOut={handleTimeOut}
          typing={typing}
        />
        <div className="container" >
          <div className="writtenWords">
            <div className={`typing ${typing.mistake ? 'mistake' : ''}`}>{typing.value + typing.mistake}</div>
            {writtenWords.map((item, i) => <span key={i}>{item.value + item.mistake}</span>)}
          </div>
          <div className="words">{words}</div>
        </div>
      </div>
      <Modal
        open={open}
        words={result}
        setOpen={setOpen}
        typing={typing}
      />
    </div>
  );
}

export default App;
