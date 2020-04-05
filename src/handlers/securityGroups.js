'use strict';
const ec2 = require("../services/ec2");

module.exports.list = async (event) => {
  const list = await ec2.listSecurityGroups();

  return {
    statusCode: 200,
    body: JSON.stringify(
      list,
      null,
      2
    ),
  };
};
