const express = require('express');
const mongoose = require('mongoose');;
const config = require('./config/config');
const cors = require('cors')

//Declare routes
const todos = require('./routes/api/todos');

const app = express();

//Body-parser Middleware
app.use(express.json());

//cors
app.use(cors())

// Configure Mongo
const db = config.mongoURI;

// Connect to Mongo with Mongoose
mongoose
    .connect(
        db,
        {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));

//use routes
app.use('/api/todos', todos);

// Specify the Port where the backend server can be accessed and start listening on that port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}.`));
