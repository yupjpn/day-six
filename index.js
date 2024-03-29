const express = require("express");
// const path = require("path");
// const logger = require("./src/utilities/middleware/logger");

//Init express:
const app = express();

//Middleware:
// app.use(logger);

//Body Parser Middlware:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var users = new Array();

// register
app.post("/api/users", (req, res) => {
    const user = req.body;
    const bodyFirstName = user.firstname;
    const bodyLastname = user.lastname;
    const bodyEmail = user.email;
    const bodyPassword = user.password;

    let foundUser = null;
    users.forEach(existingUser => {
        if (user.email === existingUser.email) {
            foundUser = user;
        }
    });

    if (foundUser != null) {
        return res.status(400).json({message: "Email has been taken"});
    }

    var newUser = {
        id: users.length + 1,
        firstname: bodyFirstName,
        lastname: bodyLastname,
        email: bodyEmail,
        password: bodyPassword
    };

    users.push(newUser);
    res.json(newUser);
});

const PropertyRouter = express.Router();
PropertyRouter.post("/api/properties", (req, res) => {
    res.send("POST Properties api");
});
app.use("/parent", PropertyRouter);

app.post("/api/auth", (req, res) => {
    res.send("POST Auth api");
});

//Routes:
// app.use("/api/users", require("./src/api/users-routes"));
// app.use("/api/auth", require("./src/api/auth-routes"));

//Port:
const PORT = process.env.PORT || 5000;

//Listen:
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

