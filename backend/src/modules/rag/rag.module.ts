import { Module } from '@nestjs/common'
import { RetrievalService } from './retrieval.service'
import { EmbeddingsModule } from '../../infrastructure/embeddings/embeddings.module'
import { VectorModule } from '../../infrastructure/vector/vector.module'
import { LlmModule } from '../../infrastructure/llm/llm.module'
import { RagService } from './rag.service'

@Module({
  imports: [EmbeddingsModule, VectorModule, LlmModule],
  providers: [RetrievalService, RagService],
  exports: [RetrievalService, RagService]
})
export class RagModule {}
  