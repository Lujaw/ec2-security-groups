const JSONAPISerializer = require("jsonapi-serializer").Serializer;

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

const serializeSecurityGroup = (data) =>
  SecurityGroupSerializer.serialize(data);

module.exports = {
  serializeSecurityGroup,
};
