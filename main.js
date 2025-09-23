document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Logic ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (navLinks && !e.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // --- General Modal Logic ---
    function setupModal(modalId, openBtnId) {
        const modal = document.getElementById(modalId);
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = modal.querySelector('.close-button');

        if(openBtn) {
            openBtn.addEventListener('click', () => modal.style.display = 'block');
        }
        if(closeBtn) {
            closeBtn.addEventListener('click', () => modal.style.display = 'none');
        }
    }

    // Setup Modals for Services
    document.querySelectorAll('.open-modal').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.style.display = 'block';
        });
    });
    
    // Setup Modal for Chat Button
    setupModal('chatModal', 'openChatModalBtn');

    // Close modal when clicking outside of it or on a close button
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
        if (event.target.classList.contains('close-button')) {
            event.target.closest('.modal').style.display = 'none';
        }
    });
});