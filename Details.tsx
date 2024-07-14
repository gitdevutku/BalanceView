import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {ethers} from 'ethers';
const {EncryptedStorage} = require('react-native-encrypted-storage');

type DetailScreenProps = {
  navigation: any; // Adjust the type as per your navigation setup
};

const DetailsScreen: React.FC<DetailScreenProps> = ({navigation}) => {
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [balance, setBalance] = useState('');

  const provider = new ethers.JsonRpcProvider('https://chain.scimatic.net');
  const private_key =
    '0xe1119699c0f01f7e18a6653be970854396692a00b5d188ab2373ec5fc6157696';
  const WALLET_ADDRESS = '0xC3b725Efd4Fb95325281B97baF9FCCC9F94D9672';
  const RECEIVER_ADDRESS = '0xF6937c1dDD21fd9539F3B18aB74fcBE69328456C';
  const wallet = new ethers.Wallet(private_key, provider);
  const abi = require('./erc20.abi.json');
  const contract = new ethers.Contract(RECEIVER_ADDRESS, abi, wallet);

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

  const getBalance = async () => {
    try {
      const balance = await provider.getBalance(WALLET_ADDRESS);
      const ethValue = ethers.formatEther(balance);
      setBalance(ethValue);
    } catch (error) {
      console.error(error);
    }
  };

  const transferTokens = async (to: string, amount: string) => {
    try {
      const amountToSend = ethers.parseEther(amount);
      const tx = await contract.transfer(to, amountToSend);
      setTransactionHash(tx.hash);
      console.log('Transaction sent:', tx);
      console.log('Transaction hash:', tx.hash);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  useEffect(() => {
    getBalance(); // Fetch initial balance when component mounts
  });

  const handleTransfer = () => {
    transferTokens(RECEIVER_ADDRESS, amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Balance: {balance} SCI</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholderTextColor="gray"
        placeholder="Enter amount to transfer"
        keyboardType="numeric"
      />
      <Button title="Transfer Tokens" onPress={handleTransfer} />
      {transactionHash ? (
        <Text>Transaction Hash: {transactionHash}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  homeScreen: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    color: 'gray',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    color: 'gray',
  },
});

export default DetailsScreen;
