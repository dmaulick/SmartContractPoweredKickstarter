import web3 from './web3';
const {
  abi: campaignAbi,
} = require(".Campaign.json");

export default address => {
  return new web3.eth.Contract(campaignAbi, address);
};