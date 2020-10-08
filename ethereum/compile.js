const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// __dirname == is the current working directory
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

// Docs on solc
// https://solidity.readthedocs.io/en/v0.5.0/using-the-compiler.html#compiler-input-and-output-json-description
var input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"], // ["*"]
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts["Campaign.sol"];

fs.ensureDirSync(buildPath);

// fs.outputJsonSync(
//   path.resolve(buildPath, "everything" + ".json"),
//   output.contracts.Task,
//   {
//     spaces: 3,
//   }
// );

for (let key in contracts) {
  fs.outputJsonSync(path.resolve(buildPath, key + ".json"), contracts[key], {
    spaces: 3,
  });
}

// For testing the attributes of the contracts
// const contractValues = Object.values(contracts);
// const contractEntries = Object.entries(contracts);
// const contractKeys = Object.keys(contracts);
// fs.outputJsonSync(
// 		path.resolve(buildPath, 'contracts' +'.json'),
// 		contracts,
// 		{
// 			spaces: 3
// 		}
// 	);

// fs.outputJsonSync(
// 		path.resolve(buildPath, 'entries' +'.json'),
// 		contractEntries,
// 		{
// 			spaces: 3
// 		}
// 	);

// fs.outputJsonSync(
// 		path.resolve(buildPath, 'values' +'.json'),
// 		contractValues,
// 		{
// 			spaces: 3
// 		}
// 	);

// fs.outputJsonSync(
// 		path.resolve(buildPath, 'keys' +'.json'),
// 		contractKeys,
// 		{
// 			spaces: 3
// 		}
// 	);
//
// contractEntries.forEach((element) => {
// 	fs.outputJsonSync(
// 		path.resolve(buildPath, element.key +'.json'),
// 		element.value
// 	);
// })
