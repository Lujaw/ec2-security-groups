const AWS_Mock = require("aws-sdk-mock");
const AWS_SDK = require("aws-sdk");
const handler = require("../handlers/securityGroups");
const securityGroupSample = require("./securityGroupSample.json");


beforeAll(() => {
    const EC2 = new AWS_SDK.EC2({ apiVersion: '2016-11-15' });
    AWS_Mock.mock('EC2', 'describeSecurityGroups', securityGroupSample);
 });

afterAll(() => {
    AWS_Mock.restore();
});

test('it returns the list of the security group', async (done) => {
    const test = await handler.list();
    expect(test).toBe("Hello!");
    done();
});
