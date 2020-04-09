const AwsMock = require("aws-sdk-mock");
const dotenv = require("dotenv");
const ec2 = require("../services/ec2");
const securityGroupSample = require("./securityGroupSample.json");

beforeAll(() => {
  dotenv.config();
});

afterEach(() => {
  AwsMock.restore();
});

describe("ec2 service", () => {
  it("should returns the list of the security group", async () => {
    AwsMock.mock("EC2", "describeSecurityGroups", securityGroupSample);
    const list = await ec2.listSecurityGroups();
    expect(list).toEqual(securityGroupSample);
  });

  it("should throw if there is an error when fetching", () => {
    AwsMock.mock("EC2", "describeSecurityGroups", () => {
      throw new Error("Error while fetching");
    });
    expect(ec2.listSecurityGroups()).rejects.toThrow(
      "Could not retrieve the security group list"
    );
  });
});
