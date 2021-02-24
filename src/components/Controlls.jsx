import React, {useEffect, useState} from 'react'
import {usePrevious} from "../hooks"

export default function Controlls({ writtenWords, handleTimeOut, typing }) {
    const [timer, setTimer] = useState(60);
    const prev = usePrevious(typing);

    useEffect(() => {
      if(typing.startTyping && !prev.startTyping) {
        const interval = setInterval(() => setTimer((timer) => timer - 1), 1000);
        setTimeout(() => {
            clearInterval(interval);
            handleTimeOut();
            setTimer(60)
        }, 60000);
      }
    }, [typing]);

    return (
        <div className="controlls">
          <div className="controll">
            {writtenWords.length}
            <div className="text">Words</div>
          </div>
          <div className="controll">
            {writtenWords.reduce((a,b) => a + b.value.length, 0) + typing.value.length}
            <div className="text">Chars</div>
          </div>
          <div className="controll">
            {timer}
            <div className="text">Seconds</div>
          </div>
        </div>
    )
}
