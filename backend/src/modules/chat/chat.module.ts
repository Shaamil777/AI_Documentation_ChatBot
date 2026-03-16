import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { RagModule } from '../rag/rag.module'
import { LlmModule } from '../../infrastructure/llm/llm.module'

@Module({
  imports: [RagModule,LlmModule],   // ← IMPORTANT  
  controllers: [ChatController]
})
export class ChatModule {}