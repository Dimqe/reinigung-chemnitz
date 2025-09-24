document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu & Modal Logic ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (navLinks && !e.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    const modals = document.querySelectorAll('.modal');
    const modalButtons = document.querySelectorAll('.open-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const chatBtn = document.getElementById('openChatModalBtn');
    const chatModal = document.getElementById('chatModal');

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'block';
        });
    });

    if(chatBtn && chatModal) {
        chatBtn.addEventListener('click', () => {
            chatModal.style.display = 'block';
        });
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    // --- AJAX Form Submission Logic ---
    const form = document.querySelector('.contact-form form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formAction = form.action;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Senden...';

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showNotification(successMessage);
                    form.reset();
                } else {
                    showNotification(errorMessage);
                }
            }).catch(error => {
                showNotification(errorMessage);
            }).finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }

    function showNotification(element) {
        element.classList.add('show');
        setTimeout(() => {
            element.classList.remove('show');
        }, 4000);
    }
});