import { Module } from '@nestjs/common';
import { DndGateway } from './dnd-gateway.gateway';
import { TestGuard } from './guards/test-guard.guard';

@Module({
  providers: [DndGateway, TestGuard],
})
export class GatewayModule {}
