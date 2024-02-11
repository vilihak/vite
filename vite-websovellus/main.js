import './style.css';
import './my-style.css';

export async function getJoke() {
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const joke = await response.json();
      document.getElementById('jokeText').textContent = joke.value;
    } catch (error) {
      console.error('Error:', error);
    }
  }