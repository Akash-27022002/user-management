const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>HAa </h1>")
})
app.use("/api", router);

module.exports = app;