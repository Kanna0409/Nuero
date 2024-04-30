// JavaScript code to handle form submission
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = new FormData(this);
    var userData = {};
    formData.forEach(function(value, key) {
        userData[key] = value;
    });

    // Log form data
    console.log(userData);

    // Send form data to server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Log server response
        alert(data); // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving user data.');
    });

    // Clear the form after submission
    this.reset();

    // Clear the selected option in the "Sex" dropdown
    document.getElementById('sex').value = '';
});
