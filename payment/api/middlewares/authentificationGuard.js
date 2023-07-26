const jwt = require("jsonwebtoken");

exports.authentificationGuard = (options) => async function (req, res, next) {
  if (options.JWT) {
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
      const [username, password] = decodedCredentials.split(":");
      if (username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD) {
        return next();
      } else {
        return res.sendStatus(401); // Return early after sending the response
      }
    } catch (err) {
      return res.sendStatus(401); // Return early after sending the response
    }
  }

  return res.sendStatus(401); // If neither JWT nor BasicAuth options are specified, return 401
};
