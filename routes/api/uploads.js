const express = require("express");
const router = express.Router();
const config = require("config");
const cloudinary = require("cloudinary");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

cloudinary.config({
    cloud_name: config.get("cloud_name"),
    api_key: config.get("api_key"),
    api_secret: config.get("api_secret"),
});

// @route    POST api/uploads/image-upload
// @desc     Upload multiple images
// @access   Private
router.post("/image-upload", (req, res) => {
    const values = Object.values(req.files);
    const promises = values.map(image =>
        cloudinary.uploader.upload(image.path),
    );

    Promise.all(promises).then(results => res.json(results));
});

// @route    POST api/uploads/image-upload-single
// @desc     Upload a single image
// @access   Private
router.post("/image-upload-single", (req, res) => {
    const path = Object.values(Object.values(req.files)[0])[0].path;
    cloudinary.uploader.upload(path).then(image => res.json([image]));
});

module.exports = router;
