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

// Ajouter un fond d'étoiles
function createStars() {
    const body = document.body;
    const numberOfStars = 150;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty('--duration', `${3 + Math.random() * 7}s`);
        
        // Variation de taille
        const size = 1 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Variation de luminosité
        const brightness = 0.5 + Math.random() * 0.5;
        star.style.opacity = brightness;
        
        body.appendChild(star);
    }
}

// Effet de particules amélioré
function createParticles(x, y, color) {
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);
        
        // Position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Taille aléatoire
        const size = 5 + Math.random() * 15;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Couleur
        particle.style.background = color || var(--glow-color);
        
        // Animation
        const angle = Math.random() * Math.PI * 2;
        const speed = 10 + Math.random() * 30;
        const dirX = Math.cos(angle) * speed;
        const dirY = Math.sin(angle) * speed;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${dirX}px, ${dirY}px) scale(1)`, opacity: 0 }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0,0,0.2,1)'
        });
        
        // Supprimer la particule après l'animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Ajouter des effets de pulsation pour les boutons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Ajouter l'effet de pression
        this.classList.add('button-press');
        setTimeout(() => this.classList.remove('button-press'), 200);
        
        // Créer des particules à la position du clic
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        // Différentes couleurs selon le type de bouton
        let particleColor;
        if (button.classList.contains('operatorButton')) {
            particleColor = 'rgba(255, 123, 41, 0.8)';
        } else if (button.id === 'equalButton') {
            particleColor = 'rgba(255, 215, 0, 0.8)';
        } else {
            particleColor = 'rgba(255, 255, 255, 0.6)';
        }
        
        createParticles(x, y, particleColor);
    });
});

// Effet de mise en évidence pour le display
function highlightDisplay() {
    display.style.boxShadow = 'inset 0 2px 5px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 255, 0.8)';
    setTimeout(() => {
        display.style.boxShadow = 'inset 0 2px 5px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 255, 0.5)';
    }, 300);
}

// Remplacer la fonction updateDisplay
const originalUpdateDisplay = updateDisplay;
updateDisplay = function(value) {
    originalUpdateDisplay(value);
    highlightDisplay();
};

// Initialiser les étoiles
createStars();

// Ajouter les flammes autour de la calculatrice
function addFlames() {
    const calculator = document.querySelector('.calculator-container');
    const flameContainer = document.createElement('div');
    flameContainer.className = 'flame-container';
    calculator.appendChild(flameContainer);
    
    // Créer des flammes autour de la calculatrice
    const flameCount = 12;
    const flameTypes = ['flame', 'flame blue', 'flame purple'];
    
    for (let i = 0; i < flameCount; i++) {
        const flame = document.createElement('div');
        const flameType = flameTypes[Math.floor(Math.random() * flameTypes.length)];
        flame.className = flameType;
        
        // Positionner les flammes tout autour
        const position = (i / flameCount) * 100;
        flame.style.left = `${position}%`;
        
        // Varier la taille et la vitesse
        const heightScale = 0.8 + Math.random() * 0.4;
        flame.style.height = `${80 * heightScale}px`;
        flame.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
        flame.style.animationDelay = `${Math.random()}s`;
        
        flameContainer.appendChild(flame);
    }
    
    // Ajouter un cercle de feu
    const fireRing = document.createElement('div');
    fireRing.className = 'fire-ring';
    calculator.appendChild(fireRing);
}

// Ajouter des flammes sur les boutons
function addButtonFlames() {
    document.querySelectorAll('button').forEach(button => {
        const buttonFlame = document.createElement('div');
        buttonFlame.className = 'button-flame';
        button.appendChild(buttonFlame);
    });
}

// Créer un cercle de feu lors d'une opération
function createFireRing() {
    const calculator = document.querySelector('.calculator-container');
    const fireRing = calculator.querySelector('.fire-ring') || document.createElement('div');
    
    if (!fireRing.className) {
        fireRing.className = 'fire-ring';
        calculator.appendChild(fireRing);
    }
    
    fireRing.style.animation = 'none';
    // Forcer une reflow
    void fireRing.offsetWidth;
    fireRing.style.animation = 'fireRingPulse 1.5s ease-out forwards';
}

// Créer des flammes qui jaillissent lors du clic sur un bouton d'opération
function createFlameJet(button) {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    
    // Nombre de flammes
    const flameCount = 6;
    
    for (let i = 0; i < flameCount; i++) {
        const flame = document.createElement('div');
        flame.className = 'particle';
        document.body.appendChild(flame);
        
        // Position et style
        flame.style.left = `${x}px`;
        flame.style.top = `${y}px`;
        flame.style.background = 'linear-gradient(to top, #ff5000, #ff9000)';
        
        // Taille
        const size = 10 + Math.random() * 15;
        flame.style.width = `${size}px`;
        flame.style.height = `${size * 1.5}px`;
        flame.style.borderRadius = '50% 50% 20% 20%';
        
        // Animation
        const angle = (Math.PI / 4) + (Math.random() * Math.PI / 2);  // Entre 45° et 135°
        const speed = 15 + Math.random() * 25;
        const dirX = Math.cos(angle) * speed;
        const dirY = -Math.sin(angle) * speed;  // Vers le haut
        
        flame.animate([
            { 
                transform: 'translate(0, 0) scale(0.5)', 
                opacity: 0.8,
                filter: 'blur(2px)' 
            },
            { 
                transform: `translate(${dirX}px, ${dirY}px) scale(1.5)`, 
                opacity: 0,
                filter: 'blur(5px)' 
            }
        ], {
            duration: 600 + Math.random() * 400,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        // Supprimer la flamme après l'animation
        setTimeout(() => {
            flame.remove();
        }, 1000);
    }
}

// Améliorer le comportement des opérateurs pour déclencher des flammes
const originalEqual = equal;
equal = function() {
    createFireRing();
    originalEqual();
};

// Initialiser les flammes
window.addEventListener('load', () => {
    addFlames();
    addButtonFlames();
    
    // Ajouter des événements pour les flammes sur les boutons d'opération
    document.querySelectorAll('.operatorButton, #equalButton').forEach(button => {
        button.addEventListener('click', () => createFlameJet(button));
    });
});

// Créer les éléments cosmiques avancés
function createCosmicElements() {
    createAurora();
    createNebula();
    createGalaxy();
    createShootingStars();
    setupCalculator3DEffect();
    setupHistoryPanel();
    setupScientificMode();
}

function createAurora() {
    const auroraContainer = document.createElement('div');
    auroraContainer.className = 'aurora-container';
    
    for (let i = 0; i < 3; i++) {
        const aurora = document.createElement('div');
        aurora.className = 'aurora';
        auroraContainer.appendChild(aurora);
    }
    
    document.body.appendChild(auroraContainer);
}

function createNebula() {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    document.body.appendChild(nebula);
}

function createGalaxy() {
    const galaxy = document.createElement('div');
    galaxy.className = 'galaxy';
    galaxy.style.top = `${Math.random() * 70 + 15}%`;
    galaxy.style.left = `${Math.random() * 70 + 15}%`;
    document.body.appendChild(galaxy);
}

function createShootingStars() {
    const count = 5;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            // Position aléatoire
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            
            // Angle aléatoire
            const angle = -45 + Math.random() * 30;
            star.style.transform = `rotate(${angle}deg)`;
            
            // Animation décalée
            star.style.animationDelay = `${i * 3}s`;
            
            document.body.appendChild(star);
            
            // Supprimer après animation
            setTimeout(() => {
                star.remove();
                createShootingStars();
            }, 6000);
        }, i * 3000);
    }
}

// Effet de mouvement 3D pour la calculatrice
function setupCalculator3DEffect() {
    const calculator = document.querySelector('.calculator-container');
    
    document.addEventListener('mousemove', e => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculer les valeurs de rotation
        const rotateX = (clientY - innerHeight / 2) / innerHeight * 10;
        const rotateY = (clientX - innerWidth / 2) / innerWidth * -10;
        
        // Appliquer la transformation avec un délai pour un effet fluide
        calculator.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
            translateY(${-Math.abs(rotateX) / 2}px)
        `;
    });
}

// Fonction pour créer une onde de choc
function createShockwave() {
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    document.body.appendChild(shockwave);
    
    shockwave.animate([
        { width: '10px', height: '10px', opacity: 0.8 },
        { width: '500px', height: '500px', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    setTimeout(() => {
        shockwave.remove();
    }, 1000);
}

// Système d'historique des calculs
function setupHistoryPanel() {
    // Créer le panneau d'historique
    const historyPanel = document.createElement('div');
    historyPanel.className = 'history-panel';
    historyPanel.innerHTML = '<h3 style="color: #fff; margin-top: 0;">Historique</h3>';
    document.body.appendChild(historyPanel);
    
    // Créer le bouton de toggle
    const historyToggle = document.createElement('div');
    historyToggle.className = 'history-toggle';
    historyToggle.innerHTML = '&#x1F4C3;'; // Icône d'historique
    historyToggle.addEventListener('click', () => {
        historyPanel.classList.toggle('visible');
    });
    document.body.appendChild(historyToggle);
    
    // Fonction pour ajouter une entrée à l'historique
    window.addToHistory = function(calculation, result) {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <span>${calculation}</span>
            <span>=</span>
            <span>${result}</span>
        `;
        
        historyPanel.appendChild(historyItem);
        
        // Limiter l'historique à 20 entrées
        const historyItems = historyPanel.querySelectorAll('.history-item');
        if (historyItems.length > 20) {
            historyItems[0].remove();
        }
        
        // Faire défiler vers le bas
        historyPanel.scrollTop = historyPanel.scrollHeight;
    };
}

// Mode scientifique
function setupScientificMode() {
    const calculator = document.querySelector('.calculator-container');
    const buttonsContainer = document.querySelector('.buttons-container');
    
    // Créer le panneau scientifique
    const scientificPanel = document.createElement('div');
    scientificPanel.className = 'scientific-panel';
    calculator.insertBefore(scientificPanel, buttonsContainer);
    
    // Créer le bouton de toggle
    const scientificToggle = document.createElement('div');
    scientificToggle.className = 'scientific-toggle';
    calculator.appendChild(scientificToggle);
    
    // Fonctions scientifiques
    const scientificFunctions = [
        { label: 'sin', func: Math.sin },
        { label: 'cos', func: Math.cos },
        { label: 'tan', func: Math.tan },
        { label: 'ln', func: Math.log },
        { label: 'log', func: Math.log10 },
        { label: 'π', value: Math.PI },
        { label: 'e', value: Math.E },
        { label: '√', func: Math.sqrt },
        { label: 'x²', func: x => x * x },
        { label: 'x³', func: x => x * x * x },
        { label: '10^x', func: x => Math.pow(10, x) },
        { label: 'x^y', op: '^' }
    ];
    
    // Ajouter les boutons scientifiques
    scientificFunctions.forEach(func => {
        const button = document.createElement('button');
        button.className = 'sci-button';
        button.textContent = func.label;
        
        button.addEventListener('click', function() {
            if (func.value !== undefined) {
                currentValue = func.value.toString();
                updateDisplay(currentValue);
            } else if (func.func) {
                if (currentValue) {
                    try {
                        const val = parseFloat(currentValue);
                        const result = func.func(val);
                        currentValue = result.toString();
                        updateDisplay(currentValue);
                        addToHistory(`${func.label}(${val})`, result);
                    } catch (e) {
                        updateDisplay('Error');
                    }
                }
            } else if (func.op) {
                if (currentValue) {
                    previousValue = currentValue;
                    currentOperation = func.op;
                    currentValue = '';
                }
            }
            
            // Effet visuel
            createPortalEffect(this);
        });
        
        scientificPanel.appendChild(button);
    });
    
    // Événement pour afficher/masquer le panneau
    scientificToggle.addEventListener('click', () => {
        scientificPanel.classList.toggle('visible');
        scientificToggle.classList.toggle('active');
    });
    
    // Ajouter la fonction exponentielle au calcul
    const originalCalculate = calculate;
    window.calculate = function(num1, num2, operation) {
        if (operation === '^') {
            return Math.pow(parseFloat(num1), parseFloat(num2));
        }
        return originalCalculate(num1, num2, operation);
    };
}

// Effet de portail dimensionnel
function createPortalEffect(element) {
    const rect = element.getBoundingClientRect();
    const portal = document.createElement('div');
    portal.className = 'portal';
    portal.style.left = `${rect.left + rect.width / 2}px`;
    portal.style.top = `${rect.top + rect.height / 2}px`;
    document.body.appendChild(portal);
    
    setTimeout(() => {
        portal.classList.add('active');
    }, 10);
    
    setTimeout(() => {
        portal.classList.remove('active');
        setTimeout(() => portal.remove(), 500);
    }, 1000);
}

// Modifie la fonction equal existante pour ajouter des effets visuels
const originalEqualFunction = equal;
window.equal = function() {
    if (!currentOperation || !previousValue) {
        return;
    }

    const calculation = `${previousValue} ${currentOperation} ${currentValue || previousValue}`;
    const result = calculate(previousValue, currentValue || previousValue, currentOperation);
    
    // Ajouter à l'historique
    if (window.addToHistory) {
        window.addToHistory(calculation, result);
    }
    
    // Effets visuels
    createShockwave();
    createPortalEffect(document.getElementById('equalButton'));
    
    originalEqualFunction();
};

// Initialiser tous les éléments cosmiques
window.addEventListener('load', () => {
    createCosmicElements();
});

// Fonctionnalités supplémentaires ajoutées au démarrage
window.addEventListener('DOMContentLoaded', () => {
    // Appliquer l'effet lumineux au display
    const display = document.getElementById('display');
    if (display) {
        display.addEventListener('focus', () => {
            display.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.8)';
        });
        
        display.addEventListener('blur', () => {
            display.style.boxShadow = 'inset 0 2px 5px rgba(0, 0, 0, 0.5), var(--display-glow)';
        });
    }
    
    // Appliquer des effets aux opérations
    document.querySelectorAll('.operatorButton').forEach(button => {
        button.addEventListener('click', () => {
            // Créer des éclairs entre les boutons
            createElectricEffect(button);
        });
    });
});

// Effet d'éclair électrique entre les boutons
function createElectricEffect(button) {
    const rect = button.getBoundingClientRect();
    const display = document.getElementById('display').getBoundingClientRect();
    
    const start = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
    
    const end = {
        x: display.left + display.width / 2,
        y: display.bottom
    };
    
    // Créer l'éclair avec SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'fixed';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '100';
    
    // Générer des points de zigzag pour l'éclair
    let path = `M ${start.x},${start.y}`;
    const segments = 8;
    const distance = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    const segmentLength = distance / segments;
    
    for (let i = 1; i < segments; i++) {
        const ratio = i / segments;
        const x = start.x + (end.x - start.x) * ratio;
        const y = start.y + (end.y - start.y) * ratio;
        const offset = (Math.random() - 0.5) * segmentLength * 0.8;
        
        path += ` L ${x + offset},${y}`;
    }
    
    path += ` L ${end.x},${end.y}`;
    
    const lightning = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    lightning.setAttribute('d', path);
    lightning.setAttribute('stroke', 'rgba(100, 200, 255, 0.8)');
    lightning.setAttribute('stroke-width', '3');
    lightning.setAttribute('fill', 'none');
    
    svg.appendChild(lightning);
    document.body.appendChild(svg);
    
    // Animer l'éclair
    lightning.animate([
        { strokeDashoffset: distance, strokeDasharray: distance },
        { strokeDashoffset: 0, strokeDasharray: distance }
    ], {
        duration: 200,
        easing: 'ease-out'
    });
    
    // Supprimer l'éclair après l'animation
    setTimeout(() => {
        svg.remove();
    }, 200);
}