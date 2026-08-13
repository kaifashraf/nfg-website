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
function initCarousel(wrapper) {
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
        images: ['green-helmet-front.png', 'green-helmet-right.png', 'green-helmet-left.png'],
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
        images: ['anti-riot-right.png', 'anti-riot-left.png'],
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
        images: ['safety-helmet-pro-main.png', 'safety-helmet-pro-left.png', 'safety-helmet-pro-right.png'],
        specs: {
            'Material': 'PVC',
            'Color': 'Yellow',
            'Size': 'Medium',
            'Usage/Application': 'Safety Helmet',
            'Features': 'Safety Helmet',
            'Country of Origin': 'Made in India'
        },
    'helmet4': {
        title: 'Delhi Police Riot Helmet',
        price: 'Rs 550',
        images: ['ai-helmet-front.jpg', 'ai-helmet-left.jpg', 'ai-helmet-right.jpg'],
        specs: {
            'Material': 'Polycarbonate (PC) & ABS',
            'Color': 'Black / Custom',
            'Visor': 'Scratch-resistant Clear Visor',
            'Usage/Application': 'Riot Control / Law Enforcement',
            'Features': 'High Impact Resistance, Neck Protector',
            'Country of Origin': 'Made in India'
        }
    },
    'kneepad1': {
        title: 'Tactical Defender Kneepads',
        price: 'Rs 1,200',
        images: ['kneepad-1.jpg', 'kneepad-2.jpg', 'kneepad-3.jpg'],
        specs: {
            'Material': 'High-Impact Polymer & Nylon',
            'Color': 'Black',
            'Fit': 'Adjustable Straps',
            'Usage': 'Tactical / Riot Control',
            'Country of Origin': 'Made in India'
        }
    },
    'kneepad2': {
        title: 'Tactical Combat Kneepads',
        price: 'Rs 1,400',
        images: ['kneepad-4.jpg', 'kneepad-5.jpg', 'kneepad-3.jpg'],
        specs: {
            'Material': 'High-Density Polymer',
            'Color': 'Green / Black',
            'Fit': 'Velcro Adjustable',
            'Usage': 'Combat / Military',
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
    const phone = document.getElementById('customerPhone').value;
    const productName = document.getElementById('modalTitle').innerText;
    
    if (!phone || phone.trim() === '') {
        alert("Please enter a valid contact number.");
        return;
    }
    
    // Simulate sending a notification to the company
    alert(`Request Sent! The NFG Sales Team has been notified that you are interested in the ${productName}. They will contact you at ${phone} with the latest pricing.`);
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
