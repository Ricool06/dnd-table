import { SubscribeMessage, WebSocketGateway, MessageBody, WsResponse } from '@nestjs/websockets';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { TestGuard } from './guards/test-guard.guard';

@WebSocketGateway()
export class DndGateway {

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(TestGuard)
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): WsResponse<string> {
    console.log('MESSAGE RECEIVED');
    return {event: 'events', data: 'Hello world!'};
  }
}
