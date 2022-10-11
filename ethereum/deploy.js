const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/contracts/Migration.json')
//// console.log(compiledFactory)
const provider = new HDWalletProvider(
  'alien fiber miss spike six rail online young attend magnet baby logic',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  const bytecode = compiledFactory.evm.bytecode.object 
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: bytecode })
    .send({ gas: '4000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);

  provider.engine.stop();
};
deploy();
