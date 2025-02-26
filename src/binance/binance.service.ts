import { Injectable, Logger } from '@nestjs/common';
import { CreateBinanceDto } from './dto/create-binance.dto';
import { UpdateBinanceDto } from './dto/update-binance.dto';
import { InjectModel } from '@nestjs/mongoose'
import { MarketData, MarketDataDocument } from './schemas/analysis.schema'
import axios from 'axios';

import {Model } from 'mongoose'
@Injectable()
export class BinanceService {

  private readonly logger = new Logger(BinanceService.name);
  private readonly binanceUrl = 'https://api.binance.com'
  constructor(@InjectModel(MarketData.name) private marketDataModel : Model<MarketDataDocument>) {}


  async fetchAndAnalyze(startTime: number, endTime: number, interval: string, symbol: string ) {
    console.log('asd')
    try {

      const biannceResponse = await axios.get(`${this.binanceUrl}/api/v3/klines`, {
        params: {
          symbol, interval, startTime, endTime
        },
        headers: {
          'X-MBX-APIKEY': process.env.BINANCE_API_KEY || ''
        }
      })

      console.log( {biannceResponse})


    } catch (error) {
      console.log( {resp: error.response})
      console.log({ symbol})
    }

  }





}
