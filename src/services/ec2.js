// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
const _ = require("lodash");

const listSecurityGroups = async (params) => {
  // have to instantiate EC2 inside the function for the aws-sdk-mock to function
  try {
    const ec2 = new AWS.EC2({
      apiVersion: process.env.apiVersion,
      region: process.env.region,
    });
    const sanitizedParams = sanitizeQueryParams(params);
    const list = await ec2.describeSecurityGroups(sanitizedParams).promise();
    return list;
  } catch (error) {
    console.error(error.message);
    throw new Error("Could not retrieve the security group list");
  }
};

const sanitizeQueryParams = (params) => {
  // supporting MaxResults for limiting the result whose value needs to be between 5 and 1000
  const validParams = ["MaxResults"];
  return _.pick(params, validParams);
};

module.exports = {
  listSecurityGroups,
};
