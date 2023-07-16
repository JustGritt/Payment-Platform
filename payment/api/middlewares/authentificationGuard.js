const jwt = require("jsonwebtoken");

exports.authentificationGuard = (options) => async function (req, res, next) {
  if (options.JWTAuth) {
    const token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (err) {
      res.clearCookie("token");
      return res.sendStatus(401); // Return early after sending the response
    }
  }

  if (options.BasicAuth) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.sendStatus(401); // Return early after sending the response
      }
      const encodedCredentials = authHeader.split(" ")[1];
      const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("ascii");
      const [clientId, clientToken] = decodedCredentials.split(":");

      const merchantService = require("../services/merchant");
      const [merchant] = await merchantService.findAll({ client_token: clientId, client_secret: clientToken });

      if (!merchant) {
        return res.sendStatus(401); // Return early after sending the response
      }
      req.user = merchant.dataValues;
      return next();
    } catch (err) {
      console.log(err);
      return res.sendStatus(401); // Return early after sending the response
    }
  }

  return res.sendStatus(401); // If neither JWT nor BasicAuth options are specified, return 401
};



