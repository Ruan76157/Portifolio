// ==================== NAVEGAÇÃO MOBILE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== NAVBAR SCROLL ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== ANIMAÇÃO DE DIGITAÇÃO ====================
const typingText = document.querySelector('.typing-text');
const text = 'Desenvolvedor Full Stack';
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// Inicia a animação quando a página carrega
window.addEventListener('load', () => {
    typingText.textContent = '';
    setTimeout(typeWriter, 500);
});

// ==================== CONTADOR DE ESTATÍSTICAS ====================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Intersection Observer para animar quando entrar na viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            animateCounter(statNumber);
            observer.unobserve(statNumber);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    observer.observe(stat);
});

// ==================== ANIMAÇÃO DE SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== ANIMAÇÃO DAS BARRAS DE SKILL ====================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'skill-load 1.5s ease-out forwards';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ==================== ANIMAÇÃO DE FADE IN DOS ELEMENTOS ====================
const fadeElements = document.querySelectorAll('.projeto-card, .skill-category, .stat-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ==================== EFEITO DE CURSOR PERSONALIZADO ====================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
        mix-blend-mode: difference;
    }

    .custom-cursor.hover {
        width: 40px;
        height: 40px;
        background: rgba(0, 212, 255, 0.2);
    }
`;
document.head.appendChild(cursorStyle);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Aumenta o cursor em elementos interativos
const interactiveElements = document.querySelectorAll('a, button, .projeto-card, .tech-icon');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// ==================== EFEITO PARALLAX ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content, .particles');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== PARTÍCULAS INTERATIVAS ====================
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
    particle.addEventListener('mouseenter', () => {
        particle.style.transform = 'scale(3)';
        particle.style.transition = 'transform 0.3s ease';
    });
    
    particle.addEventListener('mouseleave', () => {
        particle.style.transform = 'scale(1)';
    });
});

// ==================== VALIDAÇÃO DO FORMULÁRIO ====================
const form = document.querySelector('.contato-form');
const submitBtn = form.querySelector('.btn-primary');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    
    if (nome && email && assunto && mensagem) {
        // Animação de sucesso
        submitBtn.innerHTML = '<span>Enviado!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00d4ff)';
        
        // Limpa o formulário
        setTimeout(() => {
            document.getElementById('nome').value = '';
            document.getElementById('email').value = '';
            document.getElementById('assunto').value = '';
            document.getElementById('mensagem').value = '';
            
            submitBtn.innerHTML = '<span>Enviar Mensagem</span> <i class="fas fa-paper-plane"></i>';
            submitBtn.style.background = '';
        }, 3000);
        
        // Aqui você pode adicionar a lógica para enviar o formulário via API
        console.log('Formulário enviado:', { nome, email, assunto, mensagem });
    } else {
        // Animação de erro
        submitBtn.style.animation = 'shake 0.5s';
        setTimeout(() => {
            submitBtn.style.animation = '';
        }, 500);
    }
});

// Adiciona a animação shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// ==================== EFEITO DE GLITCH NO HOVER ====================
const glitchTitle = document.querySelector('.glitch');
glitchTitle.addEventListener('mouseenter', () => {
    glitchTitle.style.animation = 'glitch 0.3s infinite';
});

glitchTitle.addEventListener('mouseleave', () => {
    glitchTitle.style.animation = 'glitch 3s infinite';
});

// ==================== ANIMAÇÃO DOS ÍCONES DE TECNOLOGIA ====================
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
    
    icon.addEventListener('click', () => {
        icon.style.animation = 'bounce 0.5s';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
});

const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
    }
`;
document.head.appendChild(bounceStyle);

// ==================== LOADING INICIAL ====================
window.addEventListener('load', () => {
    // Remove o loader se houver
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
    
    // Anima elementos principais
    const hero = document.querySelector('.hero');
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        hero.style.transition = 'opacity 1s ease, transform 1s ease';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }, 100);
});

// ==================== DETECÇÃO DE SEÇÃO ATIVA NA NAVEGAÇÃO ====================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
    
    .nav-link.active::before {
        width: 100%;
    }
`;
document.head.appendChild(activeLinkStyle);

// ==================== THEME TOGGLE (OPCIONAL) ====================
// Você pode adicionar um botão para alternar entre temas claro/escuro
const createThemeToggle = () => {
    const toggle = document.createElement('button');
    toggle.classList.add('theme-toggle');
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggle);
    
    const toggleStyle = document.createElement('style');
    toggleStyle.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            box-shadow: var(--shadow);
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: scale(1.1) rotate(20deg);
        }
    `;
    document.head.appendChild(toggleStyle);
    
    toggle.addEventListener('click', () => {
        // Implementar lógica de troca de tema aqui
        console.log('Theme toggle clicked');
    });
};

// Descomente para ativar o botão de tema
// createThemeToggle();

// ==================== PERFORMANCE: LAZY LOADING DE IMAGENS ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ==================== CONSOLE MESSAGE ====================
console.log('%c🚀 Portfólio Desenvolvido por [Seu Nome]', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%c💻 Desenvolvedor Full Stack', 'font-size: 14px; color: #8892b0;');
console.log('%c📧 Entre em contato!', 'font-size: 14px; color: #ff006e;');