const express = require("express");
require("dotenv").config()
const app = express();
const GenericRouter = require("./routes/genericCRUD");
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
const { UUIDV4 } = require("sequelize");
app.use(require("./routes/security")(merchantService, contactService));

app.use("/users", new GenericRouter(new GenericController(userService)));
app.use("/merchants", authentificationGuard({JWTAuth: true}), new GenericRouter(new GenericController(merchantService)));
app.use("/transactions", authentificationGuard({JWTAuth: true}), new GenericRouter(new GenericController(transactionService)));
app.use("/operations", new GenericRouter(new GenericController(operationService)));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/health", authentificationGuard({ BasicAuth: true}), (req, res) => {
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
  const merchant = await merchantService.findAll({isvalid: false});
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
      const response = await merchantService.update({merchant_id: req.body.merchant_id}, {isvalid: true});
      console.log("response", response);
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


//TODO this route corresponds to operation
app.post('/operations', (req, res) => {

  console.log(req.body);

  fetch(process.env.PSP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send payment response');
      }
      console.log('Payment response sent successfully');
    }
    )
    .catch(error => {
      console.error('Error sending payment response:', error.message);
    });

    //TODO: go find in db the confirmation url and send it back to the client
    const CONFIRMATION_URL = 'http://localhost:3000/psp/confirmation';
    res.redirect(303, CONFIRMATION_URL);
});



app.post('/psp/webhook', (req, res) => {
  //TODO: update the operation status in db
  //TODO: update the transaction status in db
  //TODO: go find in db the transaction id and send it back to the client
  //TODO: go find in db the merchant webhook url and send it back to the client
  const MERCHANT_URL = 'http://localhost:3000/psp/merchant/webhook';
  fetch(MERCHANT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send payment response');
      }
      console.log('Payment response sent successfully');
    }
    )
    .catch(error => {
      console.error('Error sending payment response:', error.message);
    });
  console.log(req.body);
  res.sendStatus(200);
});


app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;