const button = document.querySelector('button');
function clicked() {
    console.log('Clicked!');
}
button.addEventListener('click', clicked);

console.log('started counting!');
for (let i = 0; i < 1000000000; i += 0.5) {}
console.log('done counting!');
