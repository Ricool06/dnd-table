import { Test, TestingModule } from '@nestjs/testing';
import { DndGateway } from './dnd-gateway.gateway';

describe('DndGateway', () => {
  let gateway: DndGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DndGateway],
    }).compile();

    gateway = module.get<DndGateway>(DndGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
