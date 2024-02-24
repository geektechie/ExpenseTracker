const { response } = require("../common/common");
const express = require("express");
const expenseRoutes = require("./expense");
const verifyAuth = require("../middleware/verifyAuth");

const route = express.Router();

/**********************
 * Main API *
 **********************/

route.use("/expense", verifyAuth, expenseRoutes);

route.get("/", async (req, res) => {
  return res.status(200).json(response(true, "Welcome to Expense Manager APIs"));
});

route.all("*", (req, res) => async (req, res) => {
  return res.status(404).json(response(false, "API Not Found"));
});

module.exports = route;
