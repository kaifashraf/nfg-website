const fs = require('fs');

const files = ['index.html', 'about.html', 'journal.html', 'configurator.html', 'helmets.html', 'kneepads.html', 'bodyguard.html', 'terms.html', 'contact.html'];

const trustSealSvg = `<a href="https://trustseal.indiamart.com/members/nfg-new-fibre-glass-private-limited" target="_blank" rel="noopener noreferrer" style="color: var(--color-accent); display: inline-flex; align-items: center; margin-right: 8px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                    </a>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Undo Footer
    const footerRegex = /<div style="margin-top: var\(--spacing-sm\); display: flex; align-items: center; gap: 8px;">\s*<a href="https:\/\/trustseal\.indiamart\.com\/members\/nfg-new-fibre-glass-private-limited"[^>]*>\s*<svg[^>]*>.*?<\/svg>\s*<\/a>\s*<p>Since 1971 &middot; India<\/p>\s*<\/div>/gs;
    content = content.replace(footerRegex, '<p style="margin-top: var(--spacing-sm);">Since 1971 &middot; India</p>');

    // Update index.html and about.html hero subtitle
    if (content.includes('<div class="hero-subtitle-custom">')) {
        // Replace existing to add the seal before the line
        content = content.replace(
            /<div class="hero-subtitle-custom">\s*<span class="line-custom"><\/span>\s*<span class="text-custom">SINCE 1971<\/span>\s*<\/div>/g,
            `<div class="hero-subtitle-custom" style="display: flex; align-items: center; justify-content: flex-start; gap: 8px;">\n                    ${trustSealSvg}\n                    <span class="line-custom"></span>\n                    <span class="text-custom">SINCE 1971</span>\n                </div>`
        );
        // Also catch if it still has 1975
        content = content.replace(
            /<div class="hero-subtitle-custom">\s*<span class="line-custom"><\/span>\s*<span class="text-custom">SINCE 1975<\/span>\s*<\/div>/g,
            `<div class="hero-subtitle-custom" style="display: flex; align-items: center; justify-content: flex-start; gap: 8px;">\n                    ${trustSealSvg}\n                    <span class="line-custom"></span>\n                    <span class="text-custom">SINCE 1971</span>\n                </div>`
        );
    }
    
    // For other pages, we can just inject the badge if they have a hero section.
    // However, if the user explicitly cropped the line and "SINCE 1971", 
    // it's highly possible they just wanted me to undo the footer, and put it on the homepage hero.
    
    fs.writeFileSync(file, content);
});

console.log('Done reverting footer and updating hero');
