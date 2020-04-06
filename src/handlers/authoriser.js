const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios');

module.exports.auth = async (event) => {
  try {
    const encodedToken = getEncodedToken(event.authorizationToken);
    const token = jwt.decode(encodedToken, { complete: true });
    const jwk = await getJwkByKid(token.payload.iss, token.header.kid);
    const pem = jwkToPem(jwk);
    jwt.verify(encodedToken, pem);
    return generatePolicy(token.payload.sub, 'Allow', event.methodArn);
  } catch (error) {
    console.error(error.message);
    return generatePolicy('*', 'Deny', event.methodArn);
  }
}

function getEncodedToken(header) {
  const token = header.split(" ")[1];
  return token;
}

async function getJwkByKid(iss, kid) {
  const jwksendpoint = iss + ".well-known/jwks.json";
  const json = await axios(jwksendpoint);

  for (let index = 0; index < json.data.keys.length; index++) {
    const key = json.data.keys[index];

    if (key.kid === kid)
      return key;
  }
}

const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    authResponse.policyDocument = {
      "Version": '2012-10-17',
      "Statement": [{
        "Action": 'execute-api:Invoke',
        "Effect": effect,
        "Resource": resource
      }]
    };
  }
  return authResponse;
};