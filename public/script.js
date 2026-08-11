// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// GSAP Animations
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animation
    gsap.from(".hero h1", { y: 50, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2 });
    gsap.from(".hero p", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.4 });
    gsap.from(".hero .btn", { y: 20, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.6 });
    gsap.from(".hero-image-placeholder", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.8 });

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
setInterval(nextTestimonial, 5000);

// Helmet Carousel functionality
const carousels = document.querySelectorAll('.carousel-wrapper');

carousels.forEach((wrapper) => {
    const track = wrapper.querySelector('.carousel-track');
    const dots = wrapper.querySelectorAll('.carousel-dots .dot');
    
    if (track && dots.length > 0) {
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
        
        // Click track to advance
        track.addEventListener('click', () => {
            let currentIndex = Math.round(track.scrollLeft / track.clientWidth);
            let nextIndex = (currentIndex + 1) % dots.length;
            track.scrollTo({
                left: nextIndex * track.clientWidth,
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
});

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
        image: 'green-helmet-front.png',
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
        image: 'anti-riot-right.png',
        specs: {
            'Material': 'Polycarbonate',
            'Color': 'Green / Brown',
            'Brand': 'NFG New Fibre Glass',
            'Usage': 'Anti Riot Helmet',
            'Country of Origin': 'Made in India'
        }
    }
};

// --- Product Modal Functionality --- //
function openProductModal(productId) {
    const modal = document.getElementById('productModal');
    const product = products[productId];
    
    if (modal && product) {
        // Populate Data
        document.getElementById('modalImage').src = product.image;
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
        document.getElementById('contactSection').style.display = 'block';
        document.getElementById('contactFormSection').style.display = 'none';
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
    const phone = document.getElementById('customerPhone').value;
    if (!phone || phone.trim() === '') {
        alert("Please enter a valid contact number.");
        return;
    }
    
    // Simulate sending a notification to the company
    alert("Request Sent! The NFG Sales Team has been notified and will contact you at " + phone + " with the latest pricing.");
    closeProductModal();
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
