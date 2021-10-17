const express = require("express");
const path = require("path");
const morgan = require("morgan")
const mongoose = require("mongoose");

require('dotenv').config()

// routers
const indexRouter = require("./routes/index");
const superRouter = require("./routes/superadmin");
const dseRouter = require("./routes/dseut");
const schoolRouter = require("./routes/school");
const principalRouter = require("./routes/principal");

const app = express();

// Database
mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster-minor-project.bamyr.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`, {
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

// routes
app.use("/", indexRouter);
app.use("/sadmin", superRouter);
app.use("/dse", dseRouter);
app.use("/school", schoolRouter);
app.use("/principal", principalRouter);

const PORT = 5000 | process.env.PORT;

app.listen(PORT, () => {
    console.log("Listening on PORT -> ", PORT);
})