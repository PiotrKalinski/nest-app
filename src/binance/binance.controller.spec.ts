import { Test, TestingModule } from '@nestjs/testing';
import { BinanceController } from './binance.controller';
import { BinanceService } from './binance.service';

describe('BinanceController', () => {
  let controller: BinanceController;
  let service: BinanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinanceController],
      providers: [
        {
          provide: BinanceService,
          useValue: {
            getKlines: jest.fn(),
            analyzeKlinesPrices: jest.fn(),
            saveAnalytics: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BinanceController>(BinanceController);
    service = module.get<BinanceService>(BinanceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle API failure gracefully', async () => {
    const symbol = 'BTCUSDT';
    const startTime = Date.now() - 24 * 60 * 60 * 1000;
    const endTime = Date.now();
    const interval = '1m';

    jest.spyOn(service, 'getKlines').mockResolvedValue([]);
    jest.spyOn(service, 'analyzeKlinesPrices').mockReturnValue([]);
    jest.spyOn(service, 'saveAnalytics').mockResolvedValue([]);

    await controller.fetchData(symbol, startTime, endTime, interval);

    expect(service.getKlines).toHaveBeenCalledWith(startTime, endTime, interval, symbol);
    expect(service.analyzeKlinesPrices).toHaveBeenCalledWith([]);
    expect(service.saveAnalytics).toHaveBeenCalledWith([], symbol);
  });
});
