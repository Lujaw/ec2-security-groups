const ec2 = require("../services/ec2");
const { serializeSecurityGroup } = require("../helpers/jsonApiSerializer");

module.exports.list = async (event) => {
  try {
    const { SecurityGroups } = await ec2.listSecurityGroups(
      event.queryStringParameters
    );
    const list = serializeSecurityGroup(SecurityGroups);
    return {
      statusCode: 200,
      body: JSON.stringify(list, null, 2),
    };
  } catch (error) {
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Could not retrive the security group list",
      }),
    };
  }
};
