function createTable(data) {
  console.log(data);

  // etitään tbody elementti
  const tbody = document.querySelector('.tbody');

  // loopissa luodaan jokaiselle tietoriville oikeat elementit
  // elementtien sisään pistetään oikeat tiedot

  data.forEach((rivi) => {
    console.log(rivi.user_id, rivi.username, rivi.user_level);

    // Luodaan jokaiselle riville ensin TR elementti alkuun
    const tr = document.createElement('tr');

    // Luodaan soluja mihihin tiedot
    const td1 = document.createElement('td');
    td1.innerText = rivi.username;

    // Luodaan soluja mihihin tiedot
    const td2 = document.createElement('td');
    td2.innerText = rivi.user_level;

    // <td><button class="check" data-id="2">Info</button></td>
    // const td3 = document.createElement('td');
    //td3.innerHTML = `<button class="check" data-id="${rivi.user_id}">Info</button>`;

    const td3 = document.createElement('td');
    const button1 = document.createElement('button');
    button1.className = 'check';
    button1.setAttribute('data-id', rivi.user_id);
    button1.innerText = 'Info';
    td3.appendChild(button1);

    button1.addEventListener('click', getUser);

    // td4
    const td4 = document.createElement('td');
    const button2 = document.createElement('button');
    button2.className = 'del';
    button2.setAttribute('data-id', rivi.user_id);
    button2.innerText = 'Delete';
    td4.appendChild(button2);

    // 2. Lisää kuuntelija kun taulukko on tehty
    button2.addEventListener('click', deleteUser);

    // td5
    var td5 = document.createElement('td');
    td5.innerText = rivi.user_id;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);
  });
}

function getUser() {
  console.log('Haet tietoa');
}

function deleteUser() {
  console.log('Deletoit tietoa');
}