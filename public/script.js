// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let isNavbarTicking = false;

window.addEventListener('scroll', () => {
    if (!isNavbarTicking) {
        window.requestAnimationFrame(() => {
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            isNavbarTicking = false;
        });
        isNavbarTicking = true;
    }
}, { passive: true });

// GSAP Animations
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    if (document.querySelector(".hero")) {
        gsap.from(".hero h1", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
        gsap.from(".hero p", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.4 });
        gsap.from(".hero .btn", { y: 20, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.6 });
        if (document.querySelector(".hero-image-placeholder")) {
            gsap.from(".hero-image-placeholder", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.8 });
        }
    }

    // Section Titles
    gsap.utils.toArray('section h2').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Gallery Items
    gsap.utils.toArray('.gallery-item').forEach((item, i) => {
        let xOffset = i % 2 === 0 ? -100 : 100;
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            x: xOffset,
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Process Steps
    gsap.from(".process-step", {
        scrollTrigger: {
            trigger: ".process-grid",
            start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
}

// Testimonial Slider
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    if (testimonials.length === 0) return;
    
    // Hide all
    testimonials.forEach(t => t.classList.remove('active'));
    
    // Show current
    testimonials[index].classList.add('active');
    
    // Animate in
    if (typeof gsap !== 'undefined') {
        gsap.from(testimonials[index], { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" });
    }
}

function nextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
}

function prevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonialIndex);
}

// Auto advance testimonials
if (testimonials.length > 0) {
    setInterval(nextTestimonial, 5000);
}

// Helmet Carousel functionality
function initCarousel(wrapper) {
    let track = wrapper.querySelector('.carousel-track');
    let dots = wrapper.querySelectorAll('.carousel-dots .dot');
    
    if (!track || dots.length === 0) return;

    // Prevent duplicate event listeners if initialized multiple times (e.g. in modals)
    if (wrapper.dataset.initialized === 'true') {
        const newTrack = track.cloneNode(true);
        track.parentNode.replaceChild(newTrack, track);
        track = newTrack;
        dots = wrapper.querySelectorAll('.carousel-dots .dot');
    }
    wrapper.dataset.initialized = 'true';

    track.style.cursor = 'pointer';
    
    // Update dots on scroll
    track.addEventListener('scroll', () => {
        const index = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach((dot, i) => {
            if(i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    });
    
    function advanceCarousel() {
        if (!track.clientWidth) return; // Don't scroll if hidden
        let currentIndex = Math.round(track.scrollLeft / track.clientWidth);
        let nextIndex = (currentIndex + 1) % dots.length;
        track.scrollTo({
            left: nextIndex * track.clientWidth,
            behavior: 'smooth'
        });
    }

    // Click track to advance manually (directional)
    track.addEventListener('click', (e) => {
        if (!track.clientWidth) return;
        
        const rect = track.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const currentIndex = Math.round(track.scrollLeft / track.clientWidth);
        let targetIndex;
        
        if (clickX < rect.width / 2) {
            // Clicked left half -> go to previous
            targetIndex = (currentIndex - 1 + dots.length) % dots.length;
        } else {
            // Clicked right half -> go to next
            targetIndex = (currentIndex + 1) % dots.length;
        }
        
        track.scrollTo({
            left: targetIndex * track.clientWidth,
            behavior: 'smooth'
        });
    });
    
    // Click dots to jump
    dots.forEach((dot, i) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            track.scrollTo({
                left: i * track.clientWidth,
                behavior: 'smooth'
            });
        });
    });
}

// Helmet Carousel functionality
document.querySelectorAll('.carousel-wrapper').forEach(initCarousel);

// --- Mobile Menu Functionality --- //
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggleBtn.classList.remove('active');
        navbar.classList.remove('menu-open');
        document.body.style.overflow = ''; // Restore scrolling
    } else {
        menu.classList.add('active');
        toggleBtn.classList.add('active');
        navbar.classList.add('menu-open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }
}

// --- Product Database --- //
const products = {
    'helmet1': {
        title: 'Police Riot Helmet',
        price: 'Rs 900',
        images: ['green-helmet-front.webp', 'green-helmet-right.webp', 'green-helmet-left.webp'],
        specs: {
            'Color': 'Green',
            'Country of Origin': 'Made in India',
            'Material': 'Polycarbonate',
            'Features': 'Fibre Glass',
            'Usage': 'Riot Helmet'
        }
    },
    'helmet2': {
        title: 'Anti-Riot Shield Helmet',
        price: 'Rs 400',
        images: ['anti-riot-right.webp', 'anti-riot-left.webp'],
        specs: {
            'Material': 'Polycarbonate',
            'Color': 'Green / Brown',
            'Brand': 'NFG New Fibre Glass',
            'Usage': 'Anti Riot Helmet',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet3': {
        title: 'Fire Safety Helmet',
        price: 'Rs 350',
        images: ['safety-helmet-pro-main.webp', 'safety-helmet-pro-left.webp', 'safety-helmet-pro-right.webp'],
        specs: {
            'Material': 'PVC',
            'Color': 'Yellow',
            'Size': 'Medium',
            'Usage/Application': 'Safety Helmet',
            'Features': 'Safety Helmet',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet4': {
        title: 'Delhi Police Riot Helmet',
        price: 'Rs 550',
        images: ['ai-helmet-front.webp', 'ai-helmet-left.webp', 'ai-helmet-right.webp'],
        specs: {
            'Material': 'Polycarbonate (PC) & ABS',
            'Color': 'Black / Custom',
            'Visor': 'Scratch-resistant Clear Visor',
            'Usage/Application': 'Riot Control / Law Enforcement',
            'Features': 'High Impact Resistance, Neck Protector',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet5': {
        title: 'Sports Safety Helmet',
        price: 'Get Best Quote',
        images: ['cricket-helmet-front.webp', 'cricket-helmet-right.webp', 'cricket-helmet-left.webp', 'cricket-helmet-back.webp'],
        specs: {
            'Material': 'Fiberglass Shell',
            'Color': 'Navy Blue',
            'Visor': 'Metal Face Grill',
            'Usage/Application': 'Sports Safety',
            'Features': 'Lightweight, High Impact Resistance',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet6': {
        title: 'Anti Riot ISO Helmet',
        price: 'Get Best Quote',
        images: ['iso-helmet-new-1.jpg', 'iso-helmet-new-2.jpg', 'iso-helmet-new-3.png'],
        specs: {
            'Material': 'Polycarbonate',
            'Color': 'Green / Black',
            'Visor': 'Clear Visor',
            'Usage/Application': 'Riot Control',
            'Features': 'ISO Certified, Defender Series',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet7': {
        title: 'Anti Riot MK-II Helmet',
        price: 'Get Best Quote',
        images: ['mk2-helmet-1.jpg', 'mk2-helmet-2.jpg', 'mk2-helmet-3.png'],
        specs: {
            'Material': 'Polycarbonate (PC) Shell',
            'Color': 'Black',
            'Visor': 'Steel Wire Mesh',
            'Usage/Application': 'Riot Control',
            'Features': 'MK-II Advanced Protection',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet8': {
        title: 'Anti Riot Combat Helmet',
        price: 'Get Best Quote',
        images: ['combat-helmet-1.jpg', 'combat-helmet-2.jpg', 'combat-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact Polymer & Kevlar Blend',
            'Color': 'Olive Green',
            'Visor': 'Reinforced Clear Visor',
            'Usage/Application': 'Riot Control & Combat',
            'Features': 'Combat Grade, Maximum Protection',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet9': {
        title: 'Anti Riot Phatka Helmet',
        price: 'Get Best Quote',
        images: ['phatka-helmet-1.jpg', 'phatka-helmet-2.jpg', 'phatka-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact Synthetic Fibers',
            'Color': 'Camouflage',
            'Visor': 'None',
            'Usage/Application': 'Riot Control & Defense',
            'Features': 'Lightweight Camo Phatka',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet10': {
        title: 'Anti Riot Old Police Cap',
        price: 'Get Best Quote',
        images: ['old-police-cap-1.png', 'old-police-cap-2.png', 'old-police-cap-3.png'],
        specs: {
            'Material': 'Classic Impact Resistant Material',
            'Color': 'Multi-color',
            'Visor': 'N/A',
            'Usage/Application': 'Riot Control & Heritage',
            'Features': 'Classic Design with Modern Protection',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet11': {
        title: 'Vigorous Helmet',
        price: 'Get Best Quote',
        images: ['vigorous-helmet-1.jpg', 'vigorous-helmet-2.jpg', 'vigorous-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact ABS Shell',
            'Color': 'Black/Silver',
            'Visor': 'Scratch Resistant Clear Visor',
            'Usage/Application': 'Civil / Motorcycle Riding',
            'Features': 'Lightweight Shell, DOT Certified',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet12': {
        title: 'AM-I Helmet',
        price: 'Get Best Quote',
        images: ['ami-helmet-1.jpg', 'ami-helmet-2.jpg', 'ami-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact ABS Shell',
            'Color': 'Black with Blue Graphics',
            'Visor': 'Clear Scratch Resistant Visor',
            'Usage/Application': 'Civil / Motorbike Riding',
            'Features': 'Aerodynamic Design, ISI Marked',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet13': {
        title: 'MUB Helmet',
        price: 'Get Best Quote',
        images: ['mub-helmet-1.jpg', 'mub-helmet-2.jpg', 'mub-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact ABS Shell',
            'Color': 'Glossy Black',
            'Visor': 'Clear Scratch Resistant Visor',
            'Usage/Application': 'Civil / Open Face Riding',
            'Features': 'Comfortable Fit, ISI Marked',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet14': {
        title: 'HAMZ Helmet',
        price: 'Get Best Quote',
        images: ['hamz-helmet-1.jpg', 'hamz-helmet-2.jpg', 'hamz-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact ABS Shell',
            'Color': 'Glossy Black with Leather trim',
            'Visor': 'Clear Scratch Resistant Visor',
            'Usage/Application': 'Civil / Open Face Riding',
            'Features': 'Classic Design, ISI Marked',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet15': {
        title: 'PSG Helmet',
        price: 'Get Best Quote',
        images: ['psg-helmet-1.jpg', 'psg-helmet-2.jpg', 'psg-helmet-3.png'],
        specs: {
            'Material': 'High-Impact Kevlar/Aramid',
            'Color': 'Olive Green',
            'Protection Level': 'High Impact / Ballistic',
            'Usage/Application': 'Tactical / Military / Special Forces',
            'Features': 'Comfortable Fit, Maximum Protection',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet16': {
        title: 'D Type Traffic Helmet',
        price: 'Get Best Quote',
        images: ['traffic-helmet-1.jpg', 'traffic-helmet-2.png', 'traffic-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact ABS Shell',
            'Color': 'White with Checker Pattern',
            'Visor': 'Clear Scratch Resistant Visor',
            'Usage/Application': 'Traffic Police / Law Enforcement',
            'Features': 'Lightweight, Comfortable Fit, Reflective Tape',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet17': {
        title: 'Full Face Helmet',
        price: 'Get Best Quote',
        images: ['traffic-helmet-full-1.png', 'traffic-helmet-full-2.png', 'traffic-helmet-full-3.png'],
        specs: {
            'Material': 'High-Impact ABS Shell',
            'Color': 'White with Custom Graphics',
            'Visor': 'Clear Scratch Resistant Visor',
            'Usage/Application': 'Traffic Police / Law Enforcement',
            'Features': 'Full Face Protection, ISI Marked',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet18': {
        title: 'Open Face Helmet',
        price: 'Get Best Quote',
        images: ['traffic-helmet-open-1.png', 'traffic-helmet-open-2.jpg', 'traffic-helmet-open-3.png'],
        specs: {
            'Material': 'High-Impact ABS Shell',
            'Color': 'White with Blue/Red Stripes or Custom Camouflage',
            'Visor': 'Extended Clear Visor',
            'Usage/Application': 'Traffic Police / Law Enforcement / Patrolling',
            'Features': 'Comfortable Fit, Maximum Visibility',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet19': {
        title: 'FRP Safety Helmet',
        price: 'Get Best Quote',
        images: ['frp-helmet-1.jpg', 'frp-helmet-2.png', 'frp-helmet-3.jpg'],
        specs: {
            'Material': 'Fibre Reinforced Plastic (FRP)',
            'Color': 'Orange (Also available in Yellow, White)',
            'Protection Level': 'High Impact Resistance',
            'Usage/Application': 'Construction / Industrial / Mining',
            'Features': 'Comfortable Harness, Heat Resistant, ISI Marked',
            'Country of Origin': 'Made in India'
        }
    },
    'helmet20': {
        title: 'Rafting Helmet',
        price: 'Get Best Quote',
        images: ['rafting-helmet-1.jpg', 'rafting-helmet-2.jpg', 'rafting-helmet-3.jpg'],
        specs: {
            'Material': 'High-Impact ABS Shell with EVA Foam',
            'Color': 'Red (Custom colors available)',
            'Protection Level': 'Water / Impact Resistant',
            'Usage/Application': 'River Rafting / Kayaking / Water Sports',
            'Features': 'Quick Dry Padding, Adjustable Chin Strap, Vented',
            'Country of Origin': 'Made in India'
        }
    },
    'shield1': {
        title: 'Polycarbonate Shield',
        price: 'Get Best Quote',
        images: ['SHEILD%201.02.png', 'SHEILD%201.03.png', 'SHEILD%201.05.png'],
        specs: {
            'Material': 'High-Impact Polycarbonate',
            'Color': 'Transparent',
            'Protection Level': 'High Impact Resistance',
            'Usage': 'Riot Control / Law Enforcement',
            'Country of Origin': 'Made in India'
        }
    },
    'cloth_body_protector': {
        title: 'Cloth Body Protector',
        price: 'Get Best Quote',
        images: ['body-armor-1.webp', 'body-armor-2.webp'],
        specs: {
            'Material': 'High-Impact Polycarbonate with Cloth Carrier',
            'Color': 'Camouflage',
            'Fit': 'Adjustable Straps',
            'Usage': 'Riot Control / Tactical',
            'Country of Origin': 'Made in India'
        }
    },
    'full_body_protector': {
        title: 'Full Body Protector',
        price: 'Get Best Quote',
        images: ['FBP-1.webp', 'FBP-2.webp', 'FBP-3.webp'],
        specs: {
            'Material': 'High-Impact Polycarbonate & EVA Foam',
            'Color': 'Black',
            'Fit': 'Fully Adjustable Modular System',
            'Usage': 'Riot Control / Law Enforcement',
            'Country of Origin': 'Made in India'
        }
    },
    'polycarbonate_lathi': {
        title: 'Polycarbonate Lathi',
        price: 'Get Best Quote',
        images: ['LATHI-1.webp', 'LATHI-2.webp', 'LATHI-3.webp'],
        specs: {
            'Material': 'Solid Polycarbonate',
            'Length': 'Standard 3ft / Custom',
            'Durability': 'Unbreakable / High-Impact',
            'Usage': 'Riot Control / Crowd Management',
            'Country of Origin': 'Made in India'
        }
    }
};

// --- Product Modal Functionality --- //
function openProductModal(productId, directToContact = false) {
    const modal = document.getElementById('productModal');
    const product = products[productId];
    
    if (modal && product) {
        // Populate Data
        const track = document.getElementById('modalCarouselTrack');
        const dotsContainer = document.getElementById('modalCarouselDots');
        
        if (track && dotsContainer && product.images) {
            let slidesHtml = '';
            let dotsHtml = '';
            product.images.forEach((imgSrc, index) => {
                slidesHtml += `<img src="${imgSrc}" alt="${product.title}" class="carousel-slide" onerror="this.style.display='none'">`;
                dotsHtml += `<span class="dot ${index === 0 ? 'active' : ''}"></span>`;
            });
            track.innerHTML = slidesHtml;
            dotsContainer.innerHTML = dotsHtml;
            track.scrollLeft = 0; // Reset scroll
            initCarousel(document.getElementById('modalCarouselWrapper'));
        } else {
            // Fallback for single image if images array is not provided
            if (document.getElementById('modalImage')) {
                document.getElementById('modalImage').src = product.images ? product.images[0] : (product.image || '');
            }
        }
        
        document.getElementById('modalTitle').innerText = product.title;
        document.getElementById('modalPrice').innerHTML = `Approx. Price: <strong>${product.price}</strong> / Piece`;
        
        let specsHtml = '';
        for (const [key, value] of Object.entries(product.specs)) {
            specsHtml += `
            <tr style="border-bottom: 1px solid rgba(0,0,0,0.05);">
                <td style="padding: 12px 0; color: var(--color-text-light);">${key}</td>
                <td style="padding: 12px 0; font-weight: 500;">${value}</td>
            </tr>`;
        }
        document.getElementById('modalSpecsTable').innerHTML = specsHtml;

        // Show Modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Reset form state
        if (directToContact) {
            document.getElementById('contactSection').style.display = 'none';
            document.getElementById('contactFormSection').style.display = 'flex';
            document.getElementById('modalPrice').style.display = 'none';
        } else {
            document.getElementById('contactSection').style.display = 'block';
            document.getElementById('contactFormSection').style.display = 'none';
            document.getElementById('modalPrice').style.display = 'block';
        }
        document.getElementById('customerPhone').value = '';
    }
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function showContactForm() {
    document.getElementById('contactSection').style.display = 'none';
    document.getElementById('contactFormSection').style.display = 'flex';
}

function submitInterest() {
    const nameInput = document.getElementById('customerName');
    const name = nameInput ? nameInput.value : '';
    const phone = document.getElementById('customerPhone').value;
    const productName = document.getElementById('modalTitle').innerText;
    
    if (nameInput && (!name || name.trim() === '')) {
        alert("Please enter your name.");
        return;
    }
    if (!phone || phone.trim() === '') {
        alert("Please enter a valid contact number.");
        return;
    }
    
    const submitBtn = document.querySelector('#contactFormSection .btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'SENDING...';
    submitBtn.disabled = true;

    // Format current date and time
    const now = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const dateStr = now.toLocaleString('en-US', options);
    
    fetch("https://formsubmit.co/ajax/kaifashraf07@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Product Enquiry - ${productName}`,
            Customer: name,
            Phone: phone,
            Product: productName,
            Submitted: dateStr,
            _template: "table"
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Request Sent! The NFG Sales Team has been notified that you are interested in the ${productName}. They will contact you shortly.`);
        closeProductModal();
        
        // Reset form
        if(nameInput) nameInput.value = '';
        document.getElementById('customerPhone').value = '';
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    })
    .catch(error => {
        alert("There was an error sending your request. Please try again or call us directly.");
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
}

// Close modal on clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    const modalContent = document.querySelector('.modal-content');
    if (modal && modal.classList.contains('active')) {
        // If they click the overlay (not the content inside it)
        if (event.target === modal) {
            closeProductModal();
        }
    }
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

// Mobile button hover state fix for iOS/Safari
document.addEventListener('DOMContentLoaded', () => {
    const mobileEnquiryBtns = document.querySelectorAll('.mobile-enquiry-btn');
    mobileEnquiryBtns.forEach(btn => {
        btn.addEventListener('touchstart', () => btn.classList.add('active-state'), {passive: true});
        btn.addEventListener('touchend', () => btn.classList.remove('active-state'), {passive: true});
        btn.addEventListener('touchcancel', () => btn.classList.remove('active-state'), {passive: true});
    });

    const galleryWrappers = document.querySelectorAll('.gallery-image-wrapper, .product-image-container');
    galleryWrappers.forEach(wrapper => {
        wrapper.addEventListener('touchstart', () => wrapper.classList.add('active-state'), {passive: true});
        wrapper.addEventListener('touchend', () => wrapper.classList.remove('active-state'), {passive: true});
        wrapper.addEventListener('touchcancel', () => wrapper.classList.remove('active-state'), {passive: true});
    });
});

// --- Global Search Functionality --- //
document.addEventListener('DOMContentLoaded', () => {
    // Inject Search HTML
    const searchHTML = `
        <div class="search-modal" id="searchModal">
            <button class="search-close-btn" onclick="closeSearchModal()" aria-label="Close Search">
                <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"></path></svg>
            </button>
            <div class="search-modal-content">
                <div class="search-input-wrapper">
                    <input type="text" class="search-input" id="searchInput" placeholder="Search for products, materials, series..." autocomplete="off">
                </div>
                <div class="search-results" id="searchResults"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchHTML);

    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value.toLowerCase());
        });
    }

    // Check for open URL param
    const urlParams = new URLSearchParams(window.location.search);
    const openProduct = urlParams.get('open');
    if (openProduct && typeof openProductModal === 'function') {
        // slight delay to let DOM settle
        setTimeout(() => {
            openProductModal(openProduct);
        }, 500);
    }
});

function openSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus(); // Synchronous focus is required for mobile keyboards to open automatically
        }
    }
}

function closeSearchModal() {
    const modal = document.getElementById('searchModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('searchResults').innerHTML = '';
    }
}

function getProductPageUrl(id) {
    if (id.startsWith('helmet')) return 'helmets.html';
    if (id.startsWith('kneepad')) return 'kneepads.html';
    if (id.startsWith('bodyguard')) return 'bodyguard.html';
    return 'index.html';
}

function handleSearch(query) {
    const resultsContainer = document.getElementById('searchResults');
    if (!query.trim()) {
        resultsContainer.innerHTML = '';
        return;
    }

    const matchedProducts = [];

    // Filter products
    for (const [id, data] of Object.entries(products)) {
        let match = false;
        if (data.title && data.title.toLowerCase().includes(query)) match = true;
        
        if (!match && data.specs) {
            for (const val of Object.values(data.specs)) {
                if (val && val.toLowerCase().includes(query)) {
                    match = true;
                    break;
                }
            }
        }
        
        if (match) {
            matchedProducts.push({ id, ...data });
        }
    }

    // Render results
    if (matchedProducts.length === 0) {
        resultsContainer.innerHTML = '<div style="color: rgba(255,255,255,0.5); padding: 20px;">No matching products found.</div>';
        return;
    }

    resultsContainer.innerHTML = matchedProducts.map(p => {
        const pageUrl = getProductPageUrl(p.id);
        const imagePath = (p.images && p.images.length > 0) ? p.images[0] : '';
        const category = p.specs && p.specs['Usage'] ? p.specs['Usage'] : (p.specs && p.specs['Brand'] ? p.specs['Brand'] : 'Product');
        
        return `
            <a href="${pageUrl}?open=${p.id}" class="search-result-item" onclick="closeSearchModal()">
                <img src="${imagePath}" alt="${p.title}" class="search-result-image" onerror="this.style.display='none'">
                <div class="search-result-info">
                    <span class="search-result-title">${p.title}</span>
                    <span class="search-result-cat">${category}</span>
                </div>
            </a>
        `;
    }).join('');
}
