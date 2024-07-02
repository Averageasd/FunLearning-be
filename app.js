require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cardRoute = require('./route/cardRoute');
const deckRoute = require('./route/deckRoute');
const userRoute = require('./route/userRoute');
const PORT = process.env.PORT || 3000;

async function main() {
    const uri = process.env.MONGODB_URL;
    await mongoose.connect(uri);
}

main().catch((err) => console.log(err));

app.use('/card', cardRoute);
app.use('/deck', deckRoute);
// app.use('/user', userRoute);

function errorHandler(err, req, res, next) {
    console.log('error caught here ', err.message);
    return res.status(err.statusCode).json({status: err.statusCode, message: err.message});
}

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
