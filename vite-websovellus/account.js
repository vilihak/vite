import { fetchData } from './fetch.js';

// ACCOUNT INFO ON SITE
const getAccountInfo = async function () {
  try {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); 

    if (!token || !username) {
      console.error('Token or username not found in localStorage. User may not be logged in.');
      return;
    }

    const accountInfo = await fetchData('http://localhost:3000/api/users', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    const user = accountInfo.find(u => u.username === username);
    console.log(accountInfo);

    if (user) {
      document.querySelector('.usernameInfo').textContent = `Username: ${user.username}`;
      document.querySelector('.emailInfo').textContent = `Email: ${user.email}`;
      document.querySelector('.createdAtInfo').textContent = `Created At: ${user.created_at}`;
    } else {
      console.error(`Logged-in user with username '${username}' not found in the user data`);
    }
  } catch (error) {
    console.error('Error fetching account information:', error.message);
  }
};

// LOGIN USER
const loginUser = document.querySelector('.loginuser');
const token = localStorage.getItem('token');
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
      Authorization: 'Bearer ' + token,
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

      

      // Create a new div element
      const userDetailsDiv = document.createElement('div');
      // Set its innerHTML to the user details, with line breaks
      userDetailsDiv.innerHTML = `Username: ${jsonData.user.username}<br>Email: ${jsonData.user.email}<br>Created At: ${jsonData.user.created_at}`;

      const userDetailsContainer = document.getElementById('userDetails');
      userDetailsContainer.appendChild(userDetailsDiv);
      alert('Login successful!');
    }
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
  localStorage.removeItem('token');
  localStorage.removeItem('username');
});



