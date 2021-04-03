const express = require('express');
const router = express.Router();
const middleware = require("../middleware.js")
const Profile = require("../models/profile.model")
const multer = require("multer")
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.username + ".jpg");
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6,
    },
    fileFilter: fileFilter
});

router
    .route("/add/image")
    .patch(middleware.checkToken, upload.single("img"), async (req, res) => {
        await Profile.findOneAndUpdate(
            { username: req.decoded.username },
            {
                $set: {
                    img: req.file.path,
                }
            },
            { new: true },
            (err, profile) => {
                if (err) return res.status(500).send(err);
                const response = {
                    message: "Image added successfully updated",
                    data: profile
                };
                return res.status(200).send(response);
            }
        )

    })
router.route("/add").post(middleware.checkToken, (req, res) => {
    const profile = Profile({
        username: req.decoded.username,
        name: req.body.name,
        profession: req.body.profession,
        DOB: req.body.DOB,
        titleline: req.body.titleline,
        about: req.body.about
    });
    profile.save()
        .then(() => {
            return res.json({ msg: "Profile saved successfully" })
        }).catch(err => {
            return res.status(400).json({ err: err })
        })
})
module.exports = router;