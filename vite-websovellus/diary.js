export function showDiary(buttonElement) {
    buttonElement.addEventListener('click', function() {
      fetch('http://localhost:3000/api/entries') 
        .then(response => response.json())
        .then(data => {
          const cardArea = document.querySelector('.card-area');
          data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
  
            const cardImg = document.createElement('div');
            cardImg.className = 'card-img';
            const img = document.createElement('img');
            img.src = item.address;
            img.width = '136';
            img.alt = 'Gym-Cat';
            cardImg.appendChild(img);
  
            const cardDiary = document.createElement('div');
            cardDiary.className = 'card-diary';
            const p = document.createElement('p');
            p.textContent = item.description; 
            cardDiary.appendChild(p);
  
            card.appendChild(cardImg);
            card.appendChild(cardDiary);
            cardArea.appendChild(card);
          });
        })
        .catch(error => console.error('Error:', error));
    });
  }