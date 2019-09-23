const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl='https://localhost/error';

module.exports = app => {

  // Get a shortened url and redirect to the original one
  app.get("/api/item/:code", async (req, res) => {
    const urlCode = req.params.code;
    const item = await UrlShorten.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  });

  // Get original url and store a shortened one
  app.post("/api/item", async (req, res) => {

  const { originalUrl, shortBaseUrl } = req.body;

    // Check if Base URL has the correct format
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res.status(401).json("Invalid Base Url");
    }

    // Generate a random ID for the short URL to use
    const urlCode = shortid.generate();

    // Check if the original URL has the correct format and process it if it does
    if (validUrl.isUri(originalUrl)) {
      try {
        // Check if the original URL has already been requested
        const item = await UrlShorten.findOne({ originalUrl: originalUrl });
        if (item) {
          res.status(200).json(item);
        } else {
          shortUrl = shortBaseUrl + urlCode;
          const item = new UrlShorten({
            originalUrl,
            shortUrl,
            urlCode
          });
          await item.save();
          res.status(200).json(item);
        }
      } catch (err) {
        res.status(401).json("Invalid User Id");
      }
    } else {
      return res.status(401).json("Invalid Original Url");
    }
  });
};
