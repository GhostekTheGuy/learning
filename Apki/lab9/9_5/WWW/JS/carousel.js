document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    slides[0].classList.add('active-slide');
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active-slide');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active-slide');
    }
    
    setInterval(nextSlide, 5000);
});