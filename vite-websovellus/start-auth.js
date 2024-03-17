import './style.css';
import { fetchData } from './fetch.js';


// CREATE USER
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt luodaan käyttäjä');

  const url = 'http://localhost:3000/api/users';

  const form = document.querySelector('.create_user_form');
  const username = form.querySelector('input[name=username]').value;

  const data = {
    username: username,
    password: form.querySelector('input[name=password]').value,
    email: form.querySelector('input[name=email]').value,
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
    console.log(response);
    alert('User created!');
  } catch (error) {
    console.error(error);
  }
});


// LOGIN USER
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  const url = 'http://localhost:3000/api/auth/login';

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
    console.log(response);
    const jsonData = response;
    console.log(jsonData);
    const token = jsonData?.token;
  
    if (!token) {
      alert('Unauthorized: username or password incorrect!');
    } else {
      localStorage.setItem('token', token);
      localStorage.setItem('username', jsonData.user.username);
      console.log('loginResponse', `localStorage set with token value: ${token}`);
      alert('Login succesful!');
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
  alert('Logged out!');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
});
