import glob

search_btn = '''                <button class="nav-search-btn" onclick="openSearchModal()" aria-label="Search">
                    <svg viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
'''

files = glob.glob('*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if 'class="nav-search-btn"' not in content:
        content = content.replace('<div class="nav-right-custom">', '<div class="nav-right-custom">\n' + search_btn)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Added search button to {f}")
