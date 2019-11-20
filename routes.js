const express = require("express");
const Router = express.Router();
const UserMiddleware = require("./middlewares/userMiddleware");

Router.post("/create", async (req, res) => {
  const response = await UserMiddleware.createUser(req.body);
  res.status(201).send(response);
});

Router.get("/list", async (req, res) => {
  const response = await UserMiddleware.listUsers(req.body);
  res.status(200).send(response);
});

Router.put("/update/:id", async (req, res) => {
  const response = await UserMiddleware.updateUsers(req.body, req.params);
  res.status(201).send(response)
});

Router.delete("/delete/:id", async (req, res) => {
  const response = await UserMiddleware.deleteUsers(req.params.id);
  res.status(201).send(response)
});

module.exports = Router;