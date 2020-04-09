const createJWKSMock = require("mock-jwks").default;
const authHandler = require("../handlers/authoriser");

const AUTH_0_URL = "https://dev-lujaw.au.auth0.com/";

describe("Auth handler test", () => {
  const jwks = createJWKSMock(AUTH_0_URL);
  beforeEach(() => {
    jwks.start();
  });
  afterEach(() => {
    jwks.stop();
  });

  it("should return a deny policy when token is invalid", async () => {
    const access_token = jwks.token({
      iss: AUTH_0_URL,
      exp: 0,
    });

    const event = {
      authorizationToken: `Bearer ${access_token}`,
      methodArn:
        "arn:aws:execute-api:ap-southeast-2:random-account-id:random-api-id/dev/GET/securitygroups",
    };

    const policy = await authHandler.auth(event);
    expect(policy.policyDocument.Statement[0]).toHaveProperty("Effect");
    expect(policy.policyDocument.Statement[0].Effect).toBe("Deny");
  });
});
