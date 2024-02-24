const { response, getTimeStamp } = require("../common/common");
const express = require("express");
const db = require("../config/db");
const { ScanCommand, UpdateItemCommand, PutItemCommand, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const validate = require("../middleware/validation");
const { body, param } = require("express-validator");
const tables = require("../models/tables");
const { getDataById } = require("../common/databasesFunction");
const { v4: uuid } = require('uuid');

const route = express.Router();
const tableName = tables.expense;

/**********************
 * Expense API *
 **********************/

route.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const params = new ScanCommand({
      TableName: tableName,
      FilterExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": {
          S: userId.toString(),
        },
      },
    });
    const data = await db.send(params);
    const parsedData = data?.Items.map(item => ({
      id: item.id.S,
      category: item.category.S,
      amount: Number(item.amount.N),
      expenseDate: item.expenseDate.S,
      createdAt: item.createdAt.S,
      updatedAt: item.updatedAt.S,
    }));
    return res
      .status(200)
      .json(
        response(true, parsedData || [], "Expenses Fetched Sucessfully")
      );
  } catch (err) {
    console.log("Error in Get Expense List:", err);
    return res
      .status(500)
      .json(response(false, null, `Internal Server Error ${err}`));
  }
});

route.post(
  "/",
  body("category", "invalid category")
    .exists()
    .withMessage("category is required")
    .isString(),
  body("amount", "invalid amount")
    .exists()
    .withMessage("amount is required")
    .isNumeric(),
  body("expenseDate", "invalid expenseDate")
    .exists()
    .withMessage("expenseDate is required")
    .isString(),
  validate,
  async (req, res) => {
    try {
      const {
        category,
        amount,
        expenseDate,
      } = req.body;
      const userId = req.user.id;

      const data = {
        id: uuid(),
        userId,
        category,
        amount,
        expenseDate,
        createdAt: getTimeStamp(),
        updatedAt: getTimeStamp(),
      };

      const putParams = new PutItemCommand({
        TableName: tableName,
        Item: {
          id: { S: data.id },
          userId: { S: data.userId },
          category: { S: data.category },
          amount: { N: data.amount.toString() },
          expenseDate: { S: data.expenseDate },
          createdAt: { S: data.createdAt },
          updatedAt: { S: data.updatedAt },
        },
      });

      await db.send(putParams);
      return res
        .status(200)
        .json(response(true, data, "Expense Post Sucessfully"));
    } catch (err) {
      console.log("Error in Post Expense:", err);
      return res
        .status(500)
        .json(response(false, null, `Internal Server Error ${err}`));
    }
  }
);

route.put(
  "/:id",
  param("id", "invaild id").exists().withMessage("id is required").isString(),
  body("category", "invalid category")
    .exists()
    .withMessage("category is required")
    .isString(),
  body("amount", "invalid amount")
    .exists()
    .withMessage("amount is required")
    .isNumeric(),
  body("expenseDate", "invalid expenseDate")
    .exists()
    .withMessage("expenseDate is required")
    .isString(),
  validate,
  async (req, res) => {
    try {
      const {
        category,
        amount,
        expenseDate,
      } = req.body;
      const { id } = req.params;
      const userId = req.user.id;
      const currentData = await getDataById(tableName, id);

      if (!currentData || currentData.userId.S !== userId) {
        return res
          .status(404)
          .json(response(false, null, "Expense Not Found"));
      }

      const data = {
        id,
        userId,
        category,
        amount,
        expenseDate,
        createdAt: currentData.createdAt.S,
        updatedAt: getTimeStamp(),
      };
      const putParams = new UpdateItemCommand({
        TableName: tableName,
        Key: {
          id: { S: id },
        },
        UpdateExpression: `set 
                              category = :category,
                              amount = :amount,
                              expenseDate = :expenseDate,
                              updatedAt = :updatedAt
                              `,
        ExpressionAttributeValues: {
          ":category": { S: data.category },
          ":amount": { N: data.amount.toString() },
          ":expenseDate": { S: data.expenseDate },
          ":updatedAt": { S: data.updatedAt },
        },
      });
      await db.send(putParams);
      return res
        .status(200)
        .json(response(true, data, "Expense Updated Sucessfully"));
    } catch (err) {
      console.log("Error in Put Expense:", err);
      return res
        .status(500)
        .json(response(false, null, `Internal Server Error ${err}`));
    }
  }
);

route.delete(
  "/:id",
  param("id", "invaild id").exists().withMessage("id is required").isString(),
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const currentData = await getDataById(tableName, id);

      if (!currentData || currentData.userId.S !== userId) {
        return res
          .status(404)
          .json(response(false, null, "Expense Not Found"));
      }

      const deleteParams = new DeleteItemCommand({
        TableName: tableName,
        Key: {
          id: { S: id },
        },
      });

      await db.send(deleteParams);
      return res
        .status(200)
        .json(response(true, null, "Expense Deleted Sucessfully"));
    } catch (err) {
      console.log("Error in Delete Expense:", err);
      return res
        .status(500)
        .json(response(false, null, `Internal Server Error ${err}`));
    }
  }
);


module.exports = route;