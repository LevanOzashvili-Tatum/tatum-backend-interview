import { Injectable } from '@nestjs/common';
import { Ethereum, Network, TatumSDK } from '@tatumio/tatum';

@Injectable()
export class EthereumService {
  getTransactionsOnAddressInBlock(blockNumber: number) {
    const block = this.getBlockByNumber(blockNumber);

    const transactions = block.result.transactions;

    const addresses = [];

    // gather 'to' addresses from transactions
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (transaction.to) {
        addresses.push(transaction.to);
      }
    }

    // gather 'from' addresses from transactions
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
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
    TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
    }).then((tatum) =>
      tatum.rpc.getBlockByNumber(blockNumber, true).then((result) => {
        block = result;
      }),
    );

    // wait for block to be set
    while (block === null) {}

    return block;
  }
}
