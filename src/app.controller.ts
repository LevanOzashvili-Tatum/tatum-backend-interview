import { Controller, Param, Post } from '@nestjs/common';
import { EthereumService } from './ethereum.service';

@Controller()
export class AppController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Post(':blockNumber')
  async getTransactions(
    @Param() param: { blockNumber: number },
  ): Promise<{ address: string; count: number }> {
    return await this.ethereumService.getTransactionsOnAddressInBlock(
      param.blockNumber,
    );
  }
}
