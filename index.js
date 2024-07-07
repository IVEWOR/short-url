const express = require("express");
const path = require("path");

const connectDB = require("./connect.db");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const URL = require("./models/url");

const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Connecting to DB
connectDB("mongodb://127.0.0.1:27017/short-url").then(
  console.log("DB connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRouter);
app.use("/url", urlRoute);

app.get("/url/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ error: "short url not found" });
  }
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log("Server is running at ", PORT));
