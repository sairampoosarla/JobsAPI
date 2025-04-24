require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const authRouter = require('./routes/auth.js')
const jobsRouter = require('./routes/jobs.js')
const auth = require('./middleware/authentication')

//adding the DB file here

const connectDB = require('./db/connect.js')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages


// added a comment
// routes
app.use('/api/v1/auth', authRouter)
// adding authentication middleware to all routes of jobs
// by this any calls made via this route would first need to pass the auth middleware
app.use('/api/v1/jobs', auth, jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
