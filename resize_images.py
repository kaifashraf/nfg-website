import os
from PIL import Image

dirs_to_check = ['public', '.']
generated = 0

for d in dirs_to_check:
    for file in os.listdir(d):
        if not file.endswith('.webp'):
            continue
        if '-348w' in file or '-696w' in file:
            continue
        
        path = os.path.join(d, file)
        if not os.path.isfile(path):
            continue
            
        try:
            with Image.open(path) as img:
                width, height = img.size
                
                # Generate 348w
                if width > 348:
                    ratio = 348 / width
                    new_h = int(height * ratio)
                    img_348 = img.resize((348, new_h), Image.Resampling.LANCZOS)
                    new_name = file.replace('.webp', '-348w.webp')
                    img_348.save(os.path.join(d, new_name), 'WEBP', quality=85)
                    generated += 1
                
                # Generate 696w
                if width > 696:
                    ratio = 696 / width
                    new_h = int(height * ratio)
                    img_696 = img.resize((696, new_h), Image.Resampling.LANCZOS)
                    new_name = file.replace('.webp', '-696w.webp')
                    img_696.save(os.path.join(d, new_name), 'WEBP', quality=85)
                    generated += 1
        except Exception as e:
            print(f'Error processing {file}: {e}')

print(f'Generated {generated} optimized image variants.')
