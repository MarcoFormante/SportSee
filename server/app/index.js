const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes");

const app = express();
const port = 8000;

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use(router);
app.use('/images', express.static('images'));

app.listen(port, () => console.log(`Magic happens on port ${port}`));
