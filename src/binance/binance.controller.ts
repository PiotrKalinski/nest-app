import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BinanceService } from './binance.service';
import { CreateBinanceDto } from './dto/create-binance.dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get()
  async fetchData(
    @Query('symbol') symbol: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
    @Query('interval') intrval: string,
  ) {
    console.log({ endTime, startTime, intrval, symbol });
    if(!endTime) {
      endTime = Date.now()
    }
    if (!startTime) {{
      startTime = endTime - 24 * 60 * 60 * 1000;
    }}
    const klines =  await this.binanceService.getKlines(
      startTime,
      endTime,
      intrval,
      symbol,
    );

    const analysisResults = this.binanceService.analyzeKlinesPrices(klines)
    await this.binanceService.saveAnalytics(analysisResults, symbol)
  
  }
}
