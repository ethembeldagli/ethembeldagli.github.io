// Project data
const projects = [
    {
        name: 'Elastic Cursor Effect',
        description: 'A website where there is a cool elastic cursor effect',
        image: '/img/2.png',
        link: 'https://ethembeldagli.github.io/elasticcursoreffects',
        github: 'https://github.com/ethembeldagli/elasticcursoreffect'
    },
    {
        name: 'Pointless Projects',
        description: 'Very pointless projects',
        image: '/img/3.png',
        link: 'https://ethembeldagli.github.io/pointlessprojects',
        github: 'https://github.com/ethembeldagli/pointlessprojects'
    },
    {
        name: 'Its Ethem Miss',
        description: 'A team of friends and their projects (mostly made by me)',
        image: '/img/4.png',
        link: 'https://itsethemmiss.github.io',
        github: 'https://github.com/itsethemmiss/itsethemmiss.github.io'
    },
    {
        name: 'Pls Pet Doge',
        description: 'A doge that wants to be petted',
        image: '/img/5.png',
        link: 'https://ethembeldagli.github.io/plspetdoge',
        github: 'https://github.com/ethembeldagli/plspetdoge'
    }
];

// State management
let currentProject = null;
let isModalOpen = false;

// DOM elements
const projectsContainer = document.getElementById('projectsContainer');
const bgTransition = document.getElementById('bgTransition');
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const liveDemoButton = document.getElementById('liveDemoButton');
const githubButton = document.getElementById('githubButton');
const closeButton = document.getElementById('closeButton');

// Create project items
function renderProjects() {
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item glass-effect liquid-distortion';
        projectItem.innerHTML = `<span class="project-name">${project.name}</span>`;
        
        // Add staggered animation
        setTimeout(() => {
            projectItem.classList.add('animate-in');
        }, index * 100);
        
        // Hover events for background
        projectItem.addEventListener('mouseenter', () => {
            setBackground(project.image);
            addLiquidDistortion(projectItem);
        });
        
        projectItem.addEventListener('mouseleave', () => {
            clearBackground();
        });
        
        // Click event for modal
        projectItem.addEventListener('click', () => {
            openModal(project);
        });
        
        projectsContainer.appendChild(projectItem);
    });
}

// Background management with liquid effect
function setBackground(imageUrl) {
    bgTransition.style.backgroundImage = `url('${imageUrl}')`;
    bgTransition.style.opacity = '0.45';
    bgTransition.classList.add('active');
    
    // Add liquid ripple effect
    requestAnimationFrame(() => {
        bgTransition.style.transform = 'scale(1.1) rotate(0.5deg)';
    });
}

function clearBackground() {
    bgTransition.style.opacity = '0';
    bgTransition.classList.remove('active');
    bgTransition.style.transform = 'scale(1) rotate(0deg)';
}

// Add liquid distortion on hover
function addLiquidDistortion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    element.addEventListener('mousemove', liquidMouseMove);
    element.addEventListener('mouseleave', () => {
        element.removeEventListener('mousemove', liquidMouseMove);
        element.style.transform = '';
    });
    
    function liquidMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const deltaX = (mouseX - centerX) / rect.width;
        const deltaY = (mouseY - centerY) / rect.height;
        
        element.style.transform = `translateX(${15 + deltaX * 10}px) scale(1.05) rotateY(${3 + deltaX * 2}deg) rotateX(${-deltaY * 2}deg)`;
    }
}

// Modal management
function openModal(project) {
    currentProject = project;
    isModalOpen = true;
    
    modalImage.src = project.image;
    modalImage.alt = project.name;
    modalTitle.textContent = project.name;
    modalDescription.textContent = project.description;
    liveDemoButton.href = project.link;
    githubButton.href = project.github;
    
    modalOverlay.classList.remove('hidden');
    requestAnimationFrame(() => {
        modalOverlay.classList.add('show');
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    isModalOpen = false;
    modalOverlay.classList.remove('show');
    
    setTimeout(() => {
        modalOverlay.classList.add('hidden');
        currentProject = null;
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Event listeners
closeButton.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

// Smooth cursor following effect for buttons
const buttons = document.querySelectorAll('.gooey-button');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--mouse-x', `${x}px`);
        button.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Enhanced liquid distortion for background on scroll
let scrollY = 0;
let ticking = false;

function updateScroll() {
    scrollY = window.scrollY;
    
    if (bgTransition.style.opacity !== '0') {
        const parallax = scrollY * 0.5;
        bgTransition.style.transform = `scale(1.1) translateY(${parallax}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
});

// Liquid ripple effect on click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-item') || e.target.closest('.project-item')) {
        createRipple(e.clientX, e.clientY);
    }
});

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(50, 184, 198, 0.6) 0%, transparent 70%)';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    ripple.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s ease';
    ripple.style.opacity = '1';
    
    document.body.appendChild(ripple);
    
    requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(30)';
        ripple.style.opacity = '0';
    });
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Add gooey blob animation to header on load
const headerCard = document.getElementById('headerCard');
let headerHoverTimeout;

headerCard.addEventListener('mouseenter', () => {
    clearTimeout(headerHoverTimeout);
    headerCard.style.animation = 'liquidFloat 6s ease-in-out infinite, liquidPulse 2s ease-in-out infinite';
});

headerCard.addEventListener('mouseleave', () => {
    headerHoverTimeout = setTimeout(() => {
        headerCard.style.animation = 'liquidFloat 6s ease-in-out infinite';
    }, 2000);
});

// Initialize
renderProjects();

// Add smooth entrance animation for header
window.addEventListener('load', () => {
    headerCard.style.opacity = '0';
    headerCard.style.transform = 'translateY(-30px) scale(0.9)';
    
    requestAnimationFrame(() => {
        headerCard.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        headerCard.style.opacity = '1';
        headerCard.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced modal image liquid effect
const modalContent = document.querySelector('.modal-content');
if (modalContent) {
    modalContent.addEventListener('mousemove', (e) => {
        const rect = modalContent.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const modalImg = modalContent.querySelector('.modal-image');
        if (modalImg) {
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            modalImg.style.transform = `scale(1.1) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
    });
    
    modalContent.addEventListener('mouseleave', () => {
        const modalImg = modalContent.querySelector('.modal-image');
        if (modalImg) {
            modalImg.style.transform = 'scale(1.1) rotateX(0deg) rotateY(0deg)';
        }
    });
}

// Liquid morph effect for project items on mouse position
projectsContainer.addEventListener('mousemove', (e) => {
    const items = document.querySelectorAll('.project-item');
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        if (distance < 200) {
            const scale = 1 + (200 - distance) / 2000;
            const rotation = (e.clientX - centerX) / 100;
            item.style.transform = `scale(${scale}) rotateZ(${rotation}deg)`;
        }
    });
});

projectsContainer.addEventListener('mouseleave', () => {
    const items = document.querySelectorAll('.project-item');
    items.forEach(item => {
        if (!item.matches(':hover')) {
            item.style.transform = '';
        }
    });
});
