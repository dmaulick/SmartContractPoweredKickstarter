import web3 from "./web3";
const {
  abi: campaignFactoryAbi,
} = require("../ethereum/build/CampaignFactory.json");

// specifies address of the already deployed contract
const instance = new web3.eth.Contract(
  campaignFactoryAbi,
  "0x5e09064C2DEAe31Ca7923A123BcD077F7805e0F8"
);

export default instance;
