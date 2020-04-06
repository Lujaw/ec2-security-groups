'use strict';
const ec2 = require('../services/ec2');

module.exports.list = async (event) => {
  const list = await ec2.listSecurityGroups();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(
        list,
        null,
        2
    )
  };
};
