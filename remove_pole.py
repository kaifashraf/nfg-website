from PIL import Image

def remove_pole():
    try:
        # Open the image
        img = Image.open('safety-helmet-pro-main.png').convert("RGBA")
        width, height = img.size
        pixels = img.load()
        
        # The pole is exactly in the bottom center.
        # Let's erase a rectangle in the bottom center to remove the pole.
        center_x = width // 2
        # The pole seems to be about 12% of the total width
        pole_width = int(width * 0.14)
        start_x = center_x - (pole_width // 2)
        end_x = center_x + (pole_width // 2)
        
        # The pole starts from inside the helmet, roughly 55% down the image
        start_y = int(height * 0.52)
        
        for y in range(start_y, height):
            for x in range(start_x, end_x):
                # Set pixel to completely transparent
                pixels[x, y] = (0, 0, 0, 0)
                
        # Save the result
        img.save('safety-helmet-pro-main.png')
        print("Successfully removed the pole.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    remove_pole()
