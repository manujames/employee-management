const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json({ limit: "2mb" }));

const port = process.env.PORT || 5000;

const employeeRouter = require("./src/routes/employeeRoutes")();

app.use('/employees', employeeRouter);

app.get("/", (req, res) => {
  res.send("Employee Manager API");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
