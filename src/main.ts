import { EthereumService } from './ethereum.service';

async function run() {
  const blockNumber = 17892393;
  const ethService = new EthereumService();

  console.log('Getting most used address in block');
  const result = ethService.getMostUsedAddressInBlock(blockNumber);
  console.log('The most used address in block:', result);
}
run();
