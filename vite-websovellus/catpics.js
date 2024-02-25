export function showPics(element) {
  // version 2, where the DOM element is created itself
  async function createPics() {
      console.log('Creating images on the fly!');

      try {
          // fetch
          const response = await fetch('catpics.json');
          if (!response.ok) throw new Error('Bad search!!');
          const images = await response.json();

          const card = document.querySelector('#cards');
          card.innerHTML = '';

          console.log(images);

          images.forEach(image => {
              console.log(`Name: ${image.name}`);

              // create figure element
              const figure = document.createElement('figure');
              card.appendChild(figure);

              // create img element
              const imageElement = document.createElement('img')
              imageElement.src = image.address;
              imageElement.alt = image.name;
              figure.appendChild(imageElement);

              // create figcaption element
              const figurecaption = document.createElement('figcaption');
              const node = document.createTextNode(image.description);
              figurecaption.appendChild(node);
              figure.appendChild(figurecaption);
          });
      } catch (error) {
          console.log(error);
      }
  }

  console.log(element);
  element.addEventListener('click', () => createPics());
}