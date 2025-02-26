import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { CreateBinanceDto } from './dto/create-binance.dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get()
  fetchData(@Query('symbol') symbol: string, @Query('startTime') startTime:number, @Query('endTime') endTime: number, @Query('interval') intrval: string) {
    console.log({ endTime, startTime, intrval, symbol})
    return this.binanceService.fetchAndAnalyze(startTime, endTime, intrval, symbol);
  }



}
