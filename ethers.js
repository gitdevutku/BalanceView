const ethers = require('ethers');
const abi = require('./erc20.abi.json');
const provider = new ethers.JsonRpcProvider('https://chain.scimatic.net');
const private_key =
  '0xe1119699c0f01f7e18a6653be970854396692a00b5d188ab2373ec5fc6157696';
const WALLET_ADDRESS = '0xC3b725Efd4Fb95325281B97baF9FCCC9F94D9672';
const RECEIVER_ADDRESS = '0xF6937c1dDD21fd9539F3B18aB74fcBE69328456C';

const wallet = new ethers.Wallet(private_key, provider);

const contract = new ethers.Contract(RECEIVER_ADDRESS, abi, wallet);

async function getBalance() {
  try {
    const balance = await provider.getBalance(WALLET_ADDRESS);
    const ethValue = ethers.formatEther(balance);
    console.log('Balance : ' + ethValue);
  } catch (error) {
    console.error(error);
  }
}
/*
async function logChain() {
  const chainId = await provider.getNetwork();
  console.log(chainId.chainId.toString());
}
*/ async function transferTokens(to, amount) {
  try {
    const amountToSend = ethers.parseEther(amount.toString());
    const tx = await contract.transfer(to, amountToSend);
    console.log('Transaction sent:', tx);
    console.log('Transaction hash:', tx.hash);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}
async function storePrivateKey() {
  try {
    await EncryptedStorage.setItem(
      'Private Key',
      JSON.stringify({
        private_key,
      }),
    );
  } catch (error) {}
}
async function retrievePrivateKey() {
  try {
    const session = await EncryptedStorage.getItem('Private Key');

    if (session !== undefined) {
    }
  } catch (error) {}
}

/* Örneğin 10 tokeni RECEIVER_ADDRESS adresine göndermek için:
console.log(wallet.address);
*/
/*
getBalance();
*/
export {
  ethers,
  getBalance,
  transferTokens,
  storePrivateKey,
  retrievePrivateKey,
};
