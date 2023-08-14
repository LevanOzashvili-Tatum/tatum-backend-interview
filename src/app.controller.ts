import { Controller, Param, Post } from '@nestjs/common';
import { EthereumService } from './ethereum.service';

@Controller()
export class AppController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Post(':blockNumber')
  getTransactions(@Param() param: { blockNumber: number }) {
    return this.ethereumService.getTransactionsOnAddressInBlock(
      param.blockNumber,
    );
  }
}
