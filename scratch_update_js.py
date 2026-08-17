import os

old_func = """function submitInterest() {
    const phone = document.getElementById('customerPhone').value;
    const productName = document.getElementById('modalTitle').innerText;
    
    if (!phone || phone.trim() === '') {
        alert("Please enter a valid contact number.");
        return;
    }
    
    // Simulate sending a notification to the company
    alert(`Request Sent! The NFG Sales Team has been notified that you are interested in the ${productName}. They will contact you at ${phone} with the latest pricing.`);
    closeProductModal();
}"""

new_func = """function submitInterest() {
    const nameInput = document.getElementById('customerName');
    const name = nameInput ? nameInput.value : '';
    const phone = document.getElementById('customerPhone').value;
    const productName = document.getElementById('modalTitle').innerText;
    
    if (nameInput && (!name || name.trim() === '')) {
        alert("Please enter your name.");
        return;
    }
    if (!phone || phone.trim() === '') {
        alert("Please enter a valid contact number.");
        return;
    }
    
    const submitBtn = document.querySelector('#contactFormSection .btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = 'SENDING...';
    submitBtn.disabled = true;

    // Format current date and time
    const now = new Date();
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
    const dateStr = now.toLocaleString('en-US', options);
    
    fetch("https://formsubmit.co/ajax/kaifashraf07@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `New Product Enquiry - ${productName}`,
            Customer: name,
            Phone: phone,
            Product: productName,
            Submitted: dateStr,
            _template: "table"
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(`Request Sent! The NFG Sales Team has been notified that you are interested in the ${productName}. They will contact you shortly.`);
        closeProductModal();
        
        // Reset form
        if(nameInput) nameInput.value = '';
        document.getElementById('customerPhone').value = '';
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    })
    .catch(error => {
        alert("There was an error sending your request. Please try again or call us directly.");
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
}"""

c = open('public/script.js', 'r', encoding='utf-8').read()
c = c.replace(old_func, new_func)
open('public/script.js', 'w', encoding='utf-8').write(c)
print("Updated script.js")
