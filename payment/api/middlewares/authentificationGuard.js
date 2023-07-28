const jwt = require("jsonwebtoken");

exports.authentificationGuard = (options) => async function (req, res, next) {
  const jwtAuthEnabled = options.JWTAuth;
  const basicAuthEnabled = options.BasicAuth;

  if (jwtAuthEnabled && basicAuthEnabled) {
    // Both JWT and Basic Authentication are enabled
    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      // Extract the JWT token from the 'Authorization' header
      const token = authorizationHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
      } catch (err) {
        // JWT verification failed, proceed with Basic Authentication check
        return checkBasicAuthentication(req, res, next);
      }
    } else {
      // No JWT token found, proceed with Basic Authentication check
      return checkBasicAuthentication(req, res, next);
    }
  } else if (jwtAuthEnabled) {
    // Only JWT Authentication is enabled
    const authorizationHeader = req.headers['authorization'] || req.headers['Authorization'];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      // Extract the JWT token from the 'Authorization' header
      const token = authorizationHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
      } catch (err) {
        res.clearCookie("token");
        return res.sendStatus(401); // Unauthorized: JWT verification failed
      }
    } else {
      // JWT token not found, return 401
      return res.sendStatus(401);
    }
  } else if (basicAuthEnabled) {
    // Only Basic Authentication is enabled
    return checkBasicAuthentication(req, res, next);
  } else {
    // Neither JWT nor BasicAuth options are specified, return 401
    return res.sendStatus(401);
  }
};

const { v4: uuidv4, validate: isUUID } = require('uuid');

async function checkBasicAuthentication(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.sendStatus(401); // Return early after sending the response
    }
    const encodedCredentials = authHeader.split(" ")[1];
    const decodedCredentials = Buffer.from(encodedCredentials, "base64").toString("ascii");
    const [clientId, clientToken] = decodedCredentials.split(":");

    // Ensure that clientId and clientToken are valid UUIDs
    // if (!isUUID(clientId) || !isUUID(clientToken)) {
    //   return res.sendStatus(401); // Return early after sending the response
    // }

    const merchantService = require("../services/merchant");
    const [merchant] = await merchantService.findAll({ client_token: clientId, client_secret: clientToken });

    if (!merchant) {
      return res.sendStatus(401); // Return early after sending the response
    }
    console.log(merchant)
    req.user = merchant.dataValues;
    return next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(401); // Return early after sending the response
  }
}

