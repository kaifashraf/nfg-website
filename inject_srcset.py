import os
import re
from PIL import Image

# Build a dictionary of original image widths
img_widths = {}
dirs = ['public', '.']
for d in dirs:
    for file in os.listdir(d):
        if file.endswith('.webp') and '-348w' not in file and '-696w' not in file:
            try:
                with Image.open(os.path.join(d, file)) as img:
                    img_widths[file] = img.size[0]
            except Exception:
                pass

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

# We'll use a regex to find <img ... src="filename.webp" ...>
# and inject srcset and sizes if the variants exist
for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Fix the about.html which still references hero_helmet.png
    content = content.replace('src="hero_helmet.png"', 'src="hero_helmet.webp"')
    
    def replacer(match):
        full_tag = match.group(0)
        src = match.group(1)
        
        # Don't add srcset if it already exists or if it's not a webp we resized
        if 'srcset=' in full_tag or src not in img_widths:
            return full_tag
            
        orig_width = img_widths[src]
        
        # Does the -348w variant exist?
        base_name = src.replace('.webp', '')
        has_348 = os.path.exists(os.path.join('public', base_name + '-348w.webp')) or os.path.exists(os.path.join('.', base_name + '-348w.webp'))
        has_696 = os.path.exists(os.path.join('public', base_name + '-696w.webp')) or os.path.exists(os.path.join('.', base_name + '-696w.webp'))
        
        if not has_348 and not has_696:
            return full_tag
            
        srcset_parts = []
        if has_348:
            srcset_parts.append(f"{base_name}-348w.webp 348w")
        if has_696:
            srcset_parts.append(f"{base_name}-696w.webp 696w")
        srcset_parts.append(f"{src} {orig_width}w")
        
        srcset = ", ".join(srcset_parts)
        
        # Determine sizes
        if 'hero' in src:
            sizes = "100vw"
        else:
            # Gallery item size
            sizes = "(max-width: 768px) calc(100vw - 4rem), (max-width: 1440px) calc(50vw - 3rem), 656px"
            
        # Inject right after src="..."
        new_tag = full_tag.replace(f'src="{src}"', f'src="{src}" srcset="{srcset}" sizes="{sizes}"')
        return new_tag

    new_content = re.sub(r'<img[^>]*src="([^"]+\.webp)"[^>]*>', replacer, content)
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Injected srcset and sizes into HTML files.")
