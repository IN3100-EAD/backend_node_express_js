const express = require('express');
const app = express();
const port = 3000; // or your desired port

const { itemRoutes } = require('./controller/routes'); // Import the routes

app.use(express.json());
app.use('/api', itemRoutes); // Use the item routes with a prefix '/api'

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});