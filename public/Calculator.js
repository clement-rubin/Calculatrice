function createFloatingNumbers() {
    const container = document.createElement('div');
    container.className = 'floating-numbers';
    document.body.appendChild(container);

    setInterval(() => {
        const number = document.createElement('div');
        number.className = 'floating-number';
        number.textContent = Math.floor(Math.random() * 10);
        number.style.left = Math.random() * 100 + 'vw';
        number.style.animationDuration = (Math.random() * 5 + 10) + 's';
        container.appendChild(number);

        setTimeout(() => {
            number.remove();
        }, 15000);
    }, 500);
}

createFloatingNumbers();