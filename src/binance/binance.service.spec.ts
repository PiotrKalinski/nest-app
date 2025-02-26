import { Test, TestingModule } from '@nestjs/testing';
import { BinanceService } from './binance.service';
import { getModelToken } from '@nestjs/mongoose';
import { MarketData } from './schemas/analysis.schema';
import axios from 'axios';

jest.mock('axios');

describe('BinanceService', () => {
  let service: BinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BinanceService,
        {
          provide: getModelToken(MarketData.name),
          useValue: {}, // Mock the model
        },
      ],
    }).compile();

    service = module.get<BinanceService>(BinanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return empty array on API failure', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));
    const result = await service.getKlines(1620000000000, 1620003600000, '1m', 'BTCUSDT');
    expect(result).toEqual([]);
  });
});
