require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticrouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 8001;
const mongoURI = process.env.ATLAS_URL;

connectToMongoDB(mongoURI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

// Redirect handler
app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } }
    );

    if (!entry) return res.status(404).send("Short URL not found");

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server started at PORT: ${PORT}`);
});
