const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');

require('dotenv').config();

const app = express();

const port = parseInt(process.env.PORT) || 8080;

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to mongodb");
}).catch((e) => {
    console.log('Error occured when connecting to mongodb', e);
});

app.use(bodyParser.json());

app.use(cors());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server listening on port: ${port}!`);
});