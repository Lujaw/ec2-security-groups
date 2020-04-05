'use strict';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const _ = require("lodash");

// Load credentials and set region from JSON file
AWS.config.update({ region: process.env.region });

const listSecurityGroups = async (params) => {
  // have to instantiate EC2 inside the function for the aws-sdk-mock to function properly
  const ec2 = new AWS.EC2({ apiVersion: process.env.apiVersion });
  let list = await ec2.describeSecurityGroups(params).promise();

  // list.SecurityGroups = list.SecurityGroups.map(removeIpPermissionFields);
  return list;
};

// removes the IpPermission fields as they can be optional
const removeIpPermissionFields = group =>
  _.omit(group, "IpPermissions", "IpPermissionsEgress");

module.exports = {
  listSecurityGroups
};
