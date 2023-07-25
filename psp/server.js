const express = require("express");
require("dotenv").config()
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 3006;


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


app.post("/psp", (req, res) => {
  const { body } = req;
  const { amount, currency, reference, operation_id } = body;
  const { email, name } = body.customer;
  const { number, expirationMonth, expirationYear, cvv } = body.card;
  const { ip } = req;
  const { userAgent } = req.headers;

  if (!amount || !currency || !reference || !description || !email || !name || !number || !expirationMonth || !expirationYear || !cvv || !ip || !userAgent) {
    return res.sendStatus(400);
  }

  if (amount < 0 || amount > 999999999) {
    return res.sendStatus(400);
  }

  res.sendStatus(202);


  //wait 10 seconds
  setTimeout(() => {
    //send a payment response
    res.json({
      status: "ok",
      operation_id,
      message: "Payment is successful",
    });
  } , 10000);

});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
