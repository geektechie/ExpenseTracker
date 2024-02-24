const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const { response } = require("../common/common");
const api = require("../api");

const verifyAwsIdToken = (token) => {
  return new Promise((resolve, reject) => {
    // Fetch the JSON Web Key Set (JWKS) containing the public keys used to verify the token
    api.auth
      .getJWK()
      .then((res) => {
        const jwks = res.data;
        jwt.verify(
          token,
          (header, callback) => {
            const jwk = jwks.keys.find((key) => key.kid === header.kid);
            if (!jwk) {
              return callback(
                new Error("Unable to find a matching key in the JWKS")
              );
            }
            let pem = jwkToPem(jwk);
            callback(null, pem);
          },
          (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const verifyAuth = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  let err = "Invalid Token";
  try {
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      const token = authorization.split(" ")[1];
      const decodedToken = await verifyAwsIdToken(token);
      if (decodedToken.token_use === "id") {
        req.user = {
          id: decodedToken["cognito:username"],
          email: decodedToken["email"],
          email_verified: decodedToken["email_verified"],
        };
        return next();
      }
      err = "Id Token Required";
    }
    console.log("Error While Decoding Token: ", err);
    return res.status(401).send(response(false, null, "Unauthorized"));
  } catch (err) {
    console.log("Error While Decoding Token: ", err);
    return res.status(401).send(response(false, null, "Unauthorized"));
  }
};

module.exports = verifyAuth;
