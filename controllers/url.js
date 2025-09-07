const shortid = require("shortid");
const URL = require('../models/url')

async function handleGenerateNewShortURL ( req,res) {
    const { url } = req.body;
  if (!url || url.trim() === "") return res.redirect("/");

  try {
    const shortID = shortid.generate();

    await URL.create({
      shortId: shortID,
      redirectURL: url,
      visitedHistory: [],
      createdBy: req.user._id,
    });

    // redirect with latest URL as query
    res.redirect("/?latest=" + shortID);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

async function handleGetAnalytics( req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })

    return res.json({totalClicks:result.visitHistory.length, analytics:result.visitHistory})
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}