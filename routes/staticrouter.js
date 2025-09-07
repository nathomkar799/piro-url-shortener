const express = require("express");
const URL = require("../models/url")
const router = express.Router();

// async

router.get('/', async (req,res)=> {
    try {
        const urls = await URL.find({ createdBy: req.user._id });
        const latest = req.query.latest || null; // latest generated URL, if any
        res.render("home", { urls, latest });
      } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
      }
})


router.get('/signup', (req, res) => {
    return res.render("signup");
})

router.get('/login', (req, res) => {
    return res.render("login");
})



module.exports = router;