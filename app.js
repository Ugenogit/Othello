const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"))

app.listen(PORT, () => {
    console.log("Server started.");
});

app.get("/", (req, res) => {
    res.render("index");
});





// console.log("Node.js2");
