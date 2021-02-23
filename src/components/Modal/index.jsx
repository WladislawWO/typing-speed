import React from 'react'
import './styles.scss';

export default function Modal({ open, words, setOpen}) {
    return (
        <div className={`modal ${open ? 'active' : ''}`}>
            <div 
                className="close-modal"
                onClick={() => setOpen(false)}
            >
            </div>
            Congrat! Your typing speed - {words}
        </div>
    )
}
