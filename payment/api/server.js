const express = require("express");
require("dotenv").config()
const app = express();
const GenericRouter = require("./routes/genericCRUD");
const GenericController = require("./controllers/genericCRUD");
const userService = require("./services/user");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const rateLimiter = require("./middlewares/rateLimiter");
const cors = require("cors");
const port = process.env.PORT || 3000;
const { authentificationGuard } = require("./middlewares/authentificationGuard");


app.use(cors());
app.use(function (req, res, next) {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!req.is("application/json")) {
      return res.sendStatus(400);
    }
  }
  next();
});
app.use(express.json());
app.use(cookieParser());



// TODO: Add env variable to enable/disable rate limiter
//app.use(rateLimiter.rateLimiter);


app.use(require("./routes/security")(userService));

app.use("/users", new GenericRouter(new GenericController(userService)));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/health", authentificationGuard, (req, res) => {
  res.sendStatus(200);
});

app.post('/convert', require('./controllers/currencyConverter').currencyConverterController);


app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;
