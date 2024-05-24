const dotenv = require("dotenv");
dotenv.config({});
const mongoose = require('mongoose');
const app = require("./app");
const PORT = process.env.PORT || 8081;

// Connect to MongoDB
mongoose.connect('mongodb+srv://adsrivastav179:Adarsh1234@cluster0.sdqffov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to MongoDB successfully");
        app.listen(PORT, (error) => {
            if (!error) {
                console.log("Enviroment -->", process.env.NODE_ENV)
                console.log("Server is Successfully Running at Port ", `http//localhost:${PORT}`);
            }
            else {
                console.log("Error occurred, server can't start", error);
            }

        })
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error);
        process.exit(1);
    });

