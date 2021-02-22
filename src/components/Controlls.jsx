import React, {useEffect, useState} from 'react'

export default function Controlls({ writenWords, handleTimeOut }) {
    const [timer, setTimer] = useState(60);

    useEffect(() => {
          const interval = setInterval(() => setTimer((timer) => timer - 1), 1000);
          setTimeout(() => {
              clearInterval(interval);
              handleTimeOut();
          }, 60000);
      }, []);

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
