const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const router = require("./routes");

const app = express();


app.use(cookieParser());
app.use(express.json());

app.set("trust proxy", 1);
app.use(cors({
    origin: [
        "http://localhost:5175",
        "http://localhost:5173",
    ],
    methods: ["GET", "DELETE", "PATCH", "POST", "PUT"],
    credentials: true,
    withCredentials: true,
}));

app.get("/", (req, res) => {
    res.send("<h1>HAa </h1>")
})
app.use("/api", router);

module.exports = app;