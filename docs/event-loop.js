document.querySelector('button').addEventListener('click', () => console.log('Clicked!'));

console.log('started counting!');
for (let i = 0; i < 1000000000; i += 0.5) {}
console.log('done counting!');
