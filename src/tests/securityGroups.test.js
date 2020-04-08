const AwsMock = require("aws-sdk-mock");
const securityGroupHandler = require("../handlers/securityGroups");
const { serializeSecurityGroup } = require("../helpers/jsonApiSerializer"); 
const securityGroupSample = require("./securityGroupSample.json");

beforeAll(() => {
  AwsMock.mock("EC2", "describeSecurityGroups", securityGroupSample);
});

afterEach(() => {
  AwsMock.restore();
});

const event = {
    "queryStringParameters" : {}
};

describe("Security Group handler", () => {
  it("should returns the list of the security group", async () => {
    const list = await securityGroupHandler.list(event);
    const serializedData = serializeSecurityGroup(securityGroupSample.SecurityGroups);
    expect(list.statusCode).toEqual(200);
    expect(list.body).toEqual(JSON.stringify(serializedData,null,2));
  });

  it("should throw an error when there is error while fetching data", async () => {
    const list = await securityGroupHandler.list(event);
    AwsMock.mock("EC2", "describeSecurityGroups", () => {
      throw new Error("Error while fetching");
    })
    expect(list.statusCode).toEqual(500);
    expect(list.body).toEqual(JSON.stringify({
        message: "Could not retrive the security group list",
      }));
  });
});

