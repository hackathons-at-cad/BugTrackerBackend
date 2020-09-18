const express = require("express");
const user_router = express.Router();
const User = require("../models/users_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateRegisterInput = require("../validations/user_register_validator");
const validateLoginInput = require("../validations/user_login_validation");

user_router.post("/register", (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.status(400).json({ message: "email already exists" });
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser
						.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	});
});

user_router.post("/login", (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email: email }).then(user => {
		if (!user) {
			return res.status(404).json({ emailNotFound: "email not found" });
		}

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				const payload = {
					id: user.id,
					name: user.name
				};

				jwt.sign(
					payload,
					"secret",
					{
						expiresIn: 31556926
					},
					(err, token) => {
						res.json({
							success: true,
							token: `Bearer ${token}`
						});
					}
				);
			} else {
				return res.status(400).json({
					passwordIncorrect: "password incorrect"
				});
			}
		});
	});
});

user_router.route('/').get(function(req, res) {
    User.find(function(err, users) {
         if (err) {
             console.log(err);
         } else {
             res.json(users);
         }
     });
 });
 

user_router.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user_name) {
        res.json(user_name);
    });
});



module.exports = user_router;
