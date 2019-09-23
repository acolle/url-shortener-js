const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dbName = "url-shortener";
const mongoURI = "mongodb://localhost:27017/" + dbName;
const connectOptions = {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Connect to MondoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, connectOptions,  (err, db) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Connected to the ' + dbName + ' database');
  }
});

// Create an instance of Express
const app = express();

// Add middleware
app.use(cors()); // allow Cross-Origin Resource Sharing
app.use(express.json());

require("./models/UrlShorten");
require("./routes/urlshorten")(app);

// Define port and launch server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
