const express = require('express');
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require("../conig");
const jwt = require("jsonwebtoken");





router.route("/:username").get((req, res) => {
    User.findOne({ username: req.params.username },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            res.json({
                data: result,
                username: req.params.username
            })
        });
})

router.route("/login").post((req, res) => {
    User.findOne({ username: req.body.username }, (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        if (result === null) {
            return res.status(403).json("Username incorrect")
        } if (result.password === req.body.password) {

            res.json("Ok")
        }
        else {
            res.status(403).json("password incorrect")
        }
    })
})

router.route("/register").post((req, res) => {
    console.log("Inside the register");
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        username: req.body.username,
        //password: hashedPassword,
        password: req.body.password,
        email: req.body.email,
    });
    user
        .save()
        .then(() => {
            console.log("user registered");
            res.status(200).json("Ok...")
        }).catch((err) => {
            res.status(403).json({ msg: err });
        });
})

router.route("/update/:username").patch((req, res) => {
    User.findOneAndUpdate(
        { username: req.params.username },
        { $set: { password: req.body.password } },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                msg: "password successfully updated",
                username: req.params.username,
            };
            return res.json(msg);
        }
    )
})

router.route("/delete/:username").delete((req, res) => {
    User.findOneAndDelete({ username: req.params.username }, (err, result) => {
        if (err) return res.status(500).json({ msg: err });
        const msg = {
            msg: "username deleted",
            username: req.params.username
        };
        return res.json(msg);
    })
})

module.exports = router;