const express = require('express');
const ExcelJS = require('exceljs');

const app = express();
const port = 3000;

// Parse JSON and URL-encoded body from request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handler for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ht.html');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, age, sex, hobbies } = req.body;

  // Log the form data
  console.log('Received form data:', { name, age, sex, hobbies });

  // Create a new workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('User Data');
  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Age', key: 'age', width: 10 },
    { header: 'Sex', key: 'sex', width: 10 },
    { header: 'Hobbies', key: 'hobbies', width: 30 }
  ];
  worksheet.addRow({ name, age, sex, hobbies });

  // Save workbook to file
  workbook.xlsx.writeFile('dataset.xlsx')
    .then(() => {
      console.log('User data saved to dataset.xlsx');
      res.send('User data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving file:', error);
      res.status(500).send('An error occurred while saving user data.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
