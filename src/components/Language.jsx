import React, {useState} from 'react'

export default function Language({ changeLanguage }) {
    const [language, setLanguage] = useState('eng');
    const handleChange = (lang) => {
        setLanguage(lang);
        changeLanguage(lang)
    }

    return (
      <div className="changeLanguage">
        <div
            className={`item ${language === 'ru' ? 'active' : ''}`}
            onClick={() => handleChange('ru')}
        >
            RU
        </div>
        <div
            className={`item ${language === 'eng' ? 'active' : ''}`} 
            onClick={() => handleChange('eng')}
        >
            ENG
        </div>
      </div>
    )
}
