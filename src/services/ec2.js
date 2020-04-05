'use strict';

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.update({region: 'ap-southeast-2'});

// Create EC2 service object
const ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

const listSecurityGroups = async (params) => {
    const list = await ec2.describeSecurityGroups(params).promise();
    return list;
}

module.exports = {
    listSecurityGroups
};
