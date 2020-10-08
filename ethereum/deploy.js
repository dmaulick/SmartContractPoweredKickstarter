const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {
  abi: campaignFactoryAbi,
  evm: campaignFactoryEvm,
} = require("../ethereum/build/CampaignFactory.json");

console.log("Starting");

// Test account creds
// pw - 12345678
const provider = new HDWalletProvider(
  "decade offer welcome various arrive today unfair virtual comic present book risk",
  "https://rinkeby.infura.io/v3/78523468fd0048d4a308a6b3f658cdd7"
);
const web3 = new Web3(provider);

const deploy = async () => {
  console.log("In deploy");
  const deployingAccount = (await web3.eth.getAccounts())[0];

  console.log("account balance", await getAccountBalance(deployingAccount));
  console.log("Attempting to deploy from account", deployingAccount);

  const result = await new web3.eth.Contract(campaignFactoryAbi)
    .deploy({ data: "0x" + campaignFactoryEvm.bytecode.object, arguments: [] })
    .send({ from: deployingAccount, gas: "1000000" });

  console.log("Contract deployed to", result.options.address);
};

const getAccountBalance = async (account) => {
  return web3.utils.fromWei(await web3.eth.getBalance(account), "ether");
};

deploy();
// on october 8 2020 deployed the first contract
// to 0x5e09064C2DEAe31Ca7923A123BcD077F7805e0F8
// deployed from account 0xA133715f42DcD427D3E85375a9C1A96947119f57
