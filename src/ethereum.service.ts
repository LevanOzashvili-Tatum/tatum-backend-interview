import { Injectable } from '@nestjs/common';
import { Ethereum, Network, TatumSDK } from '@tatumio/tatum';

@Injectable()
export class EthereumService {
  async getTransactionsOnAddressInBlock(
    blockNumber: number,
  ): Promise<{ address: string; count: number }> {
    const block = await this.getBlockByNumber(blockNumber);

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

  private async getBlockByNumber(blockNumber: number) {
    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
    });

    // convert blockNumber to number if it is string
    blockNumber = +blockNumber;

    const result = await tatum.rpc.getBlockByNumber(blockNumber, true);

    // TatumSDK requires destroy() to be called after init()
    tatum.destroy();

    return result;
  }
}
