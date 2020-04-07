const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const axios = require("axios");

const auth = async (event) => {
  try {
    const encodedToken = getEncodedToken(event.authorizationToken);
    const token = jwt.decode(encodedToken, { complete: true });
    const jwk = await getJwkByKid(token.payload.iss, token.header.kid);
    const pem = jwkToPem(jwk);
    jwt.verify(encodedToken, pem);
    return generatePolicy(token.payload.sub, "Allow", event.methodArn);
  } catch (error) {
    console.error(error.message);
    return generatePolicy("*", "Deny", event.methodArn);
  }
};

const getEncodedToken = (header) => header.split(" ")[1];

const getJwkByKid = async (iss, kid) => {
  const jwksendpoint = iss + ".well-known/jwks.json";
  const json = await axios(jwksendpoint);

  for (let index = 0; index < json.data.keys.length; index++) {
    const key = json.data.keys[index];

    if (key.kid === kid) {
      return key;
    }
  }
};

const generatePolicy = (principalId, effect, resource) => ({
  principalId,
  ...(effect &&
    resource && {
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: effect,
            Resource: resource,
          },
        ],
      },
    }),
});

module.exports = {
  auth,
};
