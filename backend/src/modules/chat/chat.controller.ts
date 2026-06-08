import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { ChatQueryDto } from './dto/chat-query.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get smart assistant response (English or Amharic)' })
  @ApiResponse({ status: 200, description: 'AI response returned' })
  async chat(@Body() dto: ChatQueryDto) {
    return this.chatService.getResponse(dto.message, dto.lang || 'en');
  }
}
