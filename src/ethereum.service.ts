import { Ethereum, Network, TatumSDK } from '@tatumio/tatum';

export class EthereumService {
  getMostUsedAddressInBlock(blockNumber: number) {
    const block = this.getBlockByNumber(blockNumber);

    const transactions = block.transactions;

    const addresses = [];

    // gather all addresses from transactions
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (transaction.to) {
        addresses.push(transaction.to);
      }
      if (transaction.from) {
        addresses.push(transaction.from);
      }
    }

    // prepare address count Record
    const addressesCount: Record<string, number> = {};
    addresses.forEach((address) => {
      if (address) {
        if (!addressesCount[address]) {
          addressesCount[address] = 0;
        }
        addressesCount[address] += 1;
      }
    });

    // sort addresses by count
    const sortedAddressesCountArray = Object.entries(addressesCount).sort(
      (a: [string, number], b: [string, number]) => b[1] - a[1],
    );

    // return the address with the highest count
    return {
      address: sortedAddressesCountArray[0][0],
      count: sortedAddressesCountArray[0][1],
    };
  }

  private getBlockByNumber(blockNumber: number) {
    let block = null;
    const timeout = 5000;

    this.getBlockWithTatumSdk(blockNumber).then((result) => {
      block = result;
    });

    const startTime = Date.now();

    // we need the block so we wait for it to be set
    while (block === null && Date.now() - startTime < timeout) {}

    if (block === null) {
      throw new Error('Timeout waiting for block to be set');
    }

    return block.result;
  }

  private async getBlockWithTatumSdk(blockNumber: number) {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
    });

    return tatum.rpc.getBlockByNumber(Number(blockNumber), true);
  }
}
