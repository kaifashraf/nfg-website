from PIL import Image
import os

img_path = "public/iso-helmet-right.png"
if os.path.exists(img_path):
    print("Resizing image...")
    img = Image.open(img_path)
    
    # Calculate new size, maintaining aspect ratio
    max_size = (800, 800)
    img.thumbnail(max_size, Image.Resampling.LANCZOS)
    
    # Save optimized
    img.save("public/iso-helmet-right.png", optimize=True, quality=85)
    print(f"Resized successfully. New size: {os.path.getsize(img_path)/1024:.2f} KB")
else:
    print("Image not found!")
