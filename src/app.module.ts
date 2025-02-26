import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceModule } from './binance/binance.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongoDbUrl = 'mongodb://localhost:27017/binance';

@Module({
  imports: [BinanceModule, MongooseModule.forRoot(mongoDbUrl)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
