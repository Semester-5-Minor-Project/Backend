const express = require("express");
const path = require("path");
const morgan = require("morgan")
const mongoose = require("mongoose");

require('dotenv').config()

// routers
const indexRouter = require("./routes/index");

const app = express();

// Database
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log("Connected to the database."))
.catch((err) => console.log("Database connection failed: ", err));

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// static
app.use(express.static(path.join(__dirname, "public")));

const PORT = 5000 | process.env.PORT;

app.listen(PORT, () => {
    console.log("Listening on PORT -> ", PORT);
})