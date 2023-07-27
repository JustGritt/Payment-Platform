const express = require("express");
require("dotenv").config()
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 3002;


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
  console.log(req.body);
  const { body } = req;
  const { amount, operation_id } = body;

  if (amount < 0 || amount > 999999999) {
    return res.sendStatus(400);
  }
  
  res.sendStatus(202)
  // res.sendStatus(500)

  // Wait for 10 seconds
  setTimeout(() => {
    // Send a payment response
    fetch(process.env.STRAPOUZ_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operation_id,
        status: "approved",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send payment response");
        }
        console.log("Payment response sent successfully");
      })
      .catch((error) => {
        console.error("Error sending payment response:", error.message);
      });
  }, 10000);
});


app.get("/" , (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
