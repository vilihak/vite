import './style.css';
import { fetchData } from './fetch.js';

// FORMAT DATE
function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// Helper function to create and append entry element
function createEntryElement(entry, container) {
  const date = new Date(entry.entry_date);
  const formattedDate = formatDate(date);

  const entryElement = document.createElement('div');
  entryElement.innerHTML = `Date: ${formattedDate}<br>Mood: ${entry.mood}<br>Weight: ${entry.weight} kg<br>Sleep: ${entry.sleep_hours} hours<br>Notes: ${entry.notes}`;
  container.appendChild(entryElement);
}

// ALL ENTRIES
const getEntries = async function () {
  const token = localStorage.getItem('token');
  const entries = await fetchData('http://localhost:3000/api/entries', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  // CLEAR THE ENTRIES
  const entriesContainer = document.getElementById('entriesContainer');
  entriesContainer.innerHTML = '';

  entries.forEach(entry => createEntryElement(entry, entriesContainer));
};

document.getElementById('loadEntriesButton').addEventListener('click', getEntries);

// DISPLAY NAME
window.onload = function() {
  const username = localStorage.getItem('username');
  if (username) {
    const welcomeDiv = document.querySelector('.welcome');
    welcomeDiv.textContent = `Hello, ${username}`;
  }
};

// LOGOUT USER
const logoutUser = async (evt) => {
  evt.preventDefault();
  console.log('Logging out');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};

document.getElementById("logoutBtn").addEventListener("click", logoutUser);

// LOGIN USER
const loginUser = async (evt) => {
  evt.preventDefault();
  console.log('Logging in');

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
      alert('Login successful!');
      location.reload(); // Add this line to reload the page
    }
  } catch (error) {
    console.error(error);
  }
};

document.querySelector('.loginuser').addEventListener('click', loginUser);

// NEW DIARY ENTRY
const createNewDiaryEntry = async function(event) {
  console.log('createNewDiaryEntry called'); 
  event.preventDefault();

  const mood = document.getElementById('mood').value;
  console.log('mood', mood);
  let weight = document.getElementById('weight').value; 
  weight = weight ? parseFloat(weight) : null; 
  const sleep_hours = document.getElementById('sleep_hours').value;
  const notes = document.getElementById('notes').value;

  const token = localStorage.getItem('token');
  const date = new Date();
  const formattedDate = formatDate(date);

  const response = await fetch('http://localhost:3000/api/entries', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
          mood: mood,
          weight: weight,
          sleep_hours: sleep_hours,
          notes: notes,
          entry_date: formattedDate,
      }),
  });

  if (!response.ok) {
      const message = await response.text();
      alert(`Failed to create new diary entry: ${message}`);
  } else {
      alert('New diary entry created successfully');
  }
};

document.querySelector('.new-diary-form').addEventListener('submit', createNewDiaryEntry);