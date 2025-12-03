// MATRIX BACKGROUND ANIMATION
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Set the width and height of the canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create an array of characters (hexadecimal + cyberpunk symbols)
const characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "∆", "Σ", "Π", "Ω"];

// Create an array of columns
let columns = Math.floor(canvas.width / 20);

// Initialize the y positions of the columns
let yPositions = [];
for (let i = 0; i < columns; i++) {
    yPositions[i] = Math.random() * canvas.height;
}

// Update the matrix animation
function updateMatrix() {
    // Set the background color with transparency for trail effect
    // Limpiamos el resplandor antes de pintar el fondo negro semitransparente
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(11, 11, 15, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set the text color and font (CAMBIADO A VERDE CHILLÓN + GLOW)
    ctx.fillStyle = "#03FD03"; 
    ctx.font = "14px 'JetBrains Mono', monospace";
    
    // EFECTO NEÓN
    ctx.shadowBlur = 8;        // Cantidad de brillo
    ctx.shadowColor = "#03FD03"; // Color del brillo

    // Loop through each column
    for (let i = 0; i < columns; i++) {
        // Select a random character from the array
        const character = characters[Math.floor(Math.random() * characters.length)];

        // Set the y position of the current column
        const y = yPositions[i];

        // Draw the character at the current position
        ctx.fillText(character, i * 20, y);

        // Move the column down by 20 units
        yPositions[i] += 20;

        // Reset the position if it reaches the bottom of the canvas
        if (yPositions[i] > canvas.height && Math.random() > 0.975) {
            yPositions[i] = 0;
        }
    }
}

// Render the matrix animation
function renderMatrix() {
    requestAnimationFrame(renderMatrix);
    updateMatrix();
}

// Start the animation
renderMatrix();

// TERMINAL BOOT SEQUENCE
const bootSequence = [
    { text: '[  OK  ] Starting portfolio system...', class: 'success', delay: 100 },
    { text: '[  OK  ] Mounting /dev/skills...', class: 'success', delay: 150 },
    { text: '[  OK  ] Loading creative.module...', class: 'success', delay: 100 },
    { text: '[  OK  ] Initializing neural.network...', class: 'success', delay: 120 },
    { text: '', class: 'output', delay: 200 },
    { text: '════════════════════════════════════', class: 'info', delay: 50 },
    { text: '    DESARROLLADOR FULL STACK', class: 'info', delay: 80 },
    { text: '    Creando experiencias digitales', class: 'info', delay: 80 },
    { text: '════════════════════════════════════', class: 'info', delay: 50 },
    { text: '', class: 'output', delay: 200 },
    { text: '> Sistema listo.', class: 'success', delay: 100 },
    { text: '> Bienvenido al portfolio.', class: 'info', delay: 100 },
    { text: '', class: 'output', delay: 100 }
];

function typeText(element, text, callback) {
    let i = 0;
    const speed = 30;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function addTerminalLine(container, text, className, typed = false, callback) {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    container.appendChild(line);
    
    if (typed && text) {
        typeText(line, text, callback);
    } else {
        line.textContent = text;
        if (callback) callback();
    }
}

function runBootSequence(container) {
    let index = 0;
    
    function nextLine() {
        if (index < bootSequence.length) {
            const line = bootSequence[index];
            setTimeout(() => {
                addTerminalLine(container, line.text, line.class, true, () => {
                    index++;
                    nextLine();
                });
            }, line.delay);
        } else {
            const cursorLine = document.createElement('div');
            cursorLine.className = 'terminal-line';
            cursorLine.innerHTML = '<span class="prompt">arch@portfolio:~$</span><span class="cursor"></span>';
            container.appendChild(cursorLine);
        }
    }
    
    nextLine();
}

// Iniciar secuencia de arranque
setTimeout(() => {
    const terminalBody = document.getElementById('terminalBody');
    if (terminalBody) {
        runBootSequence(terminalBody);
    }
}, 500);

// Efectos de glitch en nav-blocks y cards
const navBlocks = document.querySelectorAll('.nav-block');
const projectCards = document.querySelectorAll('.project-card');

[...navBlocks, ...projectCards].forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.classList.add('glitch');
        setTimeout(() => this.classList.remove('glitch'), 300);
    });
});