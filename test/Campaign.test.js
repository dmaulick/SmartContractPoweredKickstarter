const assert = require("assert");
// ****** important to note that ganache will not reset balances of its created accounts between tests
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

// Helpful in figuring this out - https://ethereum.stackexchange.com/questions/71284/cant-deploy-contract-with-web3-js-and-ganache-cli
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(campaignFactoryAbi)
    .deploy({ data: "0x" + campaignFactoryEvm.bytecode.object, arguments: [] })
    .send({ from: accounts[0], gas: "1000000" });

  // we use 'send' because we are modifying data on the blockchain
  await factory.methods.createCampaign("100").send({
    // note that accounts is auto created for us by ganache
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

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.deepStrictEqual(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approver", async () => {
    await campaign.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });

    // this is how we can fetch data from a mapping - returns a boolean
    const accountIsContributer = await campaign.methods
      .approvers(accounts[1])
      .call();

    assert(accountIsContributer);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "1",
        from: accounts[1],
      });
      // if does not throw exception the test will fail
      assert(false);
    } catch (e) {
      assert(e);
    }
  });

  it("allows manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Buy batteries", "100", accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    const request = await campaign.methods.requests(0).call();

    assert.deepStrictEqual("Buy batteries", request.description);
  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    const request = await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    let onChainRequest = await campaign.methods.requests(0).call();
    assert.deepStrictEqual("0", onChainRequest.approvalCount);

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    onChainRequest = await campaign.methods.requests(0).call();
    assert.deepStrictEqual("1", onChainRequest.approvalCount);

    let balance = await getAccountBalance(accounts[1]);
    assert.deepStrictEqual("99.9998281339999998", balance);

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    onChainRequest = await campaign.methods.requests(0).call();
    assert.deepStrictEqual(true, onChainRequest.complete);
    assert.deepStrictEqual("1", onChainRequest.approvalCount);
    assert.deepStrictEqual(accounts[1], onChainRequest.recipient);

    // ****** important to note that ganache will not reset balances of its created accounts between tests
    // so even though we check for an exact value here if we add anymore tests this could break
    balance = await getAccountBalance(accounts[1]);
    assert.deepStrictEqual("104.9998281339999998", balance);
  });

  const getAccountBalance = async (account) => {
    return web3.utils.fromWei(await web3.eth.getBalance(account), "ether");
  };
});
