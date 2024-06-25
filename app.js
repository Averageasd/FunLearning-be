require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const cardRoute = require('./route/cardRoute');
const deckRoute = require('./route/deckRoute');
const PORT = process.env.PORT || 3000;

async function main() {
    const uri = process.env.MONGODB_URL;
    await mongoose.connect(uri);
}

main().catch((err) => console.log(err));

app.use('/card', cardRoute);
app.use('/deck', deckRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
