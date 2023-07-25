import express from 'express';
import { connect, ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Routes
import postRoutes from './routers/post.routes';

// Connect to local MongoDB instance
const MONGO_URI = "mongodb+srv://dm:D0nk3yMobile2023@donkeymobile.uxtzesu.mongodb.net/donkeymobile";

connect(MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
  });

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Load routes
app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});


