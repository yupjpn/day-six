const express = require("express");

const app = express();

var properties = new Array();

//Body Parser Middlware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// this is our server application
app.get("/", (req, res) => {
    console.log(req.headers);
    res.send("<p>Hello</p>");
});

app.get("/properties", (req, res) => {
    // var properties = new Array();
    // properties.push({
    //     id: 1,
    //     name: "One",
    //     location: "Lisbon"
    // });
    res.json(properties);
});

app.post("/properties", (req, res) => {
    const property = req.body;
    properties.push(property);
    res.json(property);
});

app.listen(3000, (err) => {
    if (err) {
        console.log("Sheeeesh");
        return;
    }

    console.log("Sever listening port 3000");
});

console.log("This app runs! Woohoo!");

