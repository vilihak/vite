import { fetchData } from './fetch.js';


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


// GET ACCOUNT DETAILS
const getAccountDetailsBtn = document.getElementById('getAccountDetails');

getAccountDetailsBtn.addEventListener('click', async () => {
  const token = localStorage.getItem('token');

  // Decode the token to get the user ID
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(window.atob(base64));
  const userId = payload.user_id;

  const url = `http://localhost:3000/api/users/${userId}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();

    const userDetailsDiv = document.createElement('div');
    userDetailsDiv.innerHTML = `Username: ${jsonData.username}<br>Email: ${jsonData.email}<br>Created At: ${jsonData.created_at}`;

    const userDetailsContainer = document.getElementById('userDetails');
    userDetailsContainer.innerHTML = '';
    userDetailsContainer.appendChild(userDetailsDiv);
  } catch (error) {
    console.error(error);
  }
});

// CHANGE EMAIL
const changeEmailForm = document.getElementById('changeEmailForm');

changeEmailForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const username = evt.target.username.value;
  const password = evt.target.password.value;
  const newEmail = evt.target.newEmail.value;

  const data = {
    username: username,
    password: password,
    email: newEmail,
  };

  const token = localStorage.getItem('token');

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token, 
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch('http://localhost:3000/api/users', options);
    if (!response.ok) {
      throw new Error('Failed to update email');
    }
    alert('Email updated successfully');
  } catch (error) {
    console.error(error);
    alert('Failed to update email');
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


