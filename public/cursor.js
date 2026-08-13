// Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    function updateCursor(posX, posY) {
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
    }

    let cursorX = 0;
    let cursorY = 0;
    let isCursorTicking = false;

    function renderCursor() {
        updateCursor(cursorX, cursorY);
        isCursorTicking = false;
    }

    window.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        if (!isCursorTicking) {
            requestAnimationFrame(renderCursor);
            isCursorTicking = true;
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
            cursorX = e.touches[0].clientX;
            cursorY = e.touches[0].clientY;
            if (!isCursorTicking) {
                requestAnimationFrame(renderCursor);
                isCursorTicking = true;
            }
        }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
            cursorX = e.touches[0].clientX;
            cursorY = e.touches[0].clientY;
            if (!isCursorTicking) {
                requestAnimationFrame(renderCursor);
                isCursorTicking = true;
            }
        }
    }, { passive: true });

    // Hover effects on clickable elements via event delegation
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('a, button, .color-option')) {
            cursorOutline.classList.add('hover');
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('a, button, .color-option')) {
            cursorOutline.classList.remove('hover');
        }
    });
});

// Duplicate General Enquiry Modal Logic removed (handled in script.js)
