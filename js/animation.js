export const points = () => {
    const numDots = 160;

    for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.left = `${Math.random() * 100}vw`;
        dot.style.top = `${Math.random() * 100}vh`;
        dot.style.animationDuration = `${5 + Math.random() * 10}s`;
        dot.style.width = dot.style.height = `${Math.random() * 3 + 2}px`;
        document.body.appendChild(dot);
    }
}