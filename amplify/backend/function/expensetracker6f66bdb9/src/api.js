const { default: axios } = require("axios");
const userPoolId = process.env.AUTH_EXPENSETRACKER2D30422F_USERPOOLID; // Replace with your User Pool ID
const region = process.env.REGION; // Replace with your AWS region



const auth = {
  getJWK: () => {
    const awsCognitoUrl = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`;
    const jwksUrl = `${awsCognitoUrl}/.well-known/jwks.json`;
    return axios.get(jwksUrl);
  },
};

const api = {
  auth,
};

module.exports = api;
