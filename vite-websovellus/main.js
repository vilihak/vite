import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { showJoke } from './joke.js';
import { showPics } from './catpics.js';
import { showDiary } from './diary.js'; 

document.querySelector('#app').innerHTML = 'Moi täällä ollaan';

let element = document.querySelector('.chuck');
console.log(element);
showJoke(element);
showJoke(document.querySelector('.toinen'));

const picsButton = document.querySelector('.pics');
showPics(picsButton);

showDiary(document.querySelector('.diary'));