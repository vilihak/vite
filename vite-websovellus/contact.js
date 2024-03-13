import './style.css';
import { fetchData } from './fetch.js';

// LOGIN USER
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  const url = 'http://127.0.0.1:3000/api/auth/login';

  const form = document.querySelector('.login_form_navbar');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetchData(url, options);
    const jsonData = response;
    const token = jsonData?.token;
  
    if (!token) {
      alert('Unauthorized: username or password incorrect!');
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('username', jsonData.user.username);
      console.log('loginResponse', `localStorage set with token value: ${token}`);
      console.log('User Details:', jsonData.user); 
      alert('Login successful!');
    }
  } catch (error) {
    console.error(error);
  }
});


// LOGOUT USER
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  console.log('Nyt kirjaudutaan ulos');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
});