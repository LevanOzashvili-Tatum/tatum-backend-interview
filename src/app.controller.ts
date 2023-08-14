import { Controller, Param, Post } from '@nestjs/common';
import { EthereumService } from './ethereum.service';

@Controller()
export class AppController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Post(':blockNumber')
  getMostUsedAddressInBlock(@Param() param: { blockNumber: number }) {
    return this.ethereumService.getMostUsedAddressInBlock(param.blockNumber);
  }
}
