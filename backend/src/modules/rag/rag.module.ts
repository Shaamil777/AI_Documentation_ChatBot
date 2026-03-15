import { Module } from '@nestjs/common'
import { RetrievalService } from './retrieval.service'
import { EmbeddingsModule } from '../../infrastructure/embeddings/embeddings.module'
import { VectorModule } from '../../infrastructure/vector/vector.module'

@Module({
  imports: [EmbeddingsModule, VectorModule],
  providers: [RetrievalService],
  exports: [RetrievalService]   // ← IMPORTANT
})
export class RagModule {}