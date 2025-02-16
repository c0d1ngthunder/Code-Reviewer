const airoutes = require("./routes/ai.routes")


const express = require("express");
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.use("/ai",airoutes)

module.exports = app;
