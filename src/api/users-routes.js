const express = require("express");
const router = express.Router();
var fs = require("fs");

// register 
router.post("/", (req, res) => {
  const user = req.body;
  fs.readFile("./src/data/data.json", function(err, data) {
    var error = false;
    var errMsg = "";
    if (err) {
      error = true;
      throw err;
    }
    else {
      var count = 0;
      
      // if there are existing users, parse data and loop through each user
      // for each existing user, check if its email address is the same as 
      // user's email address
      if (data.length > 0) {
        var parseData = JSON.parse(data);
        parseData.users.forEach(existingUser => {
          if (existingUser.email === user.email) {
            throw new Error("This email address is taken.");
          }
          count++;
        });
      }
      else {
        parseData = {users: []};
      }

      // make newUser from the user we defined above
      const newUser = {
        id: (count + 1).toString(),
        name: user.name,
        surname: user.surname,
        cellPhone: user.cellPhone,
        email: user.email,
        password: user.password,
        role: user.role        
      };

      parseData.users.push(newUser);

      // write to data.json
      // make the parseData array into a string
      fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
        if (err) {
          error = true;
          throw err;
        }
        res.json(newUser);
      });
    }

    if (error) {
      res.status(400).json({ msg: errMsg });
    } 
    else {
      res.json(user);
    }

  });
});

module.exports = router;