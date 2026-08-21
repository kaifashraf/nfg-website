import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # We will find all img tags
    def img_replacer(match):
        full_tag = match.group(0)
        
        # Determine if it's a hero image (e.g., src="hero_helmet.webp" or has hero class, 
        # but in our case, it's hero_helmet.webp)
        is_hero = 'hero_helmet' in full_tag or 'class="hero-bg-custom"' in content
        
        # But wait, we are checking the img tag, not the context here. Let's rely on src or if it's the first image in a hero section.
        if 'hero_helmet.webp' in full_tag or 'hero_helmet.png' in full_tag:
            # Hero image
            new_tag = full_tag
            # Remove loading="lazy" if it's there
            new_tag = re.sub(r'\s*loading="lazy"', '', new_tag)
            # Add fetchpriority="high" if not there
            if 'fetchpriority="high"' not in new_tag:
                new_tag = new_tag.replace('<img ', '<img fetchpriority="high" ')
            # Change decoding="async" to decoding="sync" if there, else add decoding="sync"
            if 'decoding="async"' in new_tag:
                new_tag = new_tag.replace('decoding="async"', 'decoding="sync"')
            elif 'decoding="sync"' not in new_tag:
                new_tag = new_tag.replace('<img ', '<img decoding="sync" ')
            return new_tag
        else:
            # Non-hero image
            new_tag = full_tag
            if 'loading="lazy"' not in new_tag:
                new_tag = new_tag.replace('<img ', '<img loading="lazy" ')
            if 'decoding="async"' not in new_tag:
                new_tag = new_tag.replace('<img ', '<img decoding="async" ')
            return new_tag

    new_content = re.sub(r'<img[^>]+>', img_replacer, content)

    # Now add preload tag for hero_helmet.webp to <head> if not exists
    # Find the hero image tag to extract srcset and sizes
    hero_img_match = re.search(r'<img[^>]+src="(hero_helmet\.(?:webp|png))"[^>]+>', new_content)
    if hero_img_match:
        hero_tag = hero_img_match.group(0)
        srcset_match = re.search(r'srcset="([^"]+)"', hero_tag)
        sizes_match = re.search(r'sizes="([^"]+)"', hero_tag)
        src = hero_img_match.group(1)
        
        preload_tag = f'<link rel="preload" as="image" href="{src}"'
        if srcset_match:
            preload_tag += f' imagesrcset="{srcset_match.group(1)}"'
        if sizes_match:
            preload_tag += f' imagesizes="{sizes_match.group(1)}"'
        preload_tag += ' fetchpriority="high">'
        
        if preload_tag not in new_content:
            new_content = new_content.replace('</head>', f'    {preload_tag}\n</head>')

    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Optimized images across all HTML files.")
