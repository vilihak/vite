export function setupCounter(element) {
  const setCounter = (count) => {
    console.log('I amm here');
  };
  element.addEventListener('click', () => setCounter());
}
