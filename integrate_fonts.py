import os

with open('public/fonts/fonts.css', 'r', encoding='utf-8') as f:
    fonts_css = f.read().replace('./fonts/', '/fonts/')

with open('style.css', 'r', encoding='utf-8') as f:
    style_css = f.read()

import_statement = "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');"
style_css = style_css.replace(import_statement, fonts_css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(style_css)

os.remove('public/fonts/fonts.css')
print('Fonts integrated into style.css successfully.')
