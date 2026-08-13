// Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Animate dot instantly
        if (typeof gsap !== 'undefined') {
            gsap.to(cursorDot, {
                x: posX,
                y: posY,
                duration: 0.1,
                ease: "power2.out"
            });
            // Animate outline with slight delay for trailing effect
            gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }
    });

    // Hover effects on clickable elements
    const interactiveElements = document.querySelectorAll('a, button, .color-option');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
});

// --- General Enquiry Modal Logic ---
function openGeneralEnquiry(e) {
    if(e) e.preventDefault();
    const modal = document.getElementById('generalEnquiryModal');
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeGeneralEnquiry() {
    const modal = document.getElementById('generalEnquiryModal');
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close on outside click
window.addEventListener('click', function(e) {
    const modal = document.getElementById('generalEnquiryModal');
    if(modal && e.target === modal) {
        closeGeneralEnquiry();
    }
});
