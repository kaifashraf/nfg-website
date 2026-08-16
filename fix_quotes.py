import glob

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if r"toggle(\'active\')" in content or "toggle(\\'active\\')" in content:
        content = content.replace(r"toggle(\'active\')", "toggle('active')")
        content = content.replace("toggle(\\'active\\')", "toggle('active')")
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Fixed {f}")
