import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceModule } from './binance/binance.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [BinanceModule, MongooseModule.forRoot],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
