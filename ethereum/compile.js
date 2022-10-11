const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
 const directoryPath = __dirname + '/contracts/'
// get path to build folder
const buildPath = path.resolve(__dirname, "build");
// delete build folder
fs.removeSync(buildPath);

let input = {
  language: "Solidity",
  sources: {},
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};
const contractFiles = ["Campaign.sol"] 
contractFiles.forEach(function(contract) {
  if (!contract.endsWith('.sol')) contract += '.sol';
  const contractPath = directoryPath + contract;
  input.sources[contract] = {content: null};
  input.sources[contract].content = fs.readFileSync(contractPath, 'UTF-8');
});

function findImports(_path) {
  if (_path[0] === '.') {
    return {
        contents: fs.readFileSync(path.join(directoryPath, _path)).toString()
    }
  } else {
    return {
        contents: fs.readFileSync(path.join('./', 'node_modules', _path)).toString()
    }
  }
}

const output = JSON.parse(solc.compile(JSON.stringify(input), {import: findImports}));

if (output.errors) {
  console.log(output.errors);
}
 
// get path to Campaigns.sol
// const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
// // read campaign file
// const source = fs.readFileSync(campaignPath, "utf8");
// // compile contracts and get contracts
// let input = {
//   language: "Solidity",
//   sources: {
//     "Campaign.sol": {
//       content: source,
//     },
//   },
//   settings: {
//     outputSelection: {
//       "*": {
//         "*": ["abi", "evm.bytecode"],
//       },
//     },
//   },
// };
// // const output = solc.compile(output, 1);
// const output = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output)
// // create build folder
fs.ensureDirSync(buildPath);
 
// loop over output and write each contract to different file in build directory
if (output.errors) {
  output.errors.forEach((err) => {
    console.log(err.formattedMessage);
  });
} else {
  
  const contracts = output.contracts["Campaign.sol"];
  for (let contractName in contracts) {
    console.log('Contract : ', contractName)
    const contract = contracts[contractName];
    fs.writeFileSync(
      path.resolve(buildPath, `${contractName}.json`),
      JSON.stringify(contract, null, 2),
      "utf8"
    );
  }
}

// const path = require('path');
// const solc = require('solc');
// const fs = require('fs-extra');


// const buildPath = path.resolve(__dirname, 'build');
// fs.removeSync(buildPath);

// const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
// const source = fs.readFileSync(campaignPath, 'utf8');
// const output = solc.compile(source, 1).contracts;
// console.log(output)
// fs.ensureDirSync(buildPath);

// console.log(output);
// for (let contract in output){
    
//     fs.outputJsonSync(
//         path.resolve(buildPath, contract.replace(':', '')+'.json'),
//         output[contract]
//     )
// }