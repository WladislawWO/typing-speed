import data from '../words.json';
import rusData from '../rus.json';

export const getWords = (lang) => {
  return Array.from(Array(100), () => {
    const words = lang === "ru" ? rusData : data;
    return (words[Math.floor(Math.random() * 3000)])
  }).join(" ");
}
