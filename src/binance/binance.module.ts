import { Module } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { BinanceController } from './binance.controller';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forFeature()]
  controllers: [BinanceController],
  providers: [BinanceService],
})
export class BinanceModule {}
