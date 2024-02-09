function validateForm() {
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    console.log(messageInput);
    // Validate name


    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(nameInput.value.trim())) {
        document.getElementById('nameError').textContent = 'Name must contain only letters';
        return;
    }



    // Validate subject
    const subjectRegx = /^[A-Za-z]+$/;
    if (!subjectRegx.test(subjectInput.value.trim())) {
        document.getElementById('subjectError').textContent = 'Subject is required and must contain only letters';
        return;
    }
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        document.getElementById('emailError').textContent = 'Invalid email address';
        return;
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        document.getElementById('messageError').textContent = 'Message is required';
        return;
    }

    // If all validations pass, show success message (you can submit the form to a server here)
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
    setTimeout(function () {

        location.reload();
    }, 2000);
}