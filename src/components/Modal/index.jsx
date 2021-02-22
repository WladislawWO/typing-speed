import React from 'react'
import { CloseSvg } from '../assets'

export default function Modal({ open, words, setOpen}) {
    return (
        <div className={`modal ${open}`}>
            <div 
                className="close-modal"
                onClick={() => setOpen(false)}
            >
                <CloseSvg />
            </div>
            Congrat! Your typing speed - {words}
        </div>
    )
}
