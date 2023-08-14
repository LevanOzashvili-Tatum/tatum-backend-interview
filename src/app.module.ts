import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EthereumService } from './ethereum.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [EthereumService],
})
export class AppModule {}
