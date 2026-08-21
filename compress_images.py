"""
Batch-convert every PNG and JPG in public/ to WebP with quality 80 and max 1024px width.
Also creates -348w and -696w responsive variants for each.
Updates all HTML files to reference the new .webp files instead of .png/.jpg.
Skips files that are already webp, or that are already responsive variants (-348w/-696w).
"""

import os
import re
from PIL import Image

PUBLIC = 'public'
MAX_WIDTH = 1024
QUALITY = 80
RESPONSIVE_WIDTHS = [348, 696]

converted = []
skipped = []

def convert_and_resize(src_path, base_name_no_ext, output_dir):
    """Convert a single image to WebP at multiple sizes."""
    try:
        img = Image.open(src_path)
    except Exception as e:
        print(f"  SKIP (can't open): {src_path} — {e}")
        skipped.append(src_path)
        return None

    # Convert to RGB if necessary (e.g., RGBA PNGs)
    if img.mode in ('RGBA', 'P', 'LA'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if 'A' in img.mode else None)
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    orig_w, orig_h = img.size
    
    # Save full-size WebP (capped at MAX_WIDTH)
    if orig_w > MAX_WIDTH:
        ratio = MAX_WIDTH / orig_w
        new_h = int(orig_h * ratio)
        full_img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
    else:
        full_img = img.copy()

    full_path = os.path.join(output_dir, base_name_no_ext + '.webp')
    full_img.save(full_path, 'WEBP', quality=QUALITY, method=4)
    full_size = os.path.getsize(full_path)
    print(f"  FULL: {full_path} ({full_size/1024:.0f}KB, {full_img.size[0]}x{full_img.size[1]})")

    # Save responsive variants
    for w in RESPONSIVE_WIDTHS:
        if w >= orig_w:
            continue  # Skip if variant is larger than original
        ratio = w / orig_w
        new_h = int(orig_h * ratio)
        resized = img.resize((w, new_h), Image.LANCZOS)
        variant_path = os.path.join(output_dir, f"{base_name_no_ext}-{w}w.webp")
        resized.save(variant_path, 'WEBP', quality=QUALITY, method=4)
        v_size = os.path.getsize(variant_path)
        print(f"  {w}w: {variant_path} ({v_size/1024:.0f}KB)")

    return full_img.size[0]

# ——— Phase 1: Convert images ———
print("=" * 60)
print("PHASE 1: Converting PNG/JPG images to WebP")
print("=" * 60)

# Map: original filename -> new webp filename (and width for srcset)
file_map = {}  # old_name -> { 'webp': new_name, 'width': w }

for filename in sorted(os.listdir(PUBLIC)):
    lower = filename.lower()
    # Only target PNG and JPG files
    if not (lower.endswith('.png') or lower.endswith('.jpg') or lower.endswith('.jpeg')):
        continue
    # Skip responsive variants
    if '-348w.' in filename or '-696w.' in filename:
        continue
    # Skip screenshots and non-product files
    if lower.startswith('screenshot'):
        continue

    src_path = os.path.join(PUBLIC, filename)
    base_no_ext = os.path.splitext(filename)[0]
    
    # Sanitize: replace spaces with hyphens, lowercase
    safe_base = base_no_ext.replace(' ', '-').replace('--', '-').lower()
    
    # Check if a webp already exists for this base name
    existing_webp = os.path.join(PUBLIC, safe_base + '.webp')
    if os.path.exists(existing_webp) and safe_base + '.webp' != filename:
        print(f"\n[SKIP] {filename} -> webp already exists: {safe_base}.webp")
        file_map[filename] = {'webp': safe_base + '.webp', 'width': None}
        skipped.append(filename)
        continue

    print(f"\n[CONVERT] {filename} ({os.path.getsize(src_path)/1024:.0f}KB)")
    width = convert_and_resize(src_path, safe_base, PUBLIC)
    if width:
        file_map[filename] = {'webp': safe_base + '.webp', 'width': width}
        converted.append(filename)

print(f"\n{'=' * 60}")
print(f"Converted: {len(converted)} files")
print(f"Skipped: {len(skipped)} files")

# ——— Phase 2: Update HTML references ———
print(f"\n{'=' * 60}")
print("PHASE 2: Updating HTML files")
print("=" * 60)

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes = 0
    
    for old_name, info in file_map.items():
        new_webp = info['webp']
        # URL-encode spaces for HTML src attributes
        old_encoded = old_name.replace(' ', '%20')
        
        if old_encoded in content or old_name in content:
            # Replace in src attributes
            content = content.replace(f'src="{old_encoded}"', f'src="{new_webp}"')
            content = content.replace(f'src="{old_name}"', f'src="{new_webp}"')
            # Replace in srcset if present
            content = content.replace(old_encoded, new_webp)
            changes += 1
    
    if content != original:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Updated: {html_file} ({changes} replacements)")
    else:
        print(f"  No changes: {html_file}")

# Also update script.js references
script_path = os.path.join(PUBLIC, 'script.js')
if os.path.exists(script_path):
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()
    original = content
    for old_name, info in file_map.items():
        new_webp = info['webp']
        old_encoded = old_name.replace(' ', '%20')
        content = content.replace(old_encoded, new_webp)
        content = content.replace(old_name, new_webp)
    if content != original:
        with open(script_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  Updated: script.js")

# ——— Phase 3: Summary ———
print(f"\n{'=' * 60}")
print("SUMMARY")
print("=" * 60)

total_old = 0
total_new = 0
for old_name in converted:
    old_size = os.path.getsize(os.path.join(PUBLIC, old_name))
    total_old += old_size
    new_name = file_map[old_name]['webp']
    new_path = os.path.join(PUBLIC, new_name)
    if os.path.exists(new_path):
        total_new += os.path.getsize(new_path)

print(f"Original size: {total_old/1024/1024:.1f}MB")
print(f"New WebP size:  {total_new/1024/1024:.1f}MB")
if total_old > 0:
    print(f"Reduction:      {(1 - total_new/total_old)*100:.0f}%")
print("\nDone!")
