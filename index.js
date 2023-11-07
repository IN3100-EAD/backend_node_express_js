import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
import router from './router.js';
app.use('/api', router);

// Connect to MongoDB
mongoose.connect('mongodb+srv://wijebahuwmpwdgb20:dgb123@inventory.nk3kupt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
