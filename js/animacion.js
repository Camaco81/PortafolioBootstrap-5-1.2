 // Scroll animations
        function animateOnScroll() {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        }

        // Progress bar animations
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                const rect = bar.getBoundingClientRect();
                
                if (rect.top < window.innerHeight - 100) {
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                }
            });
        }

        // Contact form handling
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
            btn.disabled = true;
            
            // Simulate form submission (replace with actual EmailJS implementation)
            setTimeout(() => {
                btn.innerHTML = '<i class="bi bi-check-circle"></i> ¡Enviado!';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    e.target.reset();
                }, 2000);
            }, 2000);
        });

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            typewriterEffect();
            animateOnScroll();
            animateProgressBars();
            
            // Scroll event listeners
            window.addEventListener('scroll', function() {
                animateOnScroll();
                animateProgressBars();
            });
            
            // Smooth scrolling for anchor links
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
        });