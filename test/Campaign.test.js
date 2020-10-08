const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const provider = ganache.provider();
const options = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5,
};
const web3 = new Web3(provider, null, options);

const {
  abi: campaignFactoryAbi,
  evm: campaignFactoryEvm,
} = require("../ethereum/build/CampaignFactory.json");
const {
  abi: campaignAbi,
  evm: campaignEvm,
} = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(campaignFactoryAbi)
    .deploy({ data: "0x" + campaignFactoryEvm.bytecode.object, arguments: [] })
    .send({ from: accounts[0], gas: "1000000" });

  // we use 'send' because we are modifying data on the blockchain
  await factory.methods.createCampaign("100").send({
    from: accounts[0], //identifies the manager of the campaign
    gas: "1000000",
  });

  // we use 'call' because 'getDeployedCampaigns' is a 'view' method
  // this syntax assigns the first value in the returned array to the const in the brackets
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  // this allows us to fetch the campaign that has already been created on chain
  campaign = await new web3.eth.Contract(campaignAbi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
});
