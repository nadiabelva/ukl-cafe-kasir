const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controllers/meja.controller`);
const auth = require(`../auth`);

app.get("/", auth, userController.getAllMeja);
app.post("/add", auth, userController.addMeja);
app.post("/find", auth, userController.findMeja);
app.put("/:id", auth, userController.updateMeja);
app.delete("/:id", auth, userController.deleteMeja);
module.exports = app;
