// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create an Express application
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define a route to handle form submissions
app.post('/submit', (req, res) => {
    // Extract form data from the request
    const formData = req.body;

    // Process the form data (e.g., store it in a database, write to a file)
    // Here, we'll write the data to a JSON file named 'data.json'
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Internal Server Error');
        }

        const jsonData = JSON.parse(data);
        jsonData.push(formData);

        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Internal Server Error');
            }
            console.log('Data written to file successfully');
            res.redirect('/success.html'); // Redirect to a success page
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
