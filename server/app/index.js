const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes");

const app = express();
const port = 8000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use(router);
app.use('/images', express.static('images'));

app.listen(port, () => console.log(`Magic happens on port ${port}`));
