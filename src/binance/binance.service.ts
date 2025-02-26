import { Injectable } from '@nestjs/common';
import { CreateBinanceDto } from './dto/create-binance.dto';
import { UpdateBinanceDto } from './dto/update-binance.dto';

@Injectable()
export class BinanceService {
  create(createBinanceDto: CreateBinanceDto) {
    return 'This action adds a new binance';
  }

  findAll() {
    return `This action returns all binance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} binance`;
  }

  update(id: number, updateBinanceDto: UpdateBinanceDto) {
    return `This action updates a #${id} binance`;
  }

  remove(id: number) {
    return `This action removes a #${id} binance`;
  }
}
