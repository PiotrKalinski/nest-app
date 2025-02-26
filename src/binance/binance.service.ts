import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MarketData, MarketDataDocument } from './schemas/analysis.schema';
import axios from 'axios';

import { Model } from 'mongoose';
@Injectable()
export class BinanceService {
  private readonly binanceUrl = 'https://api.binance.com';
  constructor(
    @InjectModel(MarketData.name)
    private marketDataModel: Model<MarketDataDocument>,
  ) {}

  async getKlines(
    startTime: number,
    endTime: number,
    interval: string,
    symbol: string,
  ) {
    try {
      const klines = await axios.get(`${this.binanceUrl}/api/v3/klines`, {
        params: {
          symbol,
          interval,
          startTime,
          endTime,
        },
        headers: {
          'X-MBX-APIKEY': process.env.BINANCE_API_KEY || '',
        },
      });


      return klines.data;
    } catch (error) {
      throw Error('Error while fetching data')
    }
  }

  analyzeKlinesPrices(klines: any[]): any[] {
    return klines.map((kline) => {
      const [openTime, open, , , close] = kline;
      const openPrice = parseFloat(open);
      const closePrice = parseFloat(close);
      const change = ((closePrice - openPrice) / openPrice) * 100;

      return {
        timeStamp: openTime,
        open: openPrice,
        close: closePrice,
        change: parseFloat(change.toFixed(2)),
      };
    });
  }

  async saveAnalytics(analysisData : any[], symbol: string): Promise<MarketDataDocument[]> {
    try {
      return Promise.all(analysisData.map( async (data) => {
        console.log({data })
        const createdRecord  = new this.marketDataModel({...data, symbol})
        return createdRecord.save();
      }))
    } catch (error ) {
      throw Error('Error while saving data to databse')
    }

  }
}
