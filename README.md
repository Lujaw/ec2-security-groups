<!--
title: 'List EC2 Security Groups lambda'
description: 'A serverless lambda which lists the security groups in the AWS account'
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/lujaw'
authorName: 'Luja Shrestha'
-->

# List EC2 Security Groups lambda

A lambda function which lists the security groups in the AWS account. 
Features:

    * Lambda function made available via an AWS API Gateway endpoint
    * Unit tests written by mocking AWS EC2 API using aws-sdk-mock
    * Endpoint secured by using auth0, JSON Web Tokens and a custom authorizer lambda function.
    * End-to-end API test for the endpoint
    * JSON:API 1.0 compatible response


## Pre-requisites

In order to deploy the function, you will need the following:

- API credentials for AWS, with Administrator permissions (for simplicity, not recommended in production).
- AUTH0_CLIENT_ID and AUTH0_ACCESS_TOKEN placed inside .env file in the root folder
- AUTHO_PUBLIC_KEY pem file placed inside public_key in the root folder
- Serverless framework installed locally via  `npm i serverless -g`.
- Node.js 12.0

## Setting up the Serverless project

1. Clone the repository and install the dependencies:

```
npm i
```

2. Add your AWS credentials using:
```
serverless config credentials
```

3. Run the lambda locally using:
```
npm start
```

4. Following commands are available for the testing
```
npm run test                 #(run the test in watch mode)
npm run test:e2e             #(run the end to end test)
npm run test:cov             #(get the coverage report)
```

## Deploy this to your AWS account using Serverless Framework

If you have the Serverless CLI set up, you can simply deploy by using:
```
serverless deploy
```

### TODO
* Add unit test for the authoriser
* Add test and prod stages for the api
* Add validation for the query parameters
* Add query parameters for filtering the result
