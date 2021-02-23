import React, {useEffect, useState} from 'react'
import {usePrevious} from "../hooks"

export default function Controlls({ writenWords, handleTimeOut, typing }) {
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
            {writenWords}
            <div className="text">Words</div>
          </div>
          <div className="controll">
            {timer}
            <div className="text">Seconds</div>
          </div>
        </div>
    )
}
