import { Module } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { BinanceController } from './binance.controller';
import { MongooseModule } from '@nestjs/mongoose'
import {MarketData, MarketDataSchema } from './schemas/analysis.schema'
@Module({
  imports: [MongooseModule.forFeature( [{ 
    name: MarketData.name, schema: MarketDataSchema
  }])],
  controllers: [BinanceController],
  providers: [BinanceService],
})
export class BinanceModule {}
