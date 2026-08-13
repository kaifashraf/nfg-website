const basePrice = 650;
let shellPrice = 0;
let trimPrice = 0;
let visorPrice = 25; // Default dark smoke

// Entry Animation
if (typeof gsap !== 'undefined') {
    gsap.from(".config-preview", { x: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".config-panel", { x: 50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".config-section", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.3 });
    gsap.from(".helmet-layers", { scale: 0.9, opacity: 0, duration: 1, ease: "back.out(1.5)", delay: 0.5 });
}

function updatePrice() {
    const addons = shellPrice + trimPrice + visorPrice;
    const total = basePrice + addons;
    
    document.getElementById('addons-price').innerText = `€ ${addons.toFixed(2)}`;
    document.getElementById('total-price').innerText = `€ ${total.toFixed(2)}`;
}

function updateShell(btn) {
    // Update active class
    document.querySelectorAll('#shell-colors .color-option').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    
    // Update preview
    document.getElementById('preview-shell').style.backgroundColor = btn.dataset.color;
    if (typeof gsap !== 'undefined') gsap.from("#preview-shell", { scale: 0.95, duration: 0.3, ease: "power1.out" });
    
    // Update labels and price
    document.getElementById('shell-name').innerText = btn.dataset.name;
    shellPrice = parseInt(btn.dataset.price);
    updatePrice();
}

function updateTrim(btn) {
    document.querySelectorAll('#trim-colors .color-option').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    
    document.getElementById('preview-trim').style.borderColor = btn.dataset.color;
    if (typeof gsap !== 'undefined') gsap.from("#preview-trim", { scale: 0.98, duration: 0.3, ease: "power1.out" });
    
    document.getElementById('trim-name').innerText = btn.dataset.name;
    trimPrice = parseInt(btn.dataset.price);
    updatePrice();
}

function updateVisor(btn) {
    document.querySelectorAll('#visor-tints .color-option').forEach(el => el.classList.remove('active'));
    btn.classList.add('active');
    
    document.getElementById('preview-visor').style.backgroundColor = btn.dataset.color;
    if (typeof gsap !== 'undefined') gsap.from("#preview-visor", { y: -10, duration: 0.3, ease: "power1.out" });
    
    document.getElementById('visor-name').innerText = btn.dataset.name;
    visorPrice = parseInt(btn.dataset.price);
    updatePrice();
}

// Initial price calc
updatePrice();

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
