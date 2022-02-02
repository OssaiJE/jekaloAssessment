const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @desc Create user handler
// @route post /user
router.post("/user", async (req, res) => {
  try {
    var { first_name, last_name, username, date_of_birth } = req.body;
    let errors = [];
    // Check required fields
    if (!first_name || !username || !date_of_birth) {
      errors.push({ msg: "Please fill in required fields." });
    }

    if (errors.length > 0) {
      res.json({
        errors,
        first_name,
        last_name,
        username,
        date_of_birth,
      });
    } else {
      // Validation passed
      let user = await User.findOne({ username });

      if (user) {
        // User exists
        errors.push({ msg: "Username is already taken." });
        res.json({
          errors,
          first_name,
          last_name,
          username,
          date_of_birth,
        });
      } else {
          console.log(last_name);
        if (typeof last_name === "undefined") {
          var name_prefix = first_name.charAt(0).toUpperCase();
        }else {
        var name_prefix =
          first_name.charAt(0).toUpperCase() +
          last_name.charAt(0).toUpperCase();
        }
        const newUser = new User({
          first_name,
          last_name,
          username,
          date_of_birth,
          name_prefix,
        });

        await newUser.save();
        res.json({
          name_prefix,
          first_name,
          last_name,
          username,
          date_of_birth,
        });
      }
    }
  } catch (err) {
      console.error(err);
    res.status(500).send("Server Error");
  }
});

// @desc show all users
// @route GET request to /users
router.get("/users", async (req, res) => {
  try {
      let users = await User.find().lean();
    // await User.find({}, function (err, users) {
      res.json(users);
    // }).lean();
  } catch (err) {
      console.error(err);
    res.status(500).send("Server Error");
  }
});

// @desc Delete User
// @route DELETE /:username
router.delete("/:username", async (req, res) => {
	try {
        var { username } = req.params;
		await User.findOneAndDelete({ username: username });
		res.json({message: "You deleted the user successfully."});
	} catch (err) {
		console.error(err);
		res.status(500).send("Server Error");
	}
});


module.exports = router;
