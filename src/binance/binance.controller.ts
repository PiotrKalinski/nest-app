import {
  Controller,
  Get,
  Query,
  Logger,
} from '@nestjs/common';
import { BinanceService } from './binance.service';

@Controller('binance')
export class BinanceController {
  private readonly logger = new Logger(BinanceController.name); // Initialize logger

  constructor(private readonly binanceService: BinanceService) {}

  @Get()
  async fetchData(
    @Query('symbol') symbol: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
    @Query('interval') intrval: string,
  ) {
    // Set default endTime to now if not provided
    if (!endTime) {
      endTime = Date.now();
    }
    // Set default startTime to 24 hours before endTime if not provided
    if (!startTime) {
      startTime = endTime - 24 * 60 * 60 * 1000;
    }

    this.logger.log(`Fetching data for symbol: ${symbol}, startTime: ${startTime}, endTime: ${endTime}, interval: ${intrval}`);
    
    const klines = await this.binanceService.getKlines(
      startTime,
      endTime,
      intrval,
      symbol,
    );

    const analysisResults = this.binanceService.analyzeKlinesPrices(klines);
    await this.binanceService.saveAnalytics(analysisResults, symbol);
  }
}
