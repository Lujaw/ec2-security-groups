"use strict";
const JSONAPISerializer = require("jsonapi-serializer").Serializer;
const ec2 = require("../services/ec2");

const SecurityGroupSerializer = new JSONAPISerializer("securityGroups", {
  attributes: [
    "Description",
    "GroupId",
    "GroupName",
    "IpPermissions",
    "IpPermissionsEgress",
    "OwnerId",
    "Tags",
    "VpcId",
  ],
});

module.exports.list = async () => {
  try {
    const { SecurityGroups } = await ec2.listSecurityGroups();
    const list = SecurityGroupSerializer.serialize(SecurityGroups);
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
