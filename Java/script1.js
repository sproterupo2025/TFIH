document.addEventListener('DOMContentLoaded', function () {

    const sections = document.querySelectorAll('.section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

  
    let previousTitle = document.title;

    window.addEventListener('blur', () => {
        previousTitle = document.title;
        document.title = '¡No te vayas! ¡Vuelve! 😱';
    });

    window.addEventListener('focus', () => {
        document.title = previousTitle;
    });

    
    document.querySelectorAll('.nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

  
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const carousel = document.querySelector('.emergency-situations');
    const situationsArray = Array.from(document.querySelectorAll('.situation'));
    let currentIndex = 0;

    function updateCarousel() {
        const itemWidth = situationsArray[0].offsetWidth + 20; 
        const offset = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    nextButton.addEventListener('click', function () {
        currentIndex++;
        updateCarousel();
    });

    prevButton.addEventListener('click', function () {
        currentIndex--;
        updateCarousel();
    });

  
    const featureButtons = document.querySelectorAll('.feature-button, .read-more, .close-content, .carousel-button, .cta-button');
    featureButtons.forEach(button => {
        button.addEventListener('mouseover', function () {
            this.classList.add('hover');
        });
        button.addEventListener('mouseout', function () {
            this.classList.remove('hover');
        });
    });

    
    const situations = document.querySelectorAll('.situation');
    situations.forEach(situation => {
        const content = situation.querySelector('p');
        content.style.display = 'none';

        const readMore = document.createElement('button');
        readMore.textContent = 'Leer más';
        readMore.classList.add('read-more');
        readMore.style.display = 'none';

        const closeContent = document.createElement('button');
        closeContent.innerHTML = '&#9650;';
        closeContent.classList.add('close-content');
        closeContent.style.display = 'none';

        readMore.addEventListener('click', function () {
            content.style.display = 'block';
            closeContent.style.display = 'block';
            readMore.style.display = 'none';
        });

        closeContent.addEventListener('click', function () {
            content.style.display = 'none';
            closeContent.style.display = 'none';
            readMore.style.display = 'block';
        });

        situation.appendChild(readMore);
        situation.appendChild(closeContent);

        situation.addEventListener('mouseover', function () {
            if (content.style.display !== 'block') {
                readMore.style.display = 'block';
            }
        });

        situation.addEventListener('mouseout', function () {
            if (content.style.display !== 'block') {
                readMore.style.display = 'none';
            }
        });
    });

    
    function handleScroll() {
        const sections = document.querySelectorAll('.section, .situation');
        const scroll = document.documentElement.scrollTop;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scroll > sectionTop - window.innerHeight + sectionHeight / 3) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
});
