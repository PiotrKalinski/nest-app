import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { CreateBinanceDto } from './dto/create-binance.dto';
import { UpdateBinanceDto } from './dto/update-binance.dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Post()
  create(@Body() createBinanceDto: CreateBinanceDto) {
    return this.binanceService.create(createBinanceDto);
  }

  @Get()
  findAll() {
    return this.binanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.binanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBinanceDto: UpdateBinanceDto) {
    return this.binanceService.update(+id, updateBinanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.binanceService.remove(+id);
  }
}
