// Cursor LED Global
const led = document.createElement('div');
led.id = 'cursor-led';
document.body.appendChild(led);

document.addEventListener('mousemove', (e) => {
    led.style.left = e.clientX + 'px'; 
    led.style.top = e.clientY + 'px';
});

// Recupera o tema (cor) salvo do time
const savedColor = localStorage.getItem('themeColor');
if(savedColor) document.documentElement.style.setProperty('--main-color', savedColor);