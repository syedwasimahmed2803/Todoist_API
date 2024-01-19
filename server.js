const express = require("express");

const app = express();

app.use(express.json());

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db");
  })
  .catch((err) => {
    console.log("Failed to sync db : " + err.message);
  });

require("./app/routes/project.routes")(app);
app.get("/", (req, res) => {
  res.json({ message: "running" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
