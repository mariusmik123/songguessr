const path = require("path");
const express = require("express");

const cors = require("cors");
const app = express();

const corsOptions = require("./config/corsOptions");

app.use(cors(corsOptions));


// built-in middleware to handle urlencoded data
// in other words, form data:
// content-type application/json
app.use(express.json());
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

//generer port
const PORT = process.env.PORT || 3500;

//customs middleware

//builtin middleware

//serve static file
app.use("/", express.static(path.join(__dirname, "public")));

// routes
app.use("/api/albums", require("./routes/api/albums"));
app.get("/localGameSelecter", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "localGameSelecter.html"));
});
app.use("/api/gamecalculater", require("./routes/api/gameCalculater"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
