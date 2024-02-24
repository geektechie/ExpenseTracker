/* Amplify Params - DO NOT EDIT
  AUTH_EXPENSETRACKER2D30422F_USERPOOLID
  ENV
  REGION
  STORAGE_EXPENSE_ARN
  STORAGE_EXPENSE_NAME
  STORAGE_EXPENSE_STREAMARN
  Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const gracefulExit = require('express-graceful-exit');
const morgan = require('morgan');
const helmet = require('helmet');

const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const errorMiddleware = require("./middleware/errorMiddleware");

// declare a new express app
const app = express();
const server = app.listen(3000, function () {
  console.log("App started");
});

gracefulExit.init(server);

// Integrate Middleware
app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  awsServerlessExpressMiddleware.eventContext(),
  gracefulExit.middleware(app),
  cors({ origin: "*", allowedHeaders: "*" }),
  morgan('tiny'),
  helmet()
);

app.use("/", routes);
app.use(errorMiddleware);
(() => {
  const SIGNALS = [
    'SIGTERM',
    'SIGINT',
    'SIGUSR1',
    'SIGUSR2',
    'exit',
    'uncaughtException'
  ];
  const handleExit = () => gracefulExit.gracefulExitHandler(app, server, {
    performLastRequest: true,
    errorDuringExit: true,
    exitProcess: true
  });
  SIGNALS.forEach(signal => process.on(signal, handleExit));
})();

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;


