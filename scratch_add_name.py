import os

files = ['kneepads.html', 'index.html', 'helmets.html', 'bodyguard.html']

old_input = """<input type="tel" id="customerPhone" placeholder="+91 98765 43210" style="width: 100%; padding: 14px 16px; border: 1px solid rgba(0,0,0,0.15); font-size: 1rem; border-radius: 4px; background: #fff; font-family: inherit; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-accent)'" onblur="this.style.borderColor='rgba(0,0,0,0.15)'">"""

new_input = """<input type="text" id="customerName" placeholder="Your Name" style="width: 100%; padding: 14px 16px; border: 1px solid rgba(0,0,0,0.15); font-size: 1rem; border-radius: 4px; background: #fff; font-family: inherit; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-accent)'" onblur="this.style.borderColor='rgba(0,0,0,0.15)'">\n                            <input type="tel" id="customerPhone" placeholder="+91 98765 43210" style="width: 100%; padding: 14px 16px; border: 1px solid rgba(0,0,0,0.15); font-size: 1rem; border-radius: 4px; background: #fff; font-family: inherit; outline: none; transition: border-color 0.2s;" onfocus="this.style.borderColor='var(--color-accent)'" onblur="this.style.borderColor='rgba(0,0,0,0.15)'">"""

for f in files:
    if os.path.exists(f):
        c = open(f, 'r', encoding='utf-8').read()
        c = c.replace(old_input, new_input)
        open(f, 'w', encoding='utf-8').write(c)
        print(f"Updated {f}")
