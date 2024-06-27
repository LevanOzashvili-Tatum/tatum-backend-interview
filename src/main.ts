import { TransactionHash } from '@tatumio/api-client';
import { TatumEthSDK } from '@tatumio/eth';

const ethSDK = TatumEthSDK({
  apiKey: 't-649d4288a9aa09001c0f2250-649d4288a9aa09001c0f2254',
});

export async function ethErc20Example() {
  const senderPrivateKey = '0xf90c7ab9522a7e525349a9b9113e0758c7caeefbaaa69bcf6fd915a8c2e34d0e';
  const receiverAddress = '0xd9cfbfe18fb9bf3871da5528061582ec08b97166';

  const erc20Transferred = (await ethSDK.erc20.send.transferSignedTransaction({
    to: receiverAddress,
    amount: '1',
    contractAddress: '0x3CD1Fab47707DA04357fa16Be7EDAc1BeE2b59e2',
    fromPrivateKey: senderPrivateKey,
    digits: 18,
  })) as TransactionHash;

  console.log(`Erc20 transaction with txID ${erc20Transferred.txId} was sent.`);
}

ethErc20Example();
