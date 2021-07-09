const express = require('express');
const cors = require('cors');
// importing routes
const notebookRoutes = require('./API/notebook/routes');
const noteRoutes = require('./API/note/routes');
//
const db = require('./db/models/index');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// CRUD routes
app.use('/notes', noteRoutes);
app.use('/notebooks', notebookRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal Server Error' });
});

// Path Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'Path not found.' });
});

//  running the server and connecting the database
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log('Database is connected');
    app.listen(8000, () => console.log('Server is running on port 8000'));
  } catch (error) {
    console.log(error);
  }
};
run();
