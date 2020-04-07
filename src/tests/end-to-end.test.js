const dotenv = require("dotenv");
const supertest = require("supertest");
const endpoint = require("./endpoint.json");

dotenv.config();

const apiUrl = `https://${endpoint.api.id}.execute-api.${endpoint.lambda.region}.amazonaws.com/${endpoint.api.stage}`;

const server = supertest.agent(apiUrl);

describe("EC2 Security groups list endpoint", () => {
  it("should fail without valid authorization header", async () => {
    const res = await server.get("/securitygroups");
    expect(res).toBeDefined();
    expect(res.statusCode).toEqual(401);
    expect(res.text).toEqual('{"message":"Unauthorized"}');
  });

  it("should return a list of security groups when the authorization header is valid", async () => {
    const res = await server
      .get("/securitygroups")
      .set("Authorization", `Bearer ${process.env.AUTH0_ACCESS_TOKEN}`);
    expect(res).toBeDefined();
    expect(res).toHaveProperty("get");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("SecurityGroups");
    expect(res.body.SecurityGroups.length).toBeGreaterThan(0);
  });
});
