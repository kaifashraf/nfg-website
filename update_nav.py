import glob
import os

desktop_search = '<a href="helmets.html">Helmets</a>'
desktop_replace = '''<div class="nav-dropdown sub-dropdown" style="width: 100%;">
                            <a href="helmets.html" style="display:flex; justify-content:space-between; align-items:center;">Helmets <span>▸</span></a>
                            <div class="nav-dropdown-content sub-dropdown-content" style="left: 100%; top: 0; min-width: 200px; margin-left: 0; border-top: none; border-left: 2px solid var(--color-accent); border-radius: 0 8px 8px 8px;">
                                <a href="helmets.html#military">Defence Series</a>
                                <a href="helmets.html#civil">Civil Series</a>
                                <a href="helmets.html#tactical">Tactical Series</a>
                                <a href="helmets.html#traffic">Traffic Series</a>
                                <a href="helmets.html#safety">Industrial Series</a>
                                <a href="helmets.html#sporting">Sporting Series</a>
                            </div>
                        </div>'''

mobile_search = '<a href="helmets.html" onclick="toggleMobileMenu()">Helmets</a>'
mobile_replace = '''<div class="mobile-dropdown">
                        <a class="mobile-dropdown-toggle" onclick="this.nextElementSibling.classList.toggle(\\'active\\')" style="padding: 0; color: var(--color-text-light); font-size: 1rem; width: auto; justify-content: flex-start; gap: 8px;">Helmets ▾</a>
                        <div class="mobile-dropdown-content">
                            <a href="helmets.html#military" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Defence Series</a>
                            <a href="helmets.html#civil" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Civil Series</a>
                            <a href="helmets.html#tactical" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Tactical Series</a>
                            <a href="helmets.html#traffic" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Traffic Series</a>
                            <a href="helmets.html#safety" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Industrial Series</a>
                            <a href="helmets.html#sporting" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Sporting Series</a>
                        </div>
                    </div>'''

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if desktop_search in content or mobile_search in content:
        content = content.replace(desktop_search, desktop_replace)
        content = content.replace(mobile_search, mobile_replace)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f'Updated {f}')
