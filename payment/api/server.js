const express = require("express");
require("dotenv").config()
const app = express();
const GenericRouter = require("./routes/genericCRUD");
const TransactionRouter = require("./routes/transaction");
const TransactionController = require("./controllers/transaction");
const WebhookController = require("./webhooks/psp");
const GenericController = require("./controllers/genericCRUD");
const userService = require("./services/user");
const merchantService = require("./services/merchant");
const transactionService = require("./services/transaction");
const operationService = require("./services/operation");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
//const rateLimiter = require("./middlewares/rateLimiter");
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

const contactService = require("./services/contact");
app.use(require("./routes/security")(merchantService, contactService));

app.use("/users", new GenericRouter(new GenericController(userService)));
const OperationRouter = require("./routes/operation");
const OperationController = require("./controllers/operation");
app.use("/merchants", authentificationGuard({JWTAuth: true}), new GenericRouter(new GenericController(merchantService)));
app.use("/operations", authentificationGuard({ JWTAuth: true, BasicAuth: true}), new OperationRouter(new OperationController(operationService)));
app.use("/transactions",authentificationGuard({ JWTAuth: true, BasicAuth: true}), new TransactionRouter(new TransactionController(transactionService)));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/health", authentificationGuard({ BasicAuth: true }), (req, res) => {
  res.sendStatus(200);
});

app.post('/convert', require('./controllers/currencyConverter').currencyConverterController);

app.get('/regenerateToken', authentificationGuard({ JWTAuth: true}), (req, res) => {

  const merchantService = require("./services/merchant");
  const merchant = merchantService.findById(req.user.id);
  const { v4: uuidv4 } = require('uuid');

  merchant.client_secret = uuidv4();
  merchant.client_token = uuidv4();

  merchantService.update({merchant_id: req.user.id}, merchant);
  console.log(merchant);

  res.send(merchant);
});

app.get('/pendingMerchant', authentificationGuard({ JWTAuth: true}), async (req, res) => {
  const userService = require("./services/user");
  const user = await userService.findById( req.user.id);
  if(!user) {
    res.sendStatus(401);
  }
  const merchant = await merchantService.findAll({is_active: false});
  console.log(merchant)

  res.json(merchant);


})

app.post('/validateMerchant', authentificationGuard({ JWTAuth: true}),async (req, res) => {
  const userService = require("./services/user");
  const user = await userService.findById( req.user.id);

  if(user) {
    const merchant = await merchantService.findById(req.body.merchant_id);
    console.log(merchant)
    if(merchant) {
      const response = await merchantService.update({merchant_id: req.body.merchant_id}, {is_active: true});
      console.log("response", response.bod);
      return res.sendStatus(200);
    }
    else {
      return res.sendStatus(404);
    }
  }
  else {
    return res.sendStatus(404);
  }
});

app.use('/webhook', new WebhookController());


app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;