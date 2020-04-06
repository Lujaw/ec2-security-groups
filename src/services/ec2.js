'use strict';
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

// Load credentials and set region from JSON file
AWS.config.update({region: process.env.region});

const listSecurityGroups = async (params) => {
// have to instantiate EC2 inside the function for the aws-sdk-mock to function
  try {
    const ec2 = new AWS.EC2({apiVersion: process.env.apiVersion});
    const list = await ec2.describeSecurityGroups(params).promise();
    return list;
  } catch (error) {
    console.error(error.message);
    throw new Error('Could not retrieve the security group list');
  }
};

module.exports = {
  listSecurityGroups
};
