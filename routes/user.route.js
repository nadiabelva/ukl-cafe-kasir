const express = require(`express`);
const app = express();
app.use(express.json());
const userController = require(`../controllers/user.controller`);
const auth = require(`../auth`);

app.get("/", auth, userController.getAllUser);
app.post("/add", auth, userController.addUser);
app.post("/login", userController.login);
app.post("/find", auth, userController.findUser);
app.put("/:id_user", auth, userController.updateUser);
app.delete("/:id", auth, userController.deleteUser);
module.exports = app;
