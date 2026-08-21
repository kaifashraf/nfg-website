import glob
import os

desktop_nav_old = """                        <a href="kneepads.html">Anti Riot Equipment</a>
                        <a href="bodyguard.html">Body Protection</a>"""

desktop_nav_new = """                        <div class="nav-dropdown sub-dropdown" style="width: 100%;">
                            <a href="kneepads.html" style="display:flex; justify-content:space-between; align-items:center;">Anti Riot Equipment <span>▸</span></a>
                            <div class="nav-dropdown-content sub-dropdown-content" style="left: 100%; top: 0; min-width: 210px; margin-left: 0; border-top: none; border-left: 2px solid var(--color-accent); border-radius: 0 8px 8px 8px;">
                                <a href="kneepads.html#shield">Polycarbonate Shield</a>
                                <a href="kneepads.html#cloth">Cloth Body Protector</a>
                                <a href="kneepads.html#full">Full Body Protector</a>
                                <a href="kneepads.html#lathi">Polycarbonate Lathi</a>
                            </div>
                        </div>"""

mobile_nav_old = """                    <a href="kneepads.html" onclick="toggleMobileMenu()">Anti Riot Equipment</a>
                    <a href="bodyguard.html" onclick="toggleMobileMenu()">Body Protection</a>"""

mobile_nav_new = """                    <div class="mobile-dropdown">
                        <a class="mobile-dropdown-toggle" onclick="this.nextElementSibling.classList.toggle('active')" style="padding: 0; color: var(--color-text-light); font-size: 1rem; width: auto; justify-content: flex-start; gap: 8px;">Anti Riot Equipment ▾</a>
                        <div class="mobile-dropdown-content">
                            <a href="kneepads.html#shield" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Polycarbonate Shield</a>
                            <a href="kneepads.html#cloth" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Cloth Body Protector</a>
                            <a href="kneepads.html#full" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Full Body Protector</a>
                            <a href="kneepads.html#lathi" onclick="toggleMobileMenu()" style="font-size: 0.9rem;">Polycarbonate Lathi</a>
                        </div>
                    </div>"""

for html_file in glob.glob("*.html"):
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()

    new_content = content.replace(desktop_nav_old, desktop_nav_new)
    new_content = new_content.replace(mobile_nav_old, mobile_nav_new)
    
    if new_content != content:
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated nav in {html_file}")

# Update kneepads.html IDs
with open("kneepads.html", "r", encoding="utf-8") as f:
    kneepads = f.read()

kneepads = kneepads.replace('<!-- Product Card 1 -->\n                <div class="product-card">', '<!-- Product Card 1 -->\n                <div class="product-card" id="shield">')
kneepads = kneepads.replace('<!-- Cloth Body Protector -->\n                <div class="product-card">', '<!-- Cloth Body Protector -->\n                <div class="product-card" id="cloth">')
kneepads = kneepads.replace('<!-- Full Body Protector -->\n                <div class="product-card">', '<!-- Full Body Protector -->\n                <div class="product-card" id="full">')
kneepads = kneepads.replace('<!-- Polycarbonate Lathi -->\n                <div class="product-card">', '<!-- Polycarbonate Lathi -->\n                <div class="product-card" id="lathi">')

with open("kneepads.html", "w", encoding="utf-8") as f:
    f.write(kneepads)
print("Updated kneepads.html IDs")
